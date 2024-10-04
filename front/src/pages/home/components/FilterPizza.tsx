import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import StarRateIcon from '@mui/icons-material/StarRate';
import Grid from '@mui/material/Grid2';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useState } from "react"
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { ESortingTypes, IFilterPizza } from "../../../tsModals/tsModals";

export default function FilterPizza(filterProps: IFilterPizza) {
    const { 
      priceRangeMin, 
      priceRangeMax, 
      currentMinPrice, 
      currentMaxPrice,
      sortingType,
      changeCurrentMinPrice,
      changeCurrentMaxPrice,
      changeSortingType,
      changePaginationPage
    } = filterProps
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortOpen, setSortOpen] = useState(false)
    const minDistance = 10

    const rangeChange = (
      event: Event,
      newValue: number | number[],
      activeThumb: number,
    ) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        const newMinValue = Math.min(newValue[0], currentMaxPrice - minDistance)

        changeCurrentMinPrice(newMinValue)
        changePaginationPage(1)
        setSearchParams({
          minprice: newMinValue.toString(),
          maxprice: currentMaxPrice.toString(),
          sort: sortingType,
          page: String(1)
        })
      } else {
        const newMaxValue = Math.max(newValue[1], currentMinPrice + minDistance)

        changeCurrentMaxPrice(newMaxValue)
        changePaginationPage(1)
        setSearchParams({
          minprice: currentMinPrice.toString(),
          maxprice: newMaxValue.toString(),
          sort: sortingType,
          page: String(1)
        })
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
                            value={[currentMinPrice, currentMaxPrice]}
                            onChange={rangeChange}
                            valueLabelDisplay="auto"
                            min={priceRangeMin}
                            max={priceRangeMax}
                            defaultValue={priceRangeMin}
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
                        changeSortingType(ESortingTypes.pizzaPriceASC)
                        changePaginationPage(1)
                        setSearchParams({
                          minprice: currentMinPrice.toString(),
                          maxprice: currentMaxPrice.toString(),
                          sort: ESortingTypes.pizzaPriceASC,
                          page: String(1)
                        })
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
                        changeSortingType(ESortingTypes.pizzaPriceDESC)
                        changePaginationPage(1)
                        setSearchParams({
                          minprice: currentMinPrice.toString(),
                          maxprice: currentMaxPrice.toString(),
                          sort: ESortingTypes.pizzaPriceDESC,
                          page: String(1)
                        })
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
                        changeSortingType(ESortingTypes.pizzaRatingDESC)
                        changePaginationPage(1)
                        setSearchParams({
                          minprice: currentMinPrice.toString(),
                          maxprice: currentMaxPrice.toString(),
                          sort: ESortingTypes.pizzaRatingDESC,
                          page: String(1)
                        })
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
                changeSortingType(ESortingTypes.pizzaPriceASC)
                changeCurrentMinPrice(priceRangeMin)
                changeCurrentMaxPrice(priceRangeMax)
                changePaginationPage(1)
                setSearchParams({
                  minprice: priceRangeMin.toString(),
                  maxprice: priceRangeMax.toString(),
                  sort: ESortingTypes.pizzaPriceASC,
                  page: String(1)
                })
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