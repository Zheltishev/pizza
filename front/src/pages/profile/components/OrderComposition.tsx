import { useEffect, useState } from "react"
import getOrderComposition from "../middleware/getOrderComposition"
import { IComposition } from "../../../tsModals/tsModals"
import { Box, Grid2, Typography } from "@mui/material"
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface IOrderComposition {
    composition_order: number
}

export default function OrderComposition({composition_order}: IOrderComposition) {
    const [ orderComposition, setOrderComposition ] = useState<IComposition[]>([])

    useEffect(() => {
        async function checkOrderComposition() {
            const result = await getOrderComposition(composition_order)

            if (result) {
                setOrderComposition(result)
            }
        }

        checkOrderComposition()
    }, [composition_order])

    return (
        <>
            <Grid2 
                container 
                spacing={1}
                sx={{ display: 'grid' }}
            >
                {orderComposition && orderComposition.map((orderComposition: IComposition) => (
                    <Box key={orderComposition.composition_id}>
                        <Typography variant="h6">
                            <RadioButtonCheckedIcon sx={{ fontSize: '1rem', mr: '0.5rem' }} />
                            {orderComposition.composition_pizza_name}
                        </Typography>
                        <Typography variant="subtitle2">
                            Размер: {orderComposition.composition_pizza_size}
                        </Typography>
                        <Typography variant="subtitle2">
                            Кол-во: {orderComposition.composition_pizza_count}
                        </Typography>
                    </Box>
                ))}
            </Grid2>
        </>
    )
}