import {makeAutoObservable} from "mobx";

export default class ItemStore {
    constructor() {
        this._categories = []
        this._items = []
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setItem(items) {
        this._items = items
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }

    get items() {
        return this._items
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}