import {makeAutoObservable} from "mobx";

export default class UserStore {

    constructor() {
        this._isAuth = false
        this._userEmail = null
        this._id = null
        this._isAdmin = false
        this._name = null
        this._guest = true
        this._cartId = null

        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setId(id) {
        this._id = id
    }

    setEmail(email) {
        this._userEmail = email
    }

    setAdmin(bool) {
        this._isAdmin = bool
    }

    setName(name) {
        this._name = name
    }

    setGuest(guest) {
        this._guest = guest
    }

    setCartId(id) {
        this._cartId = id
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }

    get id() {
        return this._id;
    }

    get userEmail() {
        return this._userEmail
    }

    get name() {
        return this._name
    }

    get guest() {
        return this._guest
    }

    get cartId() {
        return this._cartId
    }
}