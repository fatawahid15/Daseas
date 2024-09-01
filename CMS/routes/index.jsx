import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import LoginPage from "../views/LoginPage";
import ProductList from "../views/ProductList";
import { ProductDetail } from "../views/ProductDetail";
import CategoryList from "../views/CategoryList";
import AddUser from "../views/AddUser";

const url = 'https://www.daseas.cloud'

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => { 
        const token = localStorage.getItem('access_token')

        if(!token) {
            return redirect('/login')
        }
      return null;
    },
    children: [
      {
        path: "/",
        element: <ProductList url={url}/>,
      },
      {
        path: ":id",
        element: <ProductDetail url={url}/>
      },
      {
        path: "/categories",
        element: <CategoryList url={url}/>
      },
      {
        path: "/add-user",
        element: <AddUser url={url}/>
      }
    ],
  },
  {
    loader: () => {

        const token = localStorage.getItem('access_token')

        if(token) {
            return redirect('/')
        }

      return null;
    },
    children: [
      {
        path: "/login",
        element: <LoginPage url={url}/>,
      },
    ],
  },
]);

export default router;
