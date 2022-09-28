import {makeAutoObservable} from "mobx";

export default class OrderStore {
    constructor() {


        this._paymentMethod = null
        this._paymentStatus = null
        this._totalPrice = null
        this._comment = null
        this._status = null

        this._allowed = false
        this._items = []
        makeAutoObservable(this);
    }

    setPaymentMethod(method) {
        this._paymentMethod = method
    }

    setPaymentStatus(status) {
        this._paymentStatus = status
    }

    setItems(items) {
        this._items = items
    }

    setComment(comment) {
        this._comment = comment
    }

    setStatus(status) {
        this._status = status
    }

    setAllowed(allowed) {
        this._allowed = allowed
    }

    setTotalPrice(price) {
        this._totalPrice = price
    }

    get items() {
        return this._items;
    }

    get paymentMethod() {
        return this._paymentMethod;
    }

    get comment() {
        return this._comment;
    }

    get paymentStatus() {
        return this._paymentStatus;
    }

    get totalPrice() {
        return this._totalPrice;
    }
}