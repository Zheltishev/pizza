import { useSearchParams } from "react-router-dom";
import FilterPizza from "./FilterPizza";
import Pizza from "./Pizza";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ESortingTypes } from "../../../tsModals/tsModals";
import filteredPizza from "../../../middleware/filteredPizza";
import { changePizzaList } from "../../../redux/pizzaListSlice";
import PagePagination from "./PagePagination";

export default function Main() {
    const dispatch = useDispatch()
    const [ searchParams ] = useSearchParams()
    const [ priceRangeMin, setPriceRangeMin ] = useState(400)
    const [ priceRangeMax, setPriceRangeMax ] = useState(700)
    const [ currentMinPrice, setCurrentMinPrice ] = useState(400)
    const [ currentMaxPrice, setCurrentMaxPrice ] = useState(700)
    const [ sortingType, setSortingType ] = useState<ESortingTypes>(ESortingTypes.pizzaPriceASC)
    const [ hotPizza, setHotPizza ] = useState(false)
    const [ vegetarianPizza, setVegetarianPizza ] = useState(false)
    const [ paginationPage, setPaginationPage ] = useState(1)

    const changeCurrentMinPrice = (value: number) => {
        setCurrentMinPrice(value)
    }
    const changeCurrentMaxPrice = (value: number) => {
        setCurrentMaxPrice(value)
    }
    const changeSortingType = (value: ESortingTypes) => {
        setSortingType(value)
    }
    const changeHotPizza = (value: boolean) => {
        setHotPizza(value)
    }
    const changeVegetarianPizza = (value: boolean) => {
        setVegetarianPizza(value)
    }
    const changePaginationPage = (value: number) => {
        setPaginationPage(value)
    }

    useEffect(() => {
        fetch('http://localhost:8000/get-min-max-price')
          .then(res => res.json())
          .then(res => {
            setPriceRangeMin(Number(res.min))
            setPriceRangeMax(Number(res.max))
            
            if (searchParams.size > 0 ) {
                setCurrentMinPrice(Number(searchParams.get('minprice')))
                setCurrentMaxPrice(Number(searchParams.get('maxprice')))
                searchParams.get('sort') === ESortingTypes.pizzaPriceASC 
                    ? setSortingType(ESortingTypes.pizzaPriceASC) 
                    : searchParams.get('sort') === ESortingTypes.pizzaPriceDESC
                        ? setSortingType(ESortingTypes.pizzaPriceDESC) : setSortingType(ESortingTypes.pizzaRatingDESC)
                setHotPizza(searchParams.get('hot') === 'true' ? true : false)
                setVegetarianPizza(searchParams.get('veg') === 'true' ? true : false)
                setPaginationPage(Number(searchParams.get('page')))
            } else {
                setCurrentMinPrice(Number(res.min))
                setCurrentMaxPrice(Number(res.max))
            }

            return
          })
      }, [])

      useEffect(() => {
        async function showPizzaListByParams() {
            const filteredPrice =  await filteredPizza(currentMinPrice, currentMaxPrice, sortingType, hotPizza, vegetarianPizza, paginationPage)
  
            dispatch(changePizzaList(filteredPrice))
        }

        showPizzaListByParams()
      }, [currentMinPrice, currentMaxPrice, sortingType, hotPizza, vegetarianPizza, paginationPage, dispatch])

    return (
        <div 
            style={{
                display: 'grid',
                justifyContent: 'center'
            }}
        >
            <FilterPizza 
                priceRangeMin = { priceRangeMin }
                priceRangeMax = { priceRangeMax }
                currentMinPrice = { currentMinPrice }
                currentMaxPrice = { currentMaxPrice }
                sortingType = { sortingType }
                hotPizza = { hotPizza }
                vegetarianPizza = { vegetarianPizza }
                paginationPage = { paginationPage }
                changeCurrentMinPrice = { changeCurrentMinPrice }
                changeCurrentMaxPrice = { changeCurrentMaxPrice }
                changeSortingType = { changeSortingType }
                changeHotPizza = { changeHotPizza }
                changeVegetarianPizza = { changeVegetarianPizza }
                changePaginationPage = { changePaginationPage }
            />
            <Pizza />
            <PagePagination 
                paginationPage = { paginationPage }
                changePaginationPage = { changePaginationPage }
                currentMinPrice = { currentMinPrice }
                currentMaxPrice = { currentMaxPrice }
                sortingType = { sortingType }
                hotPizza = { hotPizza }
                vegetarianPizza = { vegetarianPizza }
            />
        </div>
    )
}