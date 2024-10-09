import { Box, Grid2, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { IOrderPizza } from "../../../tsModals/tsModals";
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { basketDeletePizza, decreasePizzaCount, increasePizzaCount } from "../../../redux/basketListSlice";
import { useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";

export default function PizzaInDrawer ({...orderPizza}: IOrderPizza) {
    const dispatch = useDispatch()
    const { pizza_id, pizza_name, pizza_image_name, pizza_dough, pizza_size, pizza_price, pizza_count } = orderPizza
    const imgSRC = `http://localhost:8000/images/${pizza_image_name}.png`

    return (
        <Grid2 
            container 
            spacing={1} 
            sx={{
                flexDirection: 'column',
                backgroundColor: grey[900],
                marginBottom: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.5rem'
            }}
        >
            <Box>
                <Grid2 container spacing={2}>
                    <Box 
                        component='img'
                        sx={{
                            width: '40px',
                            height: '40px'
                        }}
                        alt={pizza_name}
                        src={imgSRC}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box display='grid'>
                            <Typography variant="button">{pizza_name}</Typography>
                            <Typography variant="caption">{pizza_size}, {pizza_dough}</Typography>
                        </Box>
                        <Box>
                            <CloseIcon 
                                color='primary' 
                                sx={{
                                    cursor: 'pointer',
                                    width: '20px',
                                    height: '20px',
                                    transition: '0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    }
                                }}
                                onClick={() => dispatch(basketDeletePizza(pizza_id))}
                            />
                        </Box>
                    </Box>
                </Grid2>
            </Box>
            <Box>
                <Grid2 container sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>{pizza_price} ₽</Box>
                    <Box>
                        <ToggleButtonGroup>
                            <ToggleButton 
                                value="left" 
                                aria-label="left aligned" 
                                sx={{padding: '5px'}}
                                onClick={() => {
                                    pizza_count > 1 ? dispatch(decreasePizzaCount(pizza_id)) : dispatch(basketDeletePizza(pizza_id))
                                }}
                            >
                                <RemoveIcon color="primary" sx={{width: '15px', height: '15px'}} />
                            </ToggleButton>
                            <ToggleButton 
                                value="center" 
                                aria-label="centered" 
                                sx={{padding: '5px 10px', lineHeight: 1}}
                            >
                                {pizza_count}
                            </ToggleButton>
                            <ToggleButton 
                                value="right" 
                                aria-label="right aligned" 
                                sx={{padding: '5px'}}
                                onClick={() => dispatch(increasePizzaCount(pizza_id))}
                            >
                                <AddIcon color="primary" sx={{width: '15px', height: '15px'}} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid2>
            </Box>
        </Grid2>
    )
}