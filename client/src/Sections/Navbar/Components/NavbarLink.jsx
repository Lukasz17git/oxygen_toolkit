

const NavbarLink = ({ text, handler }) => {
    return (
        <button onClick={handler} className='navbar-link'>
            {text}
        </button>
    )
}
export default NavbarLink