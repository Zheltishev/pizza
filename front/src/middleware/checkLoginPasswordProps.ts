export async function checkingLoginPasswordProps(login: string, password: string) {
    if (login.length < 5) {
        return {
            status: false,
            inputField: 'login',
            message: 'логин слишком короткий'
        }
    }

    if (password.length < 8) {
        return {
            status: false,
            inputField: 'password',
            message: 'пароль слишком короткий'
        }
    }

    if (!login.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return {
            status: false,
            inputField: 'login',
            message: 'неправильный формат почты'
        }
    } 

    return {
        status: true,
        inputField: 'none',
        message: 'none'
    }
}