

const Submit = ({ text, className = 'submit-app' }) => {
    return (
        <input
            className={className}
            type="submit"
            value={text}
        />
    )
}
export default Submit