import checkLoginDB from "./checkLoginDB";
import { checkingLoginPasswordProps } from "./checkLoginPasswordProps";
import createNewUserInDB from "./createNewUserInDB";

export default async function signUpNewUser(login: string, password: string) {
    const resultCheckLoginPasswordProps = checkingLoginPasswordProps(login, password)
    const resultCheckLoginDB = await checkLoginDB (login)

    if (resultCheckLoginPasswordProps.status && resultCheckLoginDB.status) {
        const res = await createNewUserInDB(login, password)
        
        return res
    } else if (!resultCheckLoginPasswordProps.status) {
        return {
            status: 400,
            inputField: resultCheckLoginPasswordProps.inputField,
            message: resultCheckLoginPasswordProps.message
        }
    } else {
        return {
            status: 400,
            inputField: resultCheckLoginDB.inputField,
            message: resultCheckLoginDB.message
        }
    }
}