import { Box, Card, CardContent, Divider, Grid2, Typography } from "@mui/material";
import getUserOrders from "../middleware/getUserOrders";
import { useEffect, useState } from "react";
import { IOrder, IOrderHistory } from "../../../tsModals/tsModals";
import OrderComposition from "./OrderComposition";
import { grey } from "@mui/material/colors";
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function OrderHistory({userId}: IOrderHistory) {
    const [ userOrders, setUserOrders ] = useState<IOrder[]>([])
    
    useEffect(() => {
        async function checkResultUserOrders() {
            if (userId === null) {
                return
            }

            const checkOrders = await getUserOrders(userId) 

            if (checkOrders ) {
                setUserOrders(checkOrders)
            }
        }

        checkResultUserOrders()
    }, [userId])

    return (
        <Box>
            {userOrders.length > 0 ? <Typography variant="h6">История заказов</Typography> : <Typography variant="h6">Нет заказов</Typography>}
            <Grid2
                container
                spacing={2}
            >
                {userOrders && userOrders.map((order: IOrder) => (
                    <Grid2 
                        size={{ xs: 12, md: 3 }}
                        key={order.order_id}
                    >
                        <Card 
                            sx={{
                                display: 'grid',
                                height: '100%',
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    backgroundColor: grey[900]
                                }
                            }}
                        >
                            <CardContent>
                                <Box>
                                    <Typography variant="h6">
                                        <RestaurantIcon sx={{ fontSize: '1rem', mr: '0.5rem' }} />
                                        заказ id: {order.order_id}
                                    </Typography>
                                    <Typography variant="subtitle2">Адрес: {order.order_address}</Typography>
                                    <Typography variant="subtitle2">Цена: {order.order_price}</Typography>
                                    <Typography variant="subtitle2">Дата: {order.order_date}</Typography>
                                </Box>
                                <Divider sx={{ marginBlock: '0.5rem' }} />
                                <OrderComposition composition_order={order.order_id}/>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}