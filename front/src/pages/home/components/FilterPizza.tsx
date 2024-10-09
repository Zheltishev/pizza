import { Badge, Box, Collapse, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid2';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useEffect, useState } from "react"
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { ESortingTypes, IFilterPizza } from "../../../tsModals/tsModals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import BasketDrawer from "./BasketDrawer";
import { basketAddPizza } from "../../../redux/basketListSlice";

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
    const [ searchParams, setSearchParams ] = useSearchParams()
    const { basketList } = useSelector((state: RootState) => state.rootReducer.basketListSlice )
    const dispatch = useDispatch()
    const [ sortOpen, setSortOpen ] = useState(false)
    const [ openBasketDrawer, setOpenBasketDrawer ] = useState(false)
    const minDistance = 10

    const closeBasketDrawer = (value: boolean) => {
      setOpenBasketDrawer(value)
    }

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

    useEffect(() => {
      if (localStorage.basketList) {
        const basketFromLocalStorage = JSON.parse(localStorage.basketList)

        if (basketFromLocalStorage.length > 0) {
          basketFromLocalStorage.forEach((pizza: any) => {
            dispatch(basketAddPizza(pizza))
          })
        }
      } 
    }, [])

    useEffect(() => {
      window.localStorage.setItem('basketList', JSON.stringify(basketList))
    }, [basketList])

    return (
        <Grid 
          container 
          sx={{
            padding: '0.5rem 1rem 0 1rem', 
            alignItems: 'center',
            justifyContent: {
              xs: 'center',
              md: 'end'
            }
          }}
          spacing={{
            xs: 1,
            md: 4
          }}
        > 
            <Box
              sx={{
                flexGrow: {
                  xs: 1,
                  md: 1
                }
              }}
            >
                <Typography>
                    Цена
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid>
                        <CurrencyRubleIcon />
                    </Grid>
                    <Grid 
                      sx={{ minWidth: {
                          md: 300,
                          xs: 240,
                        }
                      }}>
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
            
            <Box
              sx={{
                flexGrow: {
                  xs: 1,
                  md: 0
                }
              }}
            >
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

            <Grid2 container sx={{ 
              alignItems: 'center',
              justifyContent: 'end',
              flexGrow: {
                xs: 1,
                md: 0
              }
             }}>
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

              <Box>
                <Badge 
                  badgeContent={basketList.map(e => e.pizza_count).reduce((a, b) => a + b, 0)} 
                  color="primary" 
                  onClick={() => {
                    setOpenBasketDrawer(true)
                  }}
                  sx={{
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <ShoppingCartIcon color="primary" />
                </Badge>
              </Box>
            </Grid2>

            <BasketDrawer closeBasketDrawer={closeBasketDrawer} openBasketDrawer={openBasketDrawer} />
        </Grid>
    )
}