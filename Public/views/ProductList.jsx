import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList({ url }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [sort, setSort] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getPagination() {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }
    return temp;
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/pub/products?search=${search}&filter=${filtered}&sort=${sort}&page[number]=${currentPage}&page[size]=10`
      );

      setProducts(data.data);
      setTotalPage(data.totalPage);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/pub/categories`);
      setFilter(data.category);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [search, filtered, sort, currentPage]);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none gap-2 flex items-center">
          <div className="form-control">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li tabIndex={0}>
              <select
                className="select select-ghost w-52 rounded-box"
                onChange={(e) => {
                  setFiltered(e.target.value);
                  setCurrentPage(1);
                }}
                value={filtered}
              >
                <option value="" disabled aria-disabled="true">
                  Filter Product
                </option>
                {filter.map((filters) => (
                  <option value={filters.id} key={filters.id}>
                    {filters.name}
                  </option>
                ))}
                <option value="">Clear</option>
              </select>
            </li>

            <li tabIndex={0}>
              <select
                className="select select-ghost w-52 rounded-box"
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                value={sort}
              >
                <option disabled value="">
                  Sort Product
                </option>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
                <option value="">Clear</option>
              </select>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="flex justify-center">
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 m-20">
            {products.map((product) => (
              <div className="card bg-base-100 w-96 shadow-xl" key={product.id}>
                <figure>
                  <img src={product.imgUrl} alt={product.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`${product.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="join">
            <button
              className="join-item btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              «
            </button>
            {getPagination().map((el) => (
              <button
                key={el}
                className={
                  el === currentPage
                    ? "join-item btn btn-active"
                    : "join-item btn"
                }
                onClick={() => setCurrentPage(el)}
              >
                {el}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              »
            </button>
          </div>
        </>
      )}
    </>
  );
}
