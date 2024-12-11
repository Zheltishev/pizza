import { useEffect, useState } from "react";
import { IComposition, IOrder } from "../../../tsModals/tsModals";
import getOrderComposition from "../../profile/middleware/getOrderComposition";
import { Typography } from "@mui/material";

export default function OrderItem({...order}: IOrder) {
    const [orderCompositon, setOrderComposition] = useState<IComposition[]>([])

    useEffect(() => {
        async function getComposition () {
            const result = await getOrderComposition(order.order_id)

            if (result) setOrderComposition(result)
        }

        getComposition ()
    }, [])

    return (
        <div style={{ margin: '1rem', padding: '1rem', borderRadius: '5px', backgroundColor: '#333333'}}>
            <Typography variant="subtitle1" >дата: {order.order_date}</Typography>
            {order.order_address}
            {orderCompositon.map((item: IComposition) => (
                <div key={item.composition_id} style={{paddingLeft: '2rem'}}>{item.composition_pizza_name}</div>
            ))}
        </div>
    )
}