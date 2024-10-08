import { IOrderPizza } from "../../../tsModals/tsModals";

export default function matchPizza(pizza: IOrderPizza, basketList: IOrderPizza[]) {
    let match = 0

    basketList.forEach(pizzaInBasket => {
        if (pizzaInBasket.pizza_name === pizza.pizza_name
            && pizzaInBasket.pizza_dough === pizza.pizza_dough
            && pizzaInBasket.pizza_size === pizza.pizza_size
        ) {
            match = pizzaInBasket.pizza_id
        }
    })

    return match
}