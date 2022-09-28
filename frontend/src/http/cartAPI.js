import { $authHost } from "./index";


export const fetchCartItems = async () => {
    const { data } = await $authHost.get("api/cart_items/");
    return data;
};

export const addItemToCart = async (item) => {
    const { data } = await $authHost.post('api/cart_items/', item)
    return data;
}

export const fetchOneCart = async (id) => {
    const {data} = await $authHost.get('/api/cart/' + id)
    return data
}

export const fetchCartItemsById = async (id) => {
    const {data} = await $authHost.get('/api/cart_items/' + id)
    return data
}

export const deleteCartItem = async (id) => {
    const { data } = await $authHost.delete('api/cart_items/del/' + id);
    return data
};