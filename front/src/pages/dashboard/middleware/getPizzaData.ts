export default async function getPizzaData(id: number) {
    return fetch('http://localhost:8000/get-pizza-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(res => res.message)
}