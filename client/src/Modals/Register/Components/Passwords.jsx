import { createSelectorFromStringPath } from "maraj"
import Input from "../../../Components/Input"
import { useTypedSelector } from "../../../Store/store"

const Passwords = ({ storePath }) => {

    const passwordID = 'password'
    const repeatPasswordID = 'repeatPassword'
    useTypedSelector(state => {
        const password1 = createSelectorFromStringPath(`${storePath}.${passwordID}`)(state)
        const password2 = createSelectorFromStringPath(`${storePath}.${repeatPasswordID}`)(state)
        return password1 === password2
    })

    return (
        <>
            <Input storePath={storePath} id='password' required={true} width={16} />
            <Input storePath={storePath} id='repeatPassword' required={true} width={16}/>
        </>
    )
}
export default Passwords