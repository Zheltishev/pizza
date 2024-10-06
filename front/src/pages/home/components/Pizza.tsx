import { useEffect, useState } from "react"
import { IPizza } from "../../../tsModals/tsModals"
import PizzaItem from "./PizzaItem"
import { Grid2 } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { changePizzaList } from "../../../redux/pizzaListSlice"

export default function Pizza() {
    const dispatch = useDispatch()
    const { pizzaList } = useSelector((state: RootState) => state.rootReducer.pizzaListSlice)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8000/pizza-list')
            .then(res => res.json())
            .then(res => {
                dispatch(changePizzaList(res))
                setIsLoading(false)
            })
    }, [dispatch])

    return (
        <Grid2 
            container 
            spacing={2} 
            columns={{ xs: 4, md: 12 }}
            sx={{ 
                padding: '1rem',
                width: {
                    lg: '1600px'
                }
            }}
        >
            {
            pizzaList && pizzaList.map((pizza: IPizza) => (
                    <Grid2 
                        size={{ xs: 12, md: 3 }} 
                        key={ pizza.pizza_id }
                    >
                        <PizzaItem isLoading={isLoading} {...pizza} />
                    </Grid2>
            ))
        }
        </Grid2>
    )
}