import { LanguageContext } from "./Hooks/useLanguage"
import { useEffect, useState } from 'react'
import Navbar from "./Sections/Navbar/Navbar"
import Router from "./Router/Router"
import Footer from "./Sections/Footer/Footer"
import Modal from "./Modals/Modal"
import Error from "./Errors/Error"
import useDispatchErrorWrappedThunk from "./Hooks/useDispatchErrorWrappedThunk"
import axios from 'redaxios'
import { authOptions, getUserUri } from "./Data/uris"
import { getDataFromLocalStore, localStoreLanguageKey, saveLanguageToLocalStore } from "./Utils/LocalStore/localStore"
import isRunningLocally from "./Utils/isRunningLocally"
import { update } from "./Store/rootReducers"
import { spread } from 'maraj'


function App() {

  const [selectedLanguage, setSelectedLanguage] = useState(JSON.parse(localStorage.getItem(localStoreLanguageKey)) ?? 'eng')
  const toggleLanguage = () => {
    const nextLanguage = selectedLanguage === 'eng' ? 'esp' : 'eng'
    setSelectedLanguage(nextLanguage)
    saveLanguageToLocalStore(nextLanguage)
  }

  const { dispatchErrorWrappedThunk } = useDispatchErrorWrappedThunk()

  useEffect(() => {
    dispatchErrorWrappedThunk(async (dispatch) => {
      let user
      let { conversions, palettes } = await getDataFromLocalStore(dispatch)

      if (!isRunningLocally) {
        try {
          const { data } = await axios.get(getUserUri, authOptions())
          conversions = data.conversions
          palettes = data.palettes
          user = { _id: data._id, username: data.username, email: data.email }
        // eslint-disable-next-line no-empty
        } catch { }
      }

      dispatch(update({
        [conversions && 'converter.savedConversions']: conversions,
        [palettes && 'palette.savedPalettes']: palettes,
        [user && 'user']: spread(user)
      }))

    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LanguageContext.Provider value={{ selectedLanguage, toggleLanguage }}>
      <Navbar />
      <Router />
      <Footer />
      <Modal />
      <Error />
    </LanguageContext.Provider>
  )
}

export default App
