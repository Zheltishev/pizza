import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPagePagination } from "../../../tsModals/tsModals";

export default function PagePagination(paginationProps: IPagePagination) {
    const { 
        paginationPage,
        changePaginationPage,
        currentMinPrice,
        currentMaxPrice,
        sortingType,
        hotPizza,
        vegetarianPizza
    } = paginationProps
    const [searchParams, setSearchParams] = useSearchParams()
    const [ countTotalPage, setCountTotalPage ] = useState(1)

    useEffect(() => {
        fetch('http://localhost:8000/current-pizza-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                minValue: currentMinPrice,
                maxValue: currentMaxPrice,
                hot: hotPizza,
                veg: vegetarianPizza
            })
        })
          .then(res => res.json())
          .then(res => {
            setCountTotalPage(Math.ceil(Number(res.count) / 8))
            
            if (searchParams.size > 0 && Number(searchParams.get('page')) <= Math.ceil(Number(res.count) / 8 )) {
                changePaginationPage(Number(searchParams.get('page')))
            } else if (searchParams.size > 0) {
                changePaginationPage(1)
                setSearchParams({
                    minprice: currentMinPrice.toString(),
                    maxprice: currentMaxPrice.toString(),
                    sort: sortingType,
                    hot: hotPizza.toString(),
                    veg: vegetarianPizza.toString(),
                    page: String(1)
                  })
            }

            return
          })
      }, [ currentMinPrice, currentMaxPrice, hotPizza, vegetarianPizza ])

    return (
        <Stack sx={{
                paddingBlock: 2,
                display: 'grid',
                justifyContent: 'center'
            }}>
            <Pagination 
                count={countTotalPage} 
                page={paginationPage}
                color="primary" 
                onChange={(e, page) => {
                    changePaginationPage(page)
                    setSearchParams({
                        minprice: currentMinPrice.toString(),
                        maxprice: currentMaxPrice.toString(),
                        sort: sortingType,
                        hot: hotPizza.toString(),
                        veg: vegetarianPizza.toString(),
                        page: page.toString()
                      })
                }}
            />
        </Stack>
    )
}