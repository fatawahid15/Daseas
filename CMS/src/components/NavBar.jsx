import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
            Home
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1"></ul>{" "}
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="btn btn-ghost" onClick={() => navigate("/categories")}>
                Categories
              </button>
            </li>
            <li>
              <button className="btn btn-ghost">
                Add Categories
              </button>
            </li>
            <li>
              <button className="btn btn-ghost" onClick={() => navigate('/add-user')}>
                Add User
              </button>
            </li>
            <li>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <br />
    </>
  );
}
