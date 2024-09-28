import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import StarRateIcon from '@mui/icons-material/StarRate';
import Grid from '@mui/material/Grid2';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useEffect, useState } from "react";
import filteredPizza from "../../middleware/filteredPizza";
import { useDispatch } from "react-redux";
import { changePizzaList } from "../../redux/pizzaListSlice";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ESortValues } from "../../tsModals/tsModals";
let rangeMinValue = 400
let rangeMaxValue = 700

export default function FilterPizza() {
    const dispatch = useDispatch()
    const [rangeValue, setRangeValue] = useState<number[]>([400, 700])
    const [sortOpen, setSortOpen] = useState(false)
    const [sortValue, setSortValue] = useState<ESortValues>(ESortValues.pizzaPriceASC)
    const minDistance = 10

    useEffect(() => {
      async function pizzaFilter() {
        const filteredPrice =  await filteredPizza(rangeValue, sortValue)
  
        dispatch(changePizzaList(filteredPrice))
      }

      pizzaFilter()
    }, [dispatch, rangeValue, sortValue])

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
        <Grid 
          container 
          sx={{
            padding: '0.5rem 1rem 0 1rem', 
            justifyContent: 'end',
            alignItems: 'center'
          }}
          spacing={4}
        > 
            <Box>
                <Typography>
                    Цена
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid>
                        <CurrencyRubleIcon />
                    </Grid>
                    <Grid 
                      sx={{ width: 300 }}>
                        <Slider 
                            getAriaLabel={() => 'Minimum distance'}
                            value={rangeValue}
                            onChange={rangeChange}
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
            
            <Box>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                sx={{
                  position: 'relevant', 
                  width: '300px'
                }}
              >
                <ListItemButton
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  <ListItemIcon>
                    <SortIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary='Сортировка' />
                  { sortOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" /> }
                </ListItemButton>

                <Collapse in={sortOpen} sx={{position: 'absolute', zIndex: 1, minWidth: '300px', backgroundColor: 'black'}}>
                  <List
                    component="div" disablePadding
                  >
                    <ListItemButton
                      sx={{'&:hover': {
                        backgroundColor: '#212121'
                      }}}
                      onClick={() => {
                        setSortOpen(false)
                        setSortValue(ESortValues.pizzaPriceASC)
                      }}
                    >
                      <ListItemIcon>
                        <NorthIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary='Цена по возрастанию' />
                    </ListItemButton>

                    <ListItemButton
                      sx={{'&:hover': {
                        backgroundColor: '#212121'
                      }}}
                      onClick={() => {
                        setSortOpen(false)
                        setSortValue(ESortValues.pizzaPriceDESC)
                      }}
                    >
                      <ListItemIcon>
                        <SouthIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary='Цена по убыванию' />
                    </ListItemButton>

                    <ListItemButton
                      sx={{'&:hover': {
                        backgroundColor: '#212121'
                      }}}
                      onClick={() => {
                        setSortOpen(false)
                        setSortValue(ESortValues.pizzaRatingDESC)
                      }}
                    >
                      <ListItemIcon>
                        <StarRateIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary='По рейтингу' />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>

            <Box
              onClick={() => {
                setSortValue(ESortValues.pizzaPriceASC)
                setRangeValue([rangeMinValue, rangeMaxValue])
              }}
            >
              <RotateLeftIcon 
                color="primary"
                sx={{
                  fontSize: '2rem',
                  marginTop: '0.5rem',
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': {
                    transform: 'rotate(-90deg)'
                  }
                }}
              />
            </Box>
        </Grid>
    )
}