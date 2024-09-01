import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import ProductForm from "../src/components/ProductForm";

export default function ProductList({ url }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddOrEditProduct = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${url}/products/${currentProduct.id}`, newProduct, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        Toastify({
          text: `Success edit data ${currentProduct.name}`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#008000",
          },
          onClick: function () {},
        }).showToast();
      } else {
        await axios.post(`${url}/products`, newProduct, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        Toastify({
          text: `Success adding new Data`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#008000",
          },
          onClick: function () {},
        }).showToast();
      }
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        imgUrl: "",
        categoryId: "",
      });
      document.getElementById("m1").close();
      fetchProducts();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Toastify({
        text: `Success delete data ${data.data.name}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
        onClick: function () {},
      }).showToast();
      fetchProducts();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  const openModalForEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imgUrl: product.imgUrl,
      categoryId: product.categoryId,
    });
    document.getElementById("m1").showModal();
  };

  const openModalForAdd = () => {
    setEditMode(false);
    setCurrentProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      imgUrl: "",
      categoryId: "",
    });
    document.getElementById("m1").showModal();
  };

  const handleChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const closeModal = () => {
    document.getElementById("m1").close();
  };

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  return (
    <>
      <button className="btn" onClick={openModalForAdd}>
        Add Product
      </button>
      <ProductForm
        editMode={editMode}
        newProduct={newProduct}
        categories={category}
        handleChange={handleChange}
        handleSubmit={handleAddOrEditProduct}
        closeModal={closeModal}
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Username</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>
                  <div className="flex justify-center">
                    <span className="loading loading-spinner text-primary"></span>
                    <span className="loading loading-spinner text-secondary"></span>
                    <span className="loading loading-spinner text-accent"></span>
                    <span className="loading loading-spinner text-neutral"></span>
                    <span className="loading loading-spinner text-info"></span>
                    <span className="loading loading-spinner text-success"></span>
                    <span className="loading loading-spinner text-warning"></span>
                  </div>
                </td>
              </tr>
            ) : (
              product.map((p, index) => {
                const categoryName =
                  category.find((ct) => ct.id == p.categoryId)?.name ||
                  "Unknown Category";

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{p.User.username}</td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>{categoryName}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <img src={p.imgUrl} className="h-24 w-24" alt={p.name} />
                    </td>
                    <td>
                      <button
                        className="btn mr-1 btn-sm"
                        onClick={() => openModalForEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm mr-1"
                        onClick={() => navigate(`${p.id}`)}
                      >
                        Edit Image
                      </button>
                      <button
                        className="btn mr-1 btn-sm"
                        onClick={() => handleDeleteProduct(p.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm mr-1"
                        onClick={() => navigate(`${p.id}`)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
