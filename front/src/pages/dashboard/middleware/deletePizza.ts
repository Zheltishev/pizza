import Cookies from "js-cookie"

export default async function deletePizza(id: number) {
    const result = await fetch('http://localhost:8000/delete-pizza', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token_access')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(res => res.status)

    return result
}