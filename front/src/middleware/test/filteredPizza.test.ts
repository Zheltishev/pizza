import fetch from "cross-fetch"

test('get filtered pizza list', async () => {
    const data = await fetch('http://localhost:8000/filtered-pizza-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            minValue: 400,
            maxValue: 700,
            sortValue: 'pizza_price ASC',
            hot: false,
            veg: false,
            paginationPage: 1
        })
    })
    .then(res => res.json())
    .then(res => res.filteredPizzaList)

    expect.assertions(2)
    expect(data).toBeDefined()
    expect(data.length).toBeGreaterThanOrEqual(1)
})