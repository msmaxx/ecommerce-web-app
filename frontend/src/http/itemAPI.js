import {$authHost, $host} from "./index";



export const createItem = async (item) => {
    const {data} = await $authHost.post('/api/item', item)
    return data
}

export const fetchAllItems = async () => {
    const {data} = await $host.get('/api/item')
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('/api/item/' + id)
    return data
}

export const updateItemData = async (id, name, description, price, quantity, categoryId) => {
    const {data} = await $host.get('/api/item/update/' + id + '/' + name + '/' + description + '/' + price + '/' + quantity + '/' + categoryId)
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('/api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('/api/category')
    return data
}

export const fetchCategoryById = async (id) => {
    const {data} = await $host.get('/api/category/' + id)
    return data
}


