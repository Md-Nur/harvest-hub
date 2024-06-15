import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useUserAuth } from "../context/UserAuthProvider";
import { MdCancel, MdFastfood } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const NavRoutes = () => {
  const { user, loading } = useUserAuth();
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-foods">Available Foods</NavLink>
      </li>
      <li>
        <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
      </li>
      <li>
        <NavLink to="/my-food-request">My Food Request</NavLink>
      </li>
      <li>
        <NavLink to="/add-food">Add Food</NavLink>
      </li>
      {!loading && user ? (
        <li>
          <Logout />
        </li>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">SignUp</NavLink>
          </li>
        </>
      )}
    </>
  );
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUserAuth();
  return (
    <nav className="navbar bg-base-100 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? <BiMenu className="w-6 h-6" /> : <MdCancel className="w-6 h-6" />}
          </div>
          <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 lg:hidden"
            >
              <NavRoutes />
            </ul>
          </motion.nav>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl flex items-center justify-center"
        >
          <MdFastfood className="w-10 h-10" />
          <span className="text-sm">HarvestHub</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavRoutes />
        </ul>
      </div>
      <div className="navbar-end">
        <div className="avatar">
          <div className="w-12 mask mask-squircle">
            <img
              src={
                !loading && user?.photoURL
                  ? user.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt={user?.displayName}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
