import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";

export function ProductDetail({url}) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  async function fetchOneProduct() {
    try {
      const { data } = await axios.get(
        `${url}/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setProduct(data);
      setImagePreview(data.imgUrl)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOneProduct();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      Toastify({
        text: 'Select an Image to upload',
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

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      await axios.patch(
        `${url}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Toastify({
        text: `Image updated successfully!`,
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

      setIsModalOpen(false);
      setImagePreview("");
      fetchOneProduct();
    } catch (error) {
      console.log(error);
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

  return (
    <div className="container mx-auto p-4">
  
      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Update Image
          </button>
        </div>


        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">Rp.{product.price}</p>
          <p className="text-md text-gray-600 mb-4">{product.description}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
