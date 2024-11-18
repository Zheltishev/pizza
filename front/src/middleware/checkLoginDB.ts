import fetch from "cross-fetch"

export default async function checkLoginDB (login: string) {
    const responseValue = await fetch('http://localhost:8000/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login })
    })
    .then(res => res.json())
    .then(res => {
        return res.message
    })

    if (responseValue === login) {
        return {
            status: false,
            inputField: 'login',
            message: 'почта занята'
        }
    } else {
        return {
            status: true,
            inputField: 'none',
            message: 'none'
        }
    }
}