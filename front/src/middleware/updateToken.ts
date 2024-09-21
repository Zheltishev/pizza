export default async function updateToken(userId: string) {
    const response = await await fetch('http://localhost:8000/update-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId })
    })
    .then(res => res.json())
    .then(res => res)

    return response.token
}