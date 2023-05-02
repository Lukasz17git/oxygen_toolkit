
const mainUri = window.location.hostname === 'localhost' ? 'http://localhost:4000/' : window.location.origin + '/'

export const authOptions = () => ({
    withCredentials: true,
})

// MAIN
export default mainUri

// AUTH 
export const registerUri = mainUri + 'register'
export const loginUri = mainUri + 'login'
export const logoutUri = mainUri + 'logout'

// GET ALL DATA, in bigger apps it can be splitted between sections
export const getUserUri = mainUri + 'get-user'
// UNIT CONVERTER
export const addConversionUri = mainUri + 'add-conversion'
export const deleteConversionUri = mainUri + 'delete-conversion'
// PALETTE
export const addPaletteUri = mainUri + 'add-palette'
export const deletePaletteUri = mainUri + 'delete-palette'