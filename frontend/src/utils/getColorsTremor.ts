import { Color } from "@tremor/react";

function shuffleArray(array: Color[]): Color[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const colors: Color[] = [
    "green", "cyan", "slate", "sky", "gray", "zinc",
    "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "emerald", "teal", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose"
];

export function getRandomColorsTremor(quantity: number): Color[] {
    const shuffledColors = shuffleArray([...colors]);
    
    const limitedQuantity = Math.min(quantity, colors.length);
    return shuffledColors.slice(0, limitedQuantity);
}

export function getColorsTremor(quantity: number): Color[] {
    const limitedQuantity = Math.min(quantity, colors.length);
    return colors.slice(0, limitedQuantity);
}