import Admin from "./pages/Admin_file/Admin.jsx"
import { ADMIN_ROUTE, BASKET_ROUTE, BOOKPAGE_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import MainPage from "./pages/Mainpage_file/MainPage"
import Shop from "./pages/Shop_file/Shop"
import Auth from "./pages/Auth_file/Auth"
import Basket from "./pages/Basket_file/Basket.jsx"
import BookPage from "./pages/Bookpage_file/BookPage.jsx"

export const authRoutes = [
 
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
        path: BOOKPAGE_ROUTE + '/:id',
        Component: BookPage
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
      },
      {
        path: BASKET_ROUTE,
        Component: Basket
      },

];
