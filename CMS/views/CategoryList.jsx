import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryList({ url }) {
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((ct, index) => {
                return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{ct.name}</td>
              </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
