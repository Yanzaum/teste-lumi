import { Color } from "@tremor/react";

function shuffleArray(array: Color[]): Color[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export default function getColorsTremor(quantity: number): Color[] {
    const colors: Color[] = [
        "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
        "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
        "indigo", "violet", "purple", "fuchsia", "pink", "rose"
    ];

    const shuffledColors = shuffleArray([...colors]);
    
    const limitedQuantity = Math.min(quantity, colors.length);
    return shuffledColors.slice(0, limitedQuantity);
}