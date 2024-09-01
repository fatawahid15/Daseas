import React from "react";

export default function ProductForm({
  editMode,
  newProduct,
  categories,
  handleChange,
  handleSubmit,
  closeModal,
}) {
  return (
    <dialog id="m1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {editMode ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full mb-2"
            value={newProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-full mb-2"
            value={newProduct.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full mb-2"
            value={newProduct.price}
            onChange={(e) => handleChange("price", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            className="input input-bordered w-full mb-2"
            value={newProduct.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Image Url"
            className="input input-bordered w-full mb-2"
            value={newProduct.imgUrl}
            onChange={(e) => handleChange("imgUrl", e.target.value)}
            required
          />
          <select
            className="select select-bordered w-full mb-2"
            value={newProduct.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.name}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {editMode ? "Save Changes" : "Add Product"}
            </button>
            <button type="button" className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
