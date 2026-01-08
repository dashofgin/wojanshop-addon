import { world } from "@minecraft/server";

// Custom component for food effects
const FoodEffectsComponent = {
    onConsume(event) {
        const { source, itemStack } = event;
        const item = itemStack.typeId;

        // Define effects for each food item
        const foodEffects = {
            "wojanshop:hamburgermc": [
                { name: "regeneration", duration: 600, amplifier: 1 } // 30s, Level II
            ],
            "wojanshop:cocacola": [
                { name: "speed", duration: 900, amplifier: 1 } // 45s, Level II
            ],
            "wojanshop:napojwojan": [
                { name: "speed", duration: 1200, amplifier: 1 },      // 60s, Level II
                { name: "strength", duration: 1200, amplifier: 0 },   // 60s, Level I
                { name: "jump_boost", duration: 1200, amplifier: 0 }  // 60s, Level I
            ],
            "wojanshop:termos": [
                { name: "regeneration", duration: 1200, amplifier: 0 }, // 60s, Level I
                { name: "resistance", duration: 1200, amplifier: 0 }    // 60s, Level I
            ],
            "wojanshop:lody1": [
                { name: "speed", duration: 400, amplifier: 0 } // 20s, Level I
            ],
            "wojanshop:lody2": [
                { name: "jump_boost", duration: 600, amplifier: 1 } // 30s, Level II
            ]
        };

        // Apply effects if this item has any
        const effects = foodEffects[item];
        if (effects) {
            for (const effect of effects) {
                source.addEffect(effect.name, effect.duration, {
                    amplifier: effect.amplifier,
                    showParticles: true
                });
            }
        }
    }
};

// Register the custom component on world initialize
world.beforeEvents.worldInitialize.subscribe((event) => {
    event.itemComponentRegistry.registerCustomComponent(
        "wojanshop:food_effects",
        FoodEffectsComponent
    );
});
