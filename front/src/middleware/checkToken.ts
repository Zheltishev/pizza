import Cookies from "js-cookie"
import { ETokenType } from "../tsModals/tsModals"
import verificationToken from "./verificationToken"
import updateToken from "./updateToken"

export default async function checkToken() {
    if (!Cookies.get('token_access') && !Cookies.get('token_refresh')) {
        
        return {
            status: 401,
            message: 'there are not tokens in cookie',
            userName: '',
            userId: 0
        }
    }

    const verificationAccessToken = await verificationToken(ETokenType.token_access)
    const verificationRefreshToken = await verificationToken(ETokenType.token_refresh)

    if (Cookies.get('token_access') && verificationAccessToken.status === 200) {

        return {
            status: 200,
            message: verificationAccessToken.message,
            userName: verificationAccessToken.userName,
            userId: verificationRefreshToken.userId
            
        }
    } else if (Cookies.get('token_refresh') && verificationRefreshToken.status === 200 ) {
        const newToken = await updateToken(verificationRefreshToken.userId)

        console.log('update access and refresh token')
        if (newToken) {
            newToken.split(';').forEach((e: string) => {
                document.cookie = e
            })

            const verificationUpdatedAccessToken = await verificationToken(ETokenType.token_access)

            return {
                status: 200,
                message: verificationUpdatedAccessToken.message,
                userName: verificationUpdatedAccessToken.userName,
                userId: verificationUpdatedAccessToken.userId
            }
        } 
    } else {

        return {
            status: 401,
            message: 'token in cookie is missing',
            userName: '',
            userId: 0
        }
    }
}