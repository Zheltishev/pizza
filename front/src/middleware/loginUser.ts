import checkLoginDB from "./checkLoginDB";
import { checkingLoginPasswordProps } from "./checkLoginPasswordProps";

export default async function loginUser(login: string, password: string) {
    const resultCheckLoginPasswordProps = checkingLoginPasswordProps(login, password)
    const resultCheckLoginDB = await checkLoginDB (login)

    if (resultCheckLoginPasswordProps.status && !resultCheckLoginDB.status) {
        const res = await fetch('http://localhost:8000/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
        .then(res => res.json())
        .then( res => {
            return {
                status: res.status,
                inputField: 'none',
                message: res.message,
                token: res.token,
                userId: res.userId,
                userRole: res.userRole
            }
        })
    
        return res

    } else if (!resultCheckLoginPasswordProps.status) {
        return {
            status: 400,
            inputField: resultCheckLoginPasswordProps.inputField,
            message: resultCheckLoginPasswordProps.message,
            token: '',
            userId: 0,
            userRole: ''
        }
    } else {
        return {
            status: 400,
            inputField: 'login',
            message: 'login not exist in DB',
            token: '',
            userId: 0,
            userRole: ''
        }
    }
}