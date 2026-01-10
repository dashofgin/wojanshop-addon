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

// Track currently playing jukeboxes
const playingJukeboxes = new Map();

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
                const players = block.dimension.getPlayers();
                for (const p of players) {
                    p.runCommand(`stopsound @s music`);
                }
            }

            // Play the music disc sound at jukebox location
            block.dimension.playSound(discData.sound, block.location, {
                volume: 1.0,
                pitch: 1.0
            });

            // Show message to player
            player.sendMessage(`§6♫ §eTeraz gra: §f${discData.title} §6♫`);

            // Track this jukebox as playing
            playingJukeboxes.set(blockPos, {
                sound: discData.sound,
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
    const { block, brokenBlockPermutation, player } = event;

    if (brokenBlockPermutation.type.id === "minecraft:jukebox") {
        const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

        // Stop music if this jukebox was playing
        if (playingJukeboxes.has(blockPos)) {
            const jukeboxData = playingJukeboxes.get(blockPos);

            // Stop the music for all nearby players
            try {
                // Get all players in the dimension
                const players = jukeboxData.dimension.getPlayers();

                // Stop sound for each player
                for (const p of players) {
                    p.runCommand(`stopsound @s music`);
                }
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
                        // Stop music for all nearby players
                        const players = block.dimension.getPlayers();
                        for (const p of players) {
                            p.runCommand(`stopsound @s music`);
                        }
                    } catch (error) {
                        console.warn(`Failed to stop music on eject: ${error}`);
                    }

                    playingJukeboxes.delete(blockPos);
                }, 1);
            }
        }
    }
});

// Item frame clearing utility for performance optimization
// Use this to remove old item frames with high-res textures and replace with optimized ones
system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, sourceEntity, message } = event;

    // Only process wojanshop events from players
    if (!id.startsWith("wojanshop:") || !sourceEntity) {
        return;
    }

    const player = sourceEntity;
    const command = id.replace("wojanshop:", "");

    // Parse radius from message, default 50 blocks
    const radius = message ? parseInt(message) : 50;

    if (command === "count") {
        // Count item frames in radius (both normal and glow)
        try {
            const location = player.location;
            const dimension = player.dimension;

            // Get both normal and glow item frames
            const normalFrames = dimension.getEntities({
                location: location,
                maxDistance: radius,
                type: "minecraft:item_frame"
            });

            const glowFrames = dimension.getEntities({
                location: location,
                maxDistance: radius,
                type: "minecraft:glow_item_frame"
            });

            const normalCount = normalFrames.length;
            const glowCount = glowFrames.length;
            const totalCount = normalCount + glowCount;

            player.sendMessage(`§e[Wojan Shop] §fZnaleziono §6${totalCount}§f ramek w promieniu §6${radius}§f bloków.`);
            if (normalCount > 0 || glowCount > 0) {
                player.sendMessage(`§7  Zwykłe: §6${normalCount}§7, Świecące: §6${glowCount}`);
            }

            if (totalCount > 0) {
                player.sendMessage(`§7Użyj §e/scriptevent wojanshop:clear${radius !== 50 ? ` ${radius}` : ''}§7 aby usunąć ramki.`);
            }
        } catch (error) {
            player.sendMessage(`§c[Błąd] Nie udało się policzyć ramek: ${error}`);
        }
    } else if (command === "clear") {
        // Clear item frames in radius (both normal and glow)
        try {
            const location = player.location;
            const dimension = player.dimension;

            // Get both normal and glow item frames
            const normalFrames = dimension.getEntities({
                location: location,
                maxDistance: radius,
                type: "minecraft:item_frame"
            });

            const glowFrames = dimension.getEntities({
                location: location,
                maxDistance: radius,
                type: "minecraft:glow_item_frame"
            });

            const allFrames = [...normalFrames, ...glowFrames];
            const totalCount = allFrames.length;

            if (totalCount === 0) {
                player.sendMessage(`§e[Wojan Shop] §fBrak ramek w promieniu §6${radius}§f bloków.`);
                return;
            }

            // Remove all item frames (items will drop automatically)
            let removed = 0;
            for (const frame of allFrames) {
                try {
                    frame.remove();
                    removed++;
                } catch (e) {
                    // Skip frames that can't be removed
                }
            }

            player.sendMessage(`§a[Wojan Shop] §fUsunięto §6${removed}§f ramek w promieniu §6${radius}§f bloków.`);
            player.sendMessage(`§7Przedmioty wypadły na ziemię. Podnieś je i umieść w nowych ramkach.`);

        } catch (error) {
            player.sendMessage(`§c[Błąd] Nie udało się usunąć ramek: ${error}`);
        }
    } else if (command === "help") {
        // Show help message
        player.sendMessage(`§6=== Wojan Shop - Narzędzia ===`);
        player.sendMessage(`§e/scriptevent wojanshop:count [promień]`);
        player.sendMessage(`§7  Pokazuje ile ramek jest w pobliżu (domyślnie 50 bloków)`);
        player.sendMessage(`§e/scriptevent wojanshop:clear [promień]`);
        player.sendMessage(`§7  Usuwa wszystkie ramki w pobliżu (przedmioty wypadają)`);
        player.sendMessage(`§e/scriptevent wojanshop:help`);
        player.sendMessage(`§7  Pokazuje tę pomoc`);
        player.sendMessage(`§7Przykład: §e/scriptevent wojanshop:count 100`);
    }
});
