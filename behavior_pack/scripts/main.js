import { world, system } from "@minecraft/server";

// Define effects for each food item
const foodEffects = {
    "wojanshop:hamburgermc": [
        { effect: "regeneration", duration: 600, amplifier: 1 } // 30s, Level II
    ],
    "wojanshop:cocacola": [
        { effect: "speed", duration: 900, amplifier: 1 } // 45s, Level II
    ],
    "wojanshop:termos": [
        { effect: "regeneration", duration: 1200, amplifier: 0 }, // 60s, Level I
        { effect: "resistance", duration: 1200, amplifier: 0 }    // 60s, Level I
    ],
    "wojanshop:lody1": [
        { effect: "speed", duration: 400, amplifier: 0 } // 20s, Level I
    ],
    "wojanshop:lody2": [
        { effect: "jump_boost", duration: 600, amplifier: 1 } // 30s, Level II
    ],
    "wojanshop:wojanekmalina": [
        { effect: "speed", duration: 1200, amplifier: 1 },      // 60s, Level II
        { effect: "strength", duration: 1200, amplifier: 0 },   // 60s, Level I
        { effect: "jump_boost", duration: 1200, amplifier: 0 }  // 60s, Level I
    ],
    "wojanshop:wojanekpomarancza": [
        { effect: "haste", duration: 2400, amplifier: 1 },      // 120s (2min), Level II
        { effect: "night_vision", duration: 2400, amplifier: 9 } // 120s (2min), Level X (max!)
    ],
    "wojanshop:wojanekgumabalonowa": [
        { effect: "jump_boost", duration: 1800, amplifier: 2 },  // 90s (1.5min), Level III (max!)
        { effect: "slow_falling", duration: 1800, amplifier: 1 } // 90s (1.5min), Level II
    ],
    "wojanshop:wojanekmultiwitamina": [
        { effect: "regeneration", duration: 1200, amplifier: 1 },   // 60s, Level II
        { effect: "health_boost", duration: 1200, amplifier: 0 },   // 60s, Level I
        { effect: "resistance", duration: 1200, amplifier: 0 }      // 60s, Level I
    ]
};

// Listen for item complete use event (when player finishes eating/drinking)
world.afterEvents.itemCompleteUse.subscribe((event) => {
    const { source, itemStack } = event;

    // Check if this item has custom effects
    const itemId = itemStack.typeId;
    const effects = foodEffects[itemId];

    if (effects) {
        // Apply all effects for this food item
        for (const effectData of effects) {
            try {
                source.addEffect(effectData.effect, effectData.duration, {
                    amplifier: effectData.amplifier,
                    showParticles: true
                });
            } catch (error) {
                console.warn(`Failed to add effect ${effectData.effect}: ${error}`);
            }
        }
    }
});

// Music disc jukebox system
const musicDiscs = {
    "wojanshop:musicdiscbaza": {
        sound: "record.wojan_baza",
        title: "Wojan - Baza"
    },
    "wojanshop:musicdisckurier": {
        sound: "record.luczek_kurier",
        title: "Luczek - Kurier"
    },
    "wojanshop:musicdiscmamban": {
        sound: "record.palion_mamban",
        title: "Palion - Mam Bana"
    }
};

// Track currently playing jukeboxes and which players are listening
// Structure: { blockPos: { sound: string, listeners: Set<playerId> } }
const playingJukeboxes = new Map();

// Helper function to get players within range of jukebox (65 blocks like vanilla)
function getPlayersInRange(dimension, location, range = 65) {
    const allPlayers = dimension.getPlayers();
    return allPlayers.filter(p => {
        const dx = p.location.x - location.x;
        const dy = p.location.y - location.y;
        const dz = p.location.z - location.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return distance <= range;
    });
}

// Helper function to stop music for specific players
function stopMusicForPlayers(players, soundId) {
    for (const player of players) {
        try {
            // Use command since player.stopSound() is only in 2.6.0-beta
            player.runCommandAsync(`stopsound @s ${soundId}`);
        } catch (error) {
            console.warn(`Failed to stop sound for player: ${error}`);
        }
    }
}

// Handle music disc insertion into jukebox
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, player, itemStack } = event;

    // Check if player is interacting with a jukebox
    if (block.typeId !== "minecraft:jukebox") {
        return;
    }

    // Check if player is holding a custom music disc
    if (!itemStack || !musicDiscs[itemStack.typeId]) {
        return;
    }

    const discData = musicDiscs[itemStack.typeId];
    const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

    // Schedule the music to play after the block interaction
    system.runTimeout(() => {
        try {
            // Stop any currently playing music first
            if (playingJukeboxes.has(blockPos)) {
                const oldData = playingJukeboxes.get(blockPos);
                const playersToStop = getPlayersInRange(block.dimension, block.location);
                stopMusicForPlayers(playersToStop, oldData.sound);
            }

            // Get all players in range
            const nearbyPlayers = getPlayersInRange(block.dimension, block.location);

            // Play music for each player individually
            const listeners = new Set();
            for (const p of nearbyPlayers) {
                try {
                    p.playSound(discData.sound, {
                        pitch: 1.0,
                        volume: 1.0
                    });
                    listeners.add(p.id);
                } catch (error) {
                    console.warn(`Failed to play sound for player: ${error}`);
                }
            }

            // Show message to the player who inserted the disc
            player.sendMessage(`§6♫ §eTeraz gra: §f${discData.title} §6♫`);

            // Track this jukebox as playing
            playingJukeboxes.set(blockPos, {
                sound: discData.sound,
                listeners: listeners,
                dimension: block.dimension,
                location: block.location
            });

        } catch (error) {
            console.warn(`Failed to play music disc: ${error}`);
        }
    }, 1);
});

// Handle jukebox removal/stop
world.afterEvents.playerBreakBlock.subscribe((event) => {
    const { block, brokenBlockPermutation } = event;

    if (brokenBlockPermutation.type.id === "minecraft:jukebox") {
        const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

        // Stop music if this jukebox was playing
        if (playingJukeboxes.has(blockPos)) {
            const jukeboxData = playingJukeboxes.get(blockPos);

            // Stop the music for all nearby players
            try {
                const players = getPlayersInRange(jukeboxData.dimension, jukeboxData.location);
                stopMusicForPlayers(players, jukeboxData.sound);
            } catch (error) {
                console.warn(`Failed to stop music: ${error}`);
            }

            playingJukeboxes.delete(blockPos);
        }
    }
});

// Also handle when player clicks jukebox to eject disc
world.afterEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, player } = event;

    if (block.typeId === "minecraft:jukebox") {
        const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

        // If jukebox was playing and player clicks without holding a disc, they're ejecting
        if (playingJukeboxes.has(blockPos)) {
            const itemStack = player.getComponent("minecraft:inventory")?.container?.getItem(player.selectedSlotIndex);

            // If not holding a music disc, they're ejecting the current one
            if (!itemStack || !musicDiscs[itemStack.typeId]) {
                system.runTimeout(() => {
                    try {
                        const jukeboxData = playingJukeboxes.get(blockPos);

                        // Stop music for all nearby players
                        const players = getPlayersInRange(block.dimension, block.location);
                        stopMusicForPlayers(players, jukeboxData.sound);
                    } catch (error) {
                        console.warn(`Failed to stop music on eject: ${error}`);
                    }

                    playingJukeboxes.delete(blockPos);
                }, 1);
            }
        }
    }
});
