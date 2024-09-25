import { Button, Card, CardActions, CardHeader, CardMedia, Typography } from "@mui/material"
import { IPizza } from "../../tsModals/tsModals"
import { AddShoppingCart } from "@mui/icons-material"
import { grey } from "@mui/material/colors"

export default function PizzaItem({...pizza }: IPizza) {
    const {
        pizza_name,
        pizza_price,
        pizza_ingredients,
        pizza_image_name
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
                    add
                </Button>
            </CardActions>
        </Card>
    )
}