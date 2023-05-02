import LoginOrRegister from "./LoginOrRegister/LoginOrRegister"
import Login from "./Login/Login"
import Logout from "./Logout/Logout"
import Register from "./Register/Register"
import Settings from "./Settings/Settings"

export const modals = {
    loginOrRegister: LoginOrRegister,
    register: Register,
    login: Login,
    settings: Settings,
    logout: Logout
}

export const modalIDs = Object.keys(modals)