import { Avatar, Box, Button, Card, CardActions, CardHeader, CardMedia, Typography } from "@mui/material"
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import GrassIcon from '@mui/icons-material/Grass';
import StarRateIcon from '@mui/icons-material/StarRate';
import { IPizza } from "../../tsModals/tsModals"
import { AddShoppingCart } from "@mui/icons-material"
import { amber, grey } from "@mui/material/colors"

export default function PizzaItem({...pizza }: IPizza) {
    const {
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
            <CardMedia
                component="img"
                sx={{ 
                    width: '250px',
                    margin: 'auto'
                 }}
                image={ imgSRC }
                alt={ pizza_name }
            />
            <Typography 
                variant="subtitle2"
                sx={{
                    marginTop: '0.5rem'
                }}
            >
                { pizza_ingredients }
            </Typography>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Button
                    startIcon={<AddShoppingCart />}
                    variant="outlined"
                >
                    добавить
                </Button>
            </CardActions>
        </Card>
    )
}