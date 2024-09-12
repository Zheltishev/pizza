export default async function createNewUserInDB(newUserLogin: string, newUserPassword: string) {
    const res = await fetch('http://localhost:8000/create-new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: newUserLogin,
            password: newUserPassword
        })
    })
    .then(res => res.json())
    .then( res => {
        return {
            status: res.status,
            inputField: 'none',
            message: res.message
        }
    })

    return res
}