import { Component } from "react"
import Admin from "./pages/Admin"
import { ADMIN_ROUTE, BASKET_ROUTE, BOOKPAGE_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import Basket from "./pages/Basket"
import MainPage from "./pages/MainPage"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import BookPage from "./pages/BookPage"

export const authRoutes = [
 
    {
        path: BASKET_ROUTE,
        Component: Basket
      },
      
   
    ];
export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component:  Auth
    },
    {
        path: ADMIN_ROUTE,
        Component:  Admin
    },
    {
        path: BOOKPAGE_ROUTE + '/:id',
        Component: BookPage
    },

]
