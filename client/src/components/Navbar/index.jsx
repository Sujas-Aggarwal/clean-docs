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
      name: "My Docs",
      link: "/docs",
    },
    // {
    //   name: "Admin",
    //   link: "/admin",
    // },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#24063f] fixed top-0 left-0 text-white shadow-md  w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Hamburger Icon for Mobile */}
        <div className="flex items-center space-x-3">
          <div
            className="lg:hidden cursor-pointer"
            onClick={menuToggle}
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/favicon.png" alt="Clean Docs" className="w-10 h-10" />
            <span className="text-xl font-semibold hidden sm:block">
              Clean Docs
            </span>
          </Link>
        </div>

        {/* Navbar Menu */}
        <nav
          className={`absolute lg:relative top-16 lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-gray-800 lg:bg-transparent flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 transition-transform duration-300 lg:translate-x-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:items-center`}
        >
          {menuList.map((menu, index) => (
            <Link
              key={index}
              to={menu.link}
              onClick={menuToggle}
              className="text-white hover:text-purple-500 lg:px-2"
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        {/* Auth Button */}
        <span>
          {auth?.username ? (
            <button
              onClick={logout}
              className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-lg transition duration-300"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-lg transition duration-300"
            >
              Log in
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};
