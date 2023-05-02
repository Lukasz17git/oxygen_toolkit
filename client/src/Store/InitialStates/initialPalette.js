export const initialColor = 'FFFFFF'

/**
 * @typedef {string} HexString
 * @type {{ currentPalette: {paletteName: string, colors: HexString[]}, selectedCircleIndex: number, savedPalettes: {_id?: string, paletteName: string, colors: HexString[]}[]}}
 */

export const initialPalette = {
    currentPalette: {
        paletteName: '',
        colors: [initialColor],
    },
    selectedCircleIndex: 0,
    savedPalettes: []
}
