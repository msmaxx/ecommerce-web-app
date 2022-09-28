import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._items = [];
        this._totalPrice = 0;

        makeAutoObservable(this);
    }

    setTotalPrice(price) {
        this._totalPrice = price;
    }

    setCartItems(info) {
        this._items = info;
    }


    get totalPrice(){
        return this._totalPrice;
    }

    get items() {
        return this._items;
    }
}