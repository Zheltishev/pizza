import { Box, Slider, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { useEffect, useState } from "react";
import filteredPizza from "../../middleware/filteredPizza";
import { useDispatch } from "react-redux";
import { changePizzaList } from "../../redux/pizzaListSlice";
let rangeMinValue = 400
let rangeMaxValue = 700

export default function FilterPizza() {
    const dispatch = useDispatch()
    const [rangeValue, setRangeValue] = useState<number[]>([400, 700])
    const minDistance = 10

    async function pizzaFilter() {
      const filteredPrice =  await filteredPizza(rangeValue)

      dispatch(changePizzaList(filteredPrice))
    }

    useEffect(() => {
      fetch('http://localhost:8000/get-min-max-price')
        .then(res => res.json())
        .then(res => {
          rangeMinValue = Number(res.min)
          rangeMaxValue = Number(res.max)
          setRangeValue([Number(res.min), Number(res.max)])

          return
        })
    }, [])

    const rangeChange = (
      event: Event,
      newValue: number | number[],
      activeThumb: number,
    ) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setRangeValue([Math.min(newValue[0], rangeValue[1] - minDistance), rangeValue[1]]);
      } else {
        setRangeValue([rangeValue[0], Math.max(newValue[1], rangeValue[0] + minDistance)]);
      }
    };

    return (
        <Grid container sx={{padding: '0.5rem 1rem 0 1rem'}}> 
            <Box>
                <Typography>
                    Цена
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid>
                        <CurrencyRubleIcon />
                    </Grid>
                    <Grid sx={{ width: 300 }}>
                        <Slider 
                            getAriaLabel={() => 'Minimum distance'}
                            value={rangeValue}
                            onChange={rangeChange}
                            onChangeCommitted={() => pizzaFilter()}
                            valueLabelDisplay="auto"
                            min={rangeMinValue}
                            max={rangeMaxValue}
                            defaultValue={rangeMinValue}
                            step={10}
                            disableSwap
                            marks
                        />
                    </Grid>
                </Grid>
            </Box>
            
        </Grid>
    )
}