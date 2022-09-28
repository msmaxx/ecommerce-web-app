import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserStore from "./store/UserStore";
import ItemStore from "./store/ItemStore";
import CartStore from "./store/CartStore";
import OrderStore from "./store/OrderStore";

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        item: new ItemStore(),
        cart: new CartStore(),
        order: new OrderStore(),
    }}>
        <App/>
    </Context.Provider>,
);