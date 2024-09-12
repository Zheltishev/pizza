export interface IPizza {
    pizza_id: number,
    pizza_name: string,
    pizza_image_name: string,
    pizza_price: number,
    pizza_ingredients: string,
    pizza_size: string,
    pizza_dough: string,
    pizza_hot: boolean,
    pizza_meat: boolean,
    pizza_vegetarian: boolean,
    pizza_mix: boolean,
    pizza_rating: number,
}

// export interface ICheckingLoginPasswordResult {
//     status: boolean,
//     inputFiled: string,
//     message: string,
// }

export interface IAuthFromProps {
    closeAuthFrom: (value: boolean) => void
}