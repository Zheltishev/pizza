export default async function getUserOrders(userId: number) {
    const orders = fetch('http://localhost:8000/get-user-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        })
        .then(res => res.json())
        .then(res => res.message)

    return orders
}