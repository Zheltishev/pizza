export async function checkingLoginPasswordProps(login: string, password: string) {
    if (login.length < 5) {
        return {
            status: false,
            inputField: 'login',
            message: 'login is too short'
        }
    }

    if (password.length < 8) {
        return {
            status: false,
            inputField: 'password',
            message: 'password is too short'
        }
    }

    if (!login.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return {
            status: false,
            inputField: 'login',
            message: 'email format error'
        }
    } 

    return {
        status: true,
        inputField: 'none',
        message: 'none'
    }
}