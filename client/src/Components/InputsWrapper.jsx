
const InputsWrapper = ({ children, label, isOrientationColumn = true }) => {
    return (
        <div className="inputs-wrapper" >
            {label && <b>{label}</b>}
            <div className={isOrientationColumn ? "inputs-wrapper-column" : ""}>
                {children}
            </div>
        </div >
    )
}
export default InputsWrapper