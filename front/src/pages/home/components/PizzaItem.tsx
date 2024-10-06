import { Avatar, Box, Button, Card, CardActions, CardHeader, CardMedia, Dialog, Grid2, Skeleton, Typography } from "@mui/material"
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import GrassIcon from '@mui/icons-material/Grass';
import StarRateIcon from '@mui/icons-material/StarRate';
import { IPizzaItem } from "../../../tsModals/tsModals"
import { AddShoppingCart } from "@mui/icons-material"
import { amber, grey } from "@mui/material/colors"
import { useState } from "react";
import PizzaModal from "../modals/PizzaModal";

export default function PizzaItem({...pizza }: IPizzaItem) {
    const {
        isLoading,
        pizza_name,
        pizza_rating,
        pizza_price,
        pizza_ingredients,
        pizza_image_name,
        pizza_hot,
        pizza_vegetarian,
        pizza_mix
    } = pizza
    const imgSRC = `http://localhost:8000/images/${pizza_image_name}.png`
    const price = `${pizza_price}₽`
    const [ openPizzaModal, setOpenPizzaModal ] = useState(false)

    const closePizzaModal = (value: boolean) => {
        setOpenPizzaModal(value)
    }

    return (
        <Card
            sx={{
                display: 'grid',
                padding: '1rem',
                height: '100%',
                '&:hover': {
                    transform: 'scale(1.01)',
                    backgroundColor: grey[900]
                }
            }}
        >
            {isLoading
            ? 
                <Grid2 container spacing={3} sx={{alignItems: 'center'}}>
                    <Grid2 size={2}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Grid2>
                    <Grid2 size={10}>
                        <Skeleton animation="wave" height={10} width="80%" />
                        <Skeleton animation="wave" height={10} width="30%" />
                    </Grid2>
                </Grid2>
            : 
                <CardHeader 
                    title={ pizza_name }
                    subheader={ price }
                    sx={{ padding: '1rem 0' }}
                    avatar={
                        <Avatar sx={{ bgcolor: amber[600] }} aria-label="recipe">
                            { pizza_hot 
                                ? <LocalFireDepartmentIcon /> : pizza_mix
                                ? <DonutLargeIcon /> : pizza_vegetarian
                                ? <GrassIcon /> : <LocalPizzaIcon /> }
                        </Avatar>
                    }
                    action={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '0.5rem',
                            paddingRight: 0.5
                        }}
                    >
                        <StarRateIcon color="primary" />
                        <Typography sx={{ paddingTop: '2px' }}>{pizza_rating}</Typography>
                    </Box>
                    }
                />
            }
            {
                isLoading
                    ?
                        <Skeleton animation="wave" variant="circular" width={250} height={250} sx={{ margin: 'auto' }} />
                    :
                        <CardMedia
                            component="img"
                            sx={{ 
                                width: '250px',
                                height: '250px',
                                margin: 'auto'
                            }}
                            image={ imgSRC }
                            alt={ pizza_name }
                        />
            }
            {
                isLoading
                    ?
                        <Box sx={{ paddingBlock: 3}}>
                            <Skeleton animation="wave" height={10} width="100%" />
                            <Skeleton animation="wave" height={10} width="70%" />
                        </Box>
                    :
                        <Typography 
                            variant="subtitle2"
                            sx={{
                                marginTop: '0.5rem'
                            }}
                        >
                            { pizza_ingredients }
                        </Typography>
            }
            
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                {
                    isLoading
                        ?
                            <Skeleton animation="wave" height={40} width="40%" />
                        :
                            <Button
                                startIcon={<AddShoppingCart />}
                                variant="outlined"
                                onClick={() => {
                                    setOpenPizzaModal(true)
                                }}
                            >
                                выбрать
                            </Button>
                }
            </CardActions>

            {openPizzaModal && 
                <Dialog
                    open={openPizzaModal}
                    onClose={() => setOpenPizzaModal(false)}
                    maxWidth='lg'
                >
                    <PizzaModal closePizzaModal={ closePizzaModal } {...pizza} />
                    
                </Dialog>
            }
        </Card>
    )
}