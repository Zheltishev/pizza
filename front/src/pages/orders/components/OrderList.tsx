import { Box } from "@mui/material";
import { IOrder } from "../../../tsModals/tsModals";
import { useEffect, useState } from "react";
import getOrderList from "../middleware/getOrderList";
import OrderItem from "./OrderItem";
import OrderChart from "./OrderChart";

export default function OrderList() {
    const [allOrders, setAllOrders] = useState<IOrder[]>([])

    useEffect(() => {
        async function getAllOrders () {
            const result = await getOrderList()

            if (result) setAllOrders(result)
        }

        getAllOrders ()
    }, [])

    return (
        <Box>
            <OrderChart allOrders={allOrders} />
            { allOrders && allOrders.map((order: IOrder) => (
                <OrderItem key={order.order_id} {...order}/>
            ))}
        </Box>
    )
}