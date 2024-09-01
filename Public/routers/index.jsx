import { createBrowserRouter } from "react-router-dom";
import ProductList from "../views/ProductList";
import { ProductDetail } from "../views/ProductDetail";
import BaseLayout from "../views/BaseLayout";


const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = `${proxy}http://www.daseas.cloud`;


const router = createBrowserRouter([
  {
    element:<BaseLayout/>,
    loader: () => {
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
      }
    ],
  },
]);

export default router;
