export default async function filteredPizza(price: number[]) {
    const result = await fetch('http://localhost:8000/filtered-pizza-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            minValue: price[0],
            maxValue: price[1]
        })
    })
        .then(res => res.json())
        .then(res => res.filteredPizzaList)

    return result
}