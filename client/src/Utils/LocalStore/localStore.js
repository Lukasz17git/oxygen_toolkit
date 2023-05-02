import { locationErrors } from "../../Errors/errorList"
import { newError } from "../../Errors/handleError"

export const localStoreLanguageKey = 'LANGUAGE'

const localStoreKeys = {
    conversions: 'UNITS_CONVERTER',
    palettes: 'PALETTE'
}

export const getDataFromLocalStore = () => new Promise((resolve) => {
    const localStoreData = {}
    for (const [storeKey, localStoreKey] of Object.entries(localStoreKeys)) {
        const savedData = localStorage.getItem(localStoreKey)
        localStoreData[storeKey] = JSON.parse(savedData)
    }
    resolve(localStoreData)
})

export const clearLocalStore = () => {
    for (const key of Object.values(localStoreKeys)) {
        localStorage.removeItem(key)
    }
}

const saveDataToLocalStore = (key, data) => new Promise((resolve, reject) => {
    const inJsonFormat = JSON.stringify(data)
    try {
        localStorage.setItem(key, inJsonFormat)
        resolve()
    } catch (error) {
        reject(newError(locationErrors.localStorage))
    }
})

export const saveLanguageToLocalStore = (language) => saveDataToLocalStore(localStoreLanguageKey, language)

export const saveConverterDataToLocalStore = (savedConverterUnitsInStore) => saveDataToLocalStore(localStoreKeys.conversions, savedConverterUnitsInStore)

export const savePalettesToLocalStore = (savedPalettesInStore) => saveDataToLocalStore(localStoreKeys.palettes, savedPalettesInStore)
