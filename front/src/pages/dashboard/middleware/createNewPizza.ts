import Cookies from "js-cookie"
import { INewPizza } from "../../../tsModals/tsModals";
import axios from "axios";

export default async function createNewPizza({...newPizza}: INewPizza) {
    const {newPizzaName, pizzaPrice, ingredientsList, doughTypesString, sizesTypeString, hotStatus, vegetarianStatus, meatStatus, mixStatus, imageFile} = newPizza
    const data = JSON.stringify({
        name: newPizzaName,
        price: pizzaPrice,
        ingredients: ingredientsList,
        dough: doughTypesString,
        size: sizesTypeString,
        hot: hotStatus,
        vegetarian: vegetarianStatus,
        meat: meatStatus,
        mix: mixStatus
    })
    
    const formData = new FormData()

    formData.append('data', data)
    formData.append('pizzaImage', imageFile)

    axios.post('http://localhost:8000/create-new-pizza', formData, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token_access')}`
        }
    })
    .then(res => {
        console.log(res.data.message)

        return res
    })

    return
}