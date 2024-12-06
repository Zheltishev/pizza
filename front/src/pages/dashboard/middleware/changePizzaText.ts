import { IChangePizzaText } from "../../../tsModals/tsModals";
import Cookies from "js-cookie";

export default async function changePizzaText({...props}: IChangePizzaText) {
    const {
        pizzaId, 
        pizzaName, 
        currentImageName, 
        pizzaPrice, 
        pizzaIngredients, 
        sizesTypeString, 
        doughTypesString, 
        hotStatus, 
        meatStatus, 
        vegetarianStatus, 
        mixStatus
    } = props

    const result = await fetch('http://localhost:8000/change-pizza-text', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token_access')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: pizzaId,
                name: pizzaName,
                imageName: currentImageName,
                price: pizzaPrice,
                ingredients: pizzaIngredients,
                size: sizesTypeString,
                dough: doughTypesString,
                hot: hotStatus,
                meat: meatStatus,
                vegetarian: vegetarianStatus,
                mix: mixStatus})
    })
    .then(res => res.json())
    .then(res => res)

    return result
}