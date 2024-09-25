import { useEffect, useState } from "react"
import { IPizza } from "../../tsModals/tsModals"
import PizzaItem from "./PizzaItem"
import { Grid2 } from "@mui/material"

export default function Pizza() {
    const [ pizzaList, setPizzaList ] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/pizza-list')
            .then(res => res.json())
            .then(res => setPizzaList(res))
    }, [])

    return (
        <Grid2 
            container 
            spacing={2} 
            columns={{ xs: 4, md: 12 }}
            sx={{ 
                padding: '1rem',
                maxWidth: '1600px'
            }}
        >
            {
            pizzaList && pizzaList.map((pizza: IPizza) => (
                    <Grid2 
                        size={{ xs: 12, md: 3 }} 
                        key={ pizza.pizza_id }
                    >
                        <PizzaItem {...pizza} />
                    </Grid2>
            ))
        }
        </Grid2>
    )
}