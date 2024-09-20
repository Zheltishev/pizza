import Cookies from "js-cookie"

export default async function checkToken() {
    if (Cookies.get('accessToken')) {
        const checkAccessToken = await fetch('http://localhost:8000/check-access-token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(res => res)
        
         if (checkAccessToken.status === 400) {
            // check refresh token

            return checkAccessToken
         } else {
            return checkAccessToken
         }
    } else {
        return {
            status: 400,
            message: 'cookie token is missing'
        }
    }
}