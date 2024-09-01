import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ProductDetail({url}) {
  const navigate = useNavigate()
  const {id} = useParams()
  const [product, setProduct] = useState([]);

  async function fetchOneProducts() {
    try {
      const { data } = await axios.get(`${url}/pub/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("fetch product detail success");
    fetchOneProducts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      {/* Product Detail Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">Rp.{product.price}</p>
          <p className="text-md text-gray-600 mb-4">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-4">
            <button className="btn" onClick={() => navigate("/")}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
