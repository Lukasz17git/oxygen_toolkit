import { createContext, useContext } from "react"

export const LanguageContext = createContext({ selectedLanguage: null })

const defaultLanguage = 'eng'

export const useLanguage = (data) => {
    const { selectedLanguage } = useContext(LanguageContext)
    if (selectedLanguage === null) throw 'There is no Provider for LanguageContext in the component tree'

    const isDataAnArray = Array.isArray(data)
    const arrayData = isDataAnArray ? data : [data]
    const translatedData = []

    for (const dataObject of arrayData) {
        const dataWithCurrentSelectedLanguage = {}
        for (const textKey of Object.keys(dataObject)) {
            if (typeof dataObject[textKey] !== 'object') return dataObject //for data that has been already translated earlier
            dataWithCurrentSelectedLanguage[textKey] = dataObject[textKey][selectedLanguage] ?? dataObject[textKey][defaultLanguage]
        }
        translatedData.push(dataWithCurrentSelectedLanguage)
    }

    return isDataAnArray ? translatedData : translatedData[0]
}

