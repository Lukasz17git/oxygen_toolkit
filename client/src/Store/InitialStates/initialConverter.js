/**
 * @typedef {typeof initialSavedConversion} SavedConversions
 */

import { initialConverterOptions } from "../../Data/converterUnits"

/**
 * @type {{converterInput: string, converterSelectedUnits: string, converterOptions: typeof initialConverterOptions,  savedConversions: SavedConversions[]}}
 */
export const initialConverter = {
    converterInput: '',
    converterSelectedUnits: '',
    converterOptions: initialConverterOptions,
    savedConversions: []
}

export const initialSavedConversion = {
    value: '',
    originUnit: '',
    targetUnit: ''
}