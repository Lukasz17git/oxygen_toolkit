export const valuesRelatedToOneMeter = {
    meter: 1,
    millimeter: 1000,
    centimeter: 100,
    decimeter: 10,
    kilometer: 0.001,
    mile: 0.0006213712,
    yard: 1.0936132983,
    feet: 3.28084,
    inch: 39.370079
}

export const litsOfUnits = Object.keys(valuesRelatedToOneMeter)
export const initialConverterOptions = litsOfUnits.reduce((prev, option) => (prev[option] = true, prev), {})

export const unitsText = {
    meter: {
        esp: 'metros',
        eng: 'meters'
    },
    millimeter: {
        esp: 'milímetros',
        eng: 'millimeters'
    },
    centimeter: {
        esp: 'centímetros',
        eng: 'centimeters'
    },
    decimeter: {
        esp: 'decímetros',
        eng: 'decimeters'
    },
    kilometer: {
        esp: 'kilómetros',
        eng: 'kilometers'
    },
    mile: {
        esp: 'millas',
        eng: 'miles'
    },
    yard: {
        esp: 'yardas',
        eng: 'yards'
    },
    feet: {
        esp: 'pies',
        eng: 'feets'
    },
    inch: {
        esp: 'pulgadas',
        eng: 'inches'
    }
}