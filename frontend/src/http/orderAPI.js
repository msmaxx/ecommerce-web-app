import {$authHost, $host} from "./index";

export const createOrder = async (orderData) => {
    const { data } = await $authHost.post('api/order/', orderData)
    return data;
}

export const createOrderItems = async (orderItemsData) => {
    const { data } = await $authHost.post('api/order_items/', orderItemsData)
    return data;
}

export const fetchOrderByUserId = async (id) => {
    const {data} = await $authHost.get('/api/order/' + id)
    return data
}

export const fetchOrderById = async (id) => {
    const {data} = await $authHost.get('/api/order/data/' + id)
    return data
}

export const updateOrderStatus = async (id, status) => {
    const {data} = await $authHost.get('/api/order/edit/status/' + id + '/' + status)
    return data
}

export const updateOrderDeliveryTime = async (id, time) => {
    const {data} = await $authHost.get('/api/order/edit/delivery-time/' + id + '/' + time)
    return data
}

export const fetchItemsByOrderId = async (id) => {
    const {data} = await $host.get('/api/order_items/' + id)
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $authHost.get('/api/order/')
    return data
}