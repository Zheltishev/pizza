export default async function getOrderComposition(composition_order: number) {
    const orders = fetch('http://localhost:8000/get-order-composition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ composition_order: composition_order })
        })
        .then(res => res.json())
        .then(res => res.message)

    return orders
}