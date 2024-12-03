import axios from "axios";
import Cookies from "js-cookie";
import { IChangePizzaTextAndImage } from "../../../tsModals/tsModals";

export default async function changePizzaTextAndImage({...props}: IChangePizzaTextAndImage) {
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
        mixStatus, 
        imageFile
    } = props
    const data = JSON.stringify({
        id: pizzaId,
        name: pizzaName,
        imageName: currentImageName,
        price: pizzaPrice,
        ingredients: pizzaIngredients,
        size: sizesTypeString,
        dough: doughTypesString,
        hot: hotStatus,
        meat: meatStatus,
        vegetarian: vegetarianStatus,
        mix: mixStatus
    })
    const formData = new FormData()

    formData.append('data', data)
    formData.append('pizzaImage', imageFile)

    const result = axios.post('http://localhost:8000/change-pizza-text-and-image', formData, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token_access')}`
        }
    })
    .then(res => res.data.status)

    return result
}