import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import { useState } from "react";

export const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Private",
      link: "/private",
    },
    {
      name: "Admin",
      link: "/admin",
    },
  ];
  const [headerClass, setHeaderClass] = useState("");
  const menuToggle = () => {
    headerClass === "open" ? setHeaderClass("") : setHeaderClass("open");
  };

  return (
    <header className={headerClass}>
      <div className="nav__hamburger" onClick={menuToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className="navbar">
        <li className="logo">
          <Link to="/">
            <img src="./favicon.png" width={50} height={50} alt="Clean Docs" />
          </Link>
        </li>

        <div className="nav__menu">
          {menuList.map((menu, index) => {
            return (
              <li className="hover:text-white/90" key={index}>
                <Link to={menu.link} onClick={menuToggle}>
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
      <span className="border-purple-700 border-solid border-[2px] px-4 py-1 rounded-xl hover:bg-purple-700 hover:text-white">
        {auth?.username ? (
          <button className="button" onClick={logout}>
            Log out
          </button>
        ) : (
          <Link className="button" to="/login">
            Log in
          </Link>
        )}
      </span>
    </header>
  );
};
