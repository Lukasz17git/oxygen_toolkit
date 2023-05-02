import { useState } from "react"
import Language from "./Components/Language"
import Burger from "./Svgs/Burger"
import NavbarLink from "./Components/NavbarLink"
import { useLanguage } from "../../Hooks/useLanguage"
import text from "./text"
import { useDispatch } from "react-redux"
import { routes } from "../../Router/routes"
import { setValue } from "../../Store/rootReducers"
import UserIcon from "./Components/UserIcon"


const Navbar = () => {

    const translatedText = useLanguage(text)

    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false)
    const toggleNavbar = () => setIsNavbarExpanded(c => !c)

    const dispath = useDispatch()
    const handleRouteLink = (route) => {
        dispath(setValue('route', route))
        isNavbarExpanded && setIsNavbarExpanded(false)
    }


    return (
        <nav className="navbar">
            <section className={isNavbarExpanded ? 'navbar-section-on' : 'navbar-section'}>
                <div className="navbar-logo" >
                    <img src="/CriticalIcons/logoToolkit.svg" loading="lazy" alt="logo" />
                </div>
                <button className={isNavbarExpanded ? 'navbar-burger-on' : 'navbar-burger'} onClick={toggleNavbar} aria-label="menu">
                    <Burger />
                </button>
                {routes.map(route => (
                    <NavbarLink key={route} text={translatedText[route]} handler={() => handleRouteLink(route)} />
                ))}
                <div className="navbar-buttons">
                    <Language />
                    <UserIcon />
                </div>
            </section>
        </nav >
    )
}

export default Navbar