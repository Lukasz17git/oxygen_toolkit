import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'
import './Css/App.css'
import './Css/BurgerAnimation.css'
import './Css/Buttons.css'
import './Css/ButtonsWrapper.css'
import './Css/Checkboxs.css'
import './Css/Error.css'
import './Css/Field.css'
import './Css/Footer.css'
import './Css/Images.css'
import './Css/Inputs.css'
import './Css/InputsWrapper.css'
import './Css/Modal.css'
import './Css/Navbar.css'
import './Css/Palette.css'
import './Css/Selects.css'
import './Css/Submit.css'
import './Css/UnitConverter.css'
import './Css/Utils.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
