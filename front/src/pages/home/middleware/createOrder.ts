import { IOrderData } from "../../../tsModals/tsModals";

export default async function createOrder(orderData: IOrderData) {
    const res = await fetch('http://localhost:8000/create-pizza-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderData: orderData
        })
    })
    .then(res => res.json())
    .then( res => {
        return {
            status: res.status,
            message: res.message
        }
    })

    return res
}