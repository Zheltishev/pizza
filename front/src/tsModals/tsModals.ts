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

export enum ESortingTypes {
    pizzaPriceASC = 'pizza_price ASC',
    pizzaPriceDESC = 'pizza_price DESC',
    pizzaRatingDESC = 'pizza_rating DESC',
}

export interface IFilterPizza {
    priceRangeMin: number, 
    priceRangeMax: number, 
    currentMinPrice: number, 
    currentMaxPrice: number,
    sortingType: ESortingTypes,
    hotPizza: boolean,
    vegetarianPizza: boolean,
    paginationPage: number,
    changeCurrentMinPrice: (value: number) => void,
    changeCurrentMaxPrice: (value: number) => void,
    changeSortingType: (value: ESortingTypes) => void,
    changeHotPizza: (value: boolean) => void,
    changeVegetarianPizza: (value: boolean) => void,
    changePaginationPage: (value: number) => void
}

export interface IPagePagination {
    paginationPage: number,
    changePaginationPage: (value: number) => void,
    currentMinPrice: number,
    currentMaxPrice: number,
    sortingType: ESortingTypes,
    hotPizza: boolean,
    vegetarianPizza: boolean
}

export interface IPizzaItem {
    isLoading: boolean,
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

export interface IPizzaModal {
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
    closePizzaModal: (value: boolean) => void
}

export interface IOrderPizza {
    pizza_id: number,
    pizza_name: string,
    pizza_image_name: string,
    pizza_size: string,
    pizza_dough: string,
    pizza_price: number,
    pizza_count: number
}

export interface IBasketDrawer {
    openBasketDrawer: boolean,
    closeBasketDrawer: (value: boolean) => void
}

export interface IOrderModal {
    totalPrice: number,
    changeOpenOrderModal: (value: boolean) => void
}

export interface IOrder {
    order_address: string,
    order_date: string,
    order_id: number,
    order_phone: string,
    order_price: number,
    order_user_id: number,
}

export interface IOrderWithPizzaList {
    orderPhone: string,
    orderAddress: string,
    userId: number,
    totalPrice: number,
    orderDate: string,
    basketList: IOrderPizza[]
}

export interface IComposition {
    composition_id: number,
    composition_order: number,
    composition_pizza_count: number,
    composition_pizza_name: string,
    composition_pizza_price: string,
    composition_pizza_size: string
}

export interface IOrderHistory {
    userId: number | null
}

export interface IDate {
    orderDate: string
}