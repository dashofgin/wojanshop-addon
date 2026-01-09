import { world } from "@minecraft/server";

// Define effects for each food item
const foodEffects = {
    "wojanshop:hamburgermc": [
        { effect: "regeneration", duration: 600, amplifier: 1 } // 30s, Level II
    ],
    "wojanshop:cocacola": [
        { effect: "speed", duration: 900, amplifier: 1 } // 45s, Level II
    ],
    "wojanshop:napojwojan": [
        { effect: "speed", duration: 1200, amplifier: 1 },      // 60s, Level II
        { effect: "strength", duration: 1200, amplifier: 0 },   // 60s, Level I
        { effect: "jump_boost", duration: 1200, amplifier: 0 }  // 60s, Level I
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
