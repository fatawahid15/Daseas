import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Make sure to import Toastify CSS

export default function AddUser({ url }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/add-user`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Toastify({
        text: `User added successfully!`,
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

      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });

      navigate("/");
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
      navigate("/add-user");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-sm bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Add New User</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="btn"
          >
            Add User
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate('/')}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
