export default async function getOrderList() {
    const res = await fetch('http://localhost:8000/get-order-list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then( res => res)

    return res
}