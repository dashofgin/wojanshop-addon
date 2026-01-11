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
        title: "Wojan - Baza",
        duration: 166 // seconds (2m 46s)
    },
    "wojanshop:musicdisckurier": {
        sound: "record.luczek_kurier",
        title: "Luczek - Kurier",
        duration: 112 // seconds (1m 52s)
    },
    "wojanshop:musicdiscmamban": {
        sound: "record.palion_mamban",
        title: "Palion - Mam Bana",
        duration: 201 // seconds (3m 21s)
    }
};

// Track currently playing jukeboxes
// Structure: { blockPos: { sound: string, endTime: number, dimension, location } }
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

// Helper function to check if music is still playing
function isMusicPlaying(blockPos) {
    if (!playingJukeboxes.has(blockPos)) {
        return false;
    }

    const jukeboxData = playingJukeboxes.get(blockPos);
    const currentTime = Date.now();

    // If music finished, clean up
    if (currentTime >= jukeboxData.endTime) {
        playingJukeboxes.delete(blockPos);
        return false;
    }

    return true;
}

// Helper function to get remaining time in seconds
function getRemainingTime(blockPos) {
    if (!playingJukeboxes.has(blockPos)) {
        return 0;
    }

    const jukeboxData = playingJukeboxes.get(blockPos);
    const currentTime = Date.now();
    const remaining = Math.max(0, Math.ceil((jukeboxData.endTime - currentTime) / 1000));

    return remaining;
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
            // Check if music is already playing in this jukebox
            if (isMusicPlaying(blockPos)) {
                const remaining = getRemainingTime(blockPos);
                player.sendMessage(`§c⏸ §7Muzyka już gra! Poczekaj §e${remaining}§7s...`);
                return;
            }

            // Get all players in range
            const nearbyPlayers = getPlayersInRange(block.dimension, block.location);

            // Play music for each player individually
            for (const p of nearbyPlayers) {
                try {
                    p.playSound(discData.sound, {
                        pitch: 1.0,
                        volume: 1.0
                    });
                } catch (error) {
                    console.warn(`Failed to play sound for player: ${error}`);
                }
            }

            // Calculate when the music will end
            const endTime = Date.now() + (discData.duration * 1000);

            // Show message to the player who inserted the disc
            player.sendMessage(`§6♫ §eTeraz gra: §f${discData.title} §6♫`);

            // Track this jukebox as playing
            playingJukeboxes.set(blockPos, {
                sound: discData.sound,
                endTime: endTime,
                duration: discData.duration,
                dimension: block.dimension,
                location: block.location
            });

            // Auto-clear jukebox after music ends
            system.runTimeout(() => {
                playingJukeboxes.delete(blockPos);
            }, discData.duration * 20); // Convert seconds to ticks

        } catch (error) {
            console.warn(`Failed to play music disc: ${error}`);
        }
    }, 1);
});

// Handle jukebox removal - clear tracking but music will play until end
world.afterEvents.playerBreakBlock.subscribe((event) => {
    const { block, brokenBlockPermutation } = event;

    if (brokenBlockPermutation.type.id === "minecraft:jukebox") {
        const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

        // Clear jukebox from tracking (music will finish naturally)
        if (playingJukeboxes.has(blockPos)) {
            playingJukeboxes.delete(blockPos);
        }
    }
});

// Handle disc ejection - clear tracking but music will play until end
world.afterEvents.playerInteractWithBlock.subscribe((event) => {
    const { block, player } = event;

    if (block.typeId === "minecraft:jukebox") {
        const blockPos = `${block.location.x},${block.location.y},${block.location.z}`;

        // If jukebox was playing and player clicks without holding a disc, they're ejecting
        if (isMusicPlaying(blockPos)) {
            const itemStack = player.getComponent("minecraft:inventory")?.container?.getItem(player.selectedSlotIndex);

            // If not holding a music disc, they're ejecting the current one
            if (!itemStack || !musicDiscs[itemStack.typeId]) {
                system.runTimeout(() => {
                    // Clear from tracking (music will finish naturally)
                    playingJukeboxes.delete(blockPos);

                    // Notify player
                    const remaining = getRemainingTime(blockPos);
                    if (remaining > 0) {
                        player.sendMessage(`§7Płyta wyjęta. Muzyka skończy się za §e${remaining}§7s.`);
                    }
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

            // Get ALL item frames in dimension, then filter by distance manually
            const allNormalFrames = dimension.getEntities({
                type: "minecraft:item_frame"
            });

            const allGlowFrames = dimension.getEntities({
                type: "minecraft:glow_item_frame"
            });

            // Filter by distance manually
            const normalFrames = allNormalFrames.filter(frame => {
                const dx = frame.location.x - location.x;
                const dy = frame.location.y - location.y;
                const dz = frame.location.z - location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return distance <= radius;
            });

            const glowFrames = allGlowFrames.filter(frame => {
                const dx = frame.location.x - location.x;
                const dy = frame.location.y - location.y;
                const dz = frame.location.z - location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return distance <= radius;
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

            // Get ALL item frames in dimension, then filter by distance manually
            const allNormalFrames = dimension.getEntities({
                type: "minecraft:item_frame"
            });

            const allGlowFrames = dimension.getEntities({
                type: "minecraft:glow_item_frame"
            });

            // Filter by distance manually
            const normalFrames = allNormalFrames.filter(frame => {
                const dx = frame.location.x - location.x;
                const dy = frame.location.y - location.y;
                const dz = frame.location.z - location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return distance <= radius;
            });

            const glowFrames = allGlowFrames.filter(frame => {
                const dx = frame.location.x - location.x;
                const dy = frame.location.y - location.y;
                const dz = frame.location.z - location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return distance <= radius;
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
    } else if (command === "debug") {
        // Debug: Show all nearby entities to identify frame types
        try {
            const location = player.location;
            const dimension = player.dimension;

            // Get ALL entities nearby
            const allEntities = dimension.getEntities();

            // Filter by distance (20 blocks for debug)
            const nearbyEntities = allEntities.filter(entity => {
                const dx = entity.location.x - location.x;
                const dy = entity.location.y - location.y;
                const dz = entity.location.z - location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return distance <= 20;
            });

            // Group by type
            const typeCount = {};
            for (const entity of nearbyEntities) {
                const type = entity.typeId;
                typeCount[type] = (typeCount[type] || 0) + 1;
            }

            player.sendMessage(`§e[Debug] §fEntity w promieniu 20 bloków:`);
            const entries = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
            for (const [type, count] of entries) {
                player.sendMessage(`§7  ${type}: §6${count}`);
            }

        } catch (error) {
            player.sendMessage(`§c[Błąd] ${error}`);
        }
    } else if (command === "help") {
        // Show help message
        player.sendMessage(`§6=== Wojan Shop - Narzędzia ===`);
        player.sendMessage(`§e/scriptevent wojanshop:count [promień]`);
        player.sendMessage(`§7  Pokazuje ile ramek jest w pobliżu (domyślnie 50 bloków)`);
        player.sendMessage(`§e/scriptevent wojanshop:clear [promień]`);
        player.sendMessage(`§7  Usuwa wszystkie ramki w pobliżu (przedmioty wypadają)`);
        player.sendMessage(`§e/scriptevent wojanshop:debug`);
        player.sendMessage(`§7  Pokazuje wszystkie entity w pobliżu (diagnostyka)`);
        player.sendMessage(`§e/scriptevent wojanshop:help`);
        player.sendMessage(`§7  Pokazuje tę pomoc`);
        player.sendMessage(`§7Przykład: §e/scriptevent wojanshop:count 100`);
    }
});
