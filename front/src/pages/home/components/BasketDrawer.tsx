import { Box, Button, Dialog, Drawer, Grid2, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PizzaInDrawer from "../modals/PizzaInDrawer";
import { IBasketDrawer, IOrderPizza } from "../../../tsModals/tsModals";
import { amber } from "@mui/material/colors";
import { useState } from "react";
import OrderModal from "../modals/OrderModal";

export default function BasketDrawer(props: IBasketDrawer) {
    const { openBasketDrawer, closeBasketDrawer } = props
    const { basketList } = useSelector((state: RootState) => state.rootReducer.basketListSlice)
    const totalPrice = basketList.length > 0 ? basketList.map(e => e.pizza_price * e.pizza_count).reduce((a, b) => a + b, 0) : 0
    const [ openOrderModal, setOpenOrderModal ] = useState(false)

    const changeOpenOrderModal = (value: boolean) => {
        setOpenOrderModal(value) 
    }

    return (
        <Drawer 
            open={openBasketDrawer} 
            anchor='right'
        >
            <Grid2
                sx={{
                    padding: '1rem',
                    minWidth: {
                        md: 400,
                        xs: 320
                    }
                }}
            >
                <Box>
                    <Grid2 
                        container 
                        sx={{
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        <Box sx={{ marginBottom: '3px' }}>
                            <Typography variant="h6">
                                {totalPrice} ₽
                            </Typography>
                        </Box>
                        <Box>
                            <CloseIcon 
                                onClick={() => closeBasketDrawer(false)}
                                sx={{
                                    cursor: 'pointer',
                                    width: '30px',
                                    height: '30px',
                                    transition: '0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: amber[600]
                                    }
                                }}
                            />
                        </Box>
                    </Grid2>
                </Box>
                <Box>
                    {basketList.map((orderPizza: IOrderPizza) => (
                        <PizzaInDrawer key={orderPizza.pizza_id} {...orderPizza} />
                    ))}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                    <Button 
                        variant="outlined" 
                        color='primary' 
                        startIcon={<CreditScoreIcon />}
                        disabled={basketList.length > 0 ? false : true}
                        onClick={() => {
                            setOpenOrderModal(true)
                        }}
                    >
                        оформить заказ
                    </Button>
                </Box>
            </Grid2>

            {openOrderModal && 
                <Dialog
                    open={openOrderModal}
                    onClose={() => changeOpenOrderModal(false)}
                >
                    <OrderModal totalPrice={totalPrice} changeOpenOrderModal={changeOpenOrderModal} />
                </Dialog>
            }
        </Drawer>
    )
}