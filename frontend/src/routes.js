import {
    ADMIN_ROUTE,
    PRODUCTS_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    ORDER_ROUTE,
    POS_ROUTE,
    REPORTS_ROUTE,
    SETTINGS_ROUTE,
    PROFILE_SETTINGS_ROUTE, SALE_ROUTE,
} from "./utils/consts";

import POS from "./pages/POS";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Sale from "./pages/Sale"
import Reports from "./pages/Reports";
import POSSettings from "./pages/POSSettings";
import ProfileSettings from "./pages/ProfileSettings";
import Order from "./pages/Order";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: PRODUCTS_ROUTE,
        Component: Products,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: ORDER_ROUTE,
        Component: Order,
    },
    {
        path: SALE_ROUTE,
        Component: Sale,
    },
    {
        path: POS_ROUTE,
        Component: POS,
    },
    {
        path: REPORTS_ROUTE,
        Component: Reports,
    },
    {
        path: SETTINGS_ROUTE,
        Component: POSSettings,
    },
    {
        path: PROFILE_SETTINGS_ROUTE,
        Component: ProfileSettings,
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    }

]

