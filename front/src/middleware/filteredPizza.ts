import { ESortingTypes } from "../tsModals/tsModals"

export default async function filteredPizza(
        currentMinPrice: number, 
        currentMaxPrice: number, 
        sortingType: ESortingTypes,
        paginationPage: number
    ) {
    const result = await fetch('http://localhost:8000/filtered-pizza-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            minValue: currentMinPrice,
            maxValue: currentMaxPrice,
            sortValue: sortingType,
            paginationPage: paginationPage
        })
    })
        .then(res => res.json())
        .then(res => res.filteredPizzaList)

    return result
}