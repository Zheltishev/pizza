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

export interface IAuthFromProps {
    closeAuthFrom: (value: boolean) => void
}

export interface IAuthFormData {
    status: number,
    message: string,
    inputField: string,
}

export enum ETokenType {
    token_access = 'token_access',
    token_refresh = 'token_refresh'
}

export enum ESortValues {
    pizzaPriceASC = 'pizza_price ASC',
    pizzaPriceDESC = 'pizza_price DESC',
    pizzaRatingDESC = 'pizza_rating DESC',
}