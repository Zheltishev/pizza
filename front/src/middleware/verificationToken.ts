import Cookies from "js-cookie"
import { ETokenType } from "../tsModals/tsModals"

export default async function verificationToken (tokenType: ETokenType) {
    const verificationResult = await fetch('http://localhost:8000/check-token', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Cookies.get(tokenType)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokenType: tokenType })
    })
    .then(res => res.json())
    .then(res => res)

    return verificationResult
}