import { world } from "@minecraft/server";

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
