
const ButtonsWrapper = ({ children, label }) => {
    return (
        <div className="buttons-wrapper">
            {label && <b>{label}</b>}
            <div>{children}</div>
        </div>
    )
}
export default ButtonsWrapper