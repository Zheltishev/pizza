import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Stack, ToggleButtonGroup, ToggleButton, Rating, Avatar } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import GrassIcon from '@mui/icons-material/Grass';
import { IPizzaModal } from "../../../tsModals/tsModals";
import { useState } from "react";
import { amber } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { basketAddPizza, increasePizzaCount } from "../../../redux/basketListSlice";
import { RootState } from "../../../redux/store";
import matchPizza from "../middleware/matchPizza";

export default function PizzaModal({...pizza }: IPizzaModal) {
    const {
        pizza_id,
        pizza_name,
        pizza_image_name,
        pizza_price,
        pizza_ingredients,
        pizza_size,
        pizza_dough,
        pizza_hot,
        pizza_vegetarian,
        pizza_mix,
        pizza_rating,
        closePizzaModal
    } = pizza
    const dispatch = useDispatch()
    const { basketList } = useSelector((state: RootState) => state.rootReducer.basketListSlice)
    const [ orderSize, setOrderSize ] = useState(pizza_size.split(' ')[0])
    const [ orderDough, setOrderDough ] = useState(pizza_dough.split(' ')[0])
    const [ sizeIndex, setSizeIndex ] = useState(1)
    const imgSRC = `http://localhost:8000/images/${pizza_image_name}.png`
    const price = `${Math.trunc(pizza_price * sizeIndex)}₽`

    return (
        <Stack sx={{ 
            padding: {
                md: 5,
                xs: 2
            } 
        }} >
            <Grid2 container spacing={6} sx={{ alignItems: 'center' }} >
                <Box 
                    component='img'
                    sx={{
                        width: {
                            md: '300px',
                            xs: '200px'
                        },
                        height: {
                            md: '300px',
                            xs: '200px'
                        },
                        transform: `scale(${sizeIndex})`
                    }}
                    alt={pizza_name}
                    src={imgSRC}
                />
                <Box
                    sx={{
                        display: 'grid',
                        maxWidth: {
                            md: '400px'
                        }
                    }}
                >
                    <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: amber[600] }} aria-label="recipe">
                            { pizza_hot 
                                ? <LocalFireDepartmentIcon /> : pizza_mix
                                ? <DonutLargeIcon /> : pizza_vegetarian
                                ? <GrassIcon /> : <LocalPizzaIcon /> }
                        </Avatar>

                        <Box>
                            <DialogTitle sx={{ display: 'grid', padding: 0 }} > {pizza_name} </DialogTitle>
                            <Rating defaultValue={Number(pizza_rating)} precision={0.1} />
                        </Box>
                    </Grid2>
                    
                    <DialogContent sx={{ padding: '20px 0' }}>
                        <DialogContentText>
                            { pizza_ingredients }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            display: 'grid',
                            padding: 0
                        }}
                    >
                        <ToggleButtonGroup 
                            color="primary"
                            value={orderSize}
                            size="small"
                            sx={{paddingBottom: 2, marginInline: '8px', display: 'flex'}}
                        >
                            {pizza_size.split(' ').map((e, i) => (
                                <ToggleButton 
                                    value={e}
                                    key={i}
                                    sx={{ flexGrow: 1 }}
                                    onClick={() => {
                                        setOrderSize(e)
                                        setSizeIndex(i === 0 ? 1 : i === 1 ? 1.1 : 1.2)
                                    }}
                                >
                                    {e}
                                </ToggleButton>
                            ) )}
                        </ToggleButtonGroup>
                        
                        <ToggleButtonGroup 
                            color="primary"
                            value={orderDough}
                            size="small"
                            sx={{paddingBottom: 2, marginInline: '8px', display: 'flex'}}
                        >
                            {pizza_dough.split(' ').map((e, i) => (
                                <ToggleButton 
                                    value={e}
                                    key={i}
                                    sx={{ flexGrow: 1 }}
                                    onClick={() => setOrderDough(e)}
                                >
                                    {e}
                                </ToggleButton>
                            ) )}
                        </ToggleButtonGroup>
                        
                        <Button 
                            variant="outlined" 
                            startIcon={<AddShoppingCartIcon />}
                            sx={{ marginInline: '8px' }}
                            onClick={() => {
                                const orderPizza = {
                                    pizza_id: Date.now(),
                                    pizza_name: pizza_name,
                                    pizza_image_name: pizza_image_name,
                                    pizza_size: orderSize,
                                    pizza_dough: orderDough,
                                    pizza_price: Math.trunc(pizza_price * sizeIndex),
                                    pizza_count: 1
                                }
                                const matchedResult = matchPizza(orderPizza, basketList)
                                
                                matchedResult !== 0 ? dispatch(increasePizzaCount(matchedResult)) : dispatch(basketAddPizza(orderPizza))
                                closePizzaModal(false)
                            }}
                        >
                            в корзину за {price}
                        </Button>
                            
                    </DialogActions>
                </Box>
            </Grid2>
        </Stack>
    )
}