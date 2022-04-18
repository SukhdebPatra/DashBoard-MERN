import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const nevigate = useNavigate();

  const logout = () => {
    console.log("You are loged Out");
    localStorage.clear();
    nevigate("/signup");
  };

  return (
    <>
      <div>
          <img className="logo" alt="logo" src="https://scontent.fblr1-4.fna.fbcdn.net/v/t1.6435-1/114181017_1681299672034535_6045235013302229420_n.jpg?stp=dst-jpg_p160x160&_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_ohc=Iy8famzivMwAX-3-eh2&_nc_ht=scontent.fblr1-4.fna&oh=00_AT9Cct237vO9qyijAax3JCgGJmXV0Q69uxqLV2Ue7onVZA&oe=6277709F"/>
        {auth ? 
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Produts</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>

            {/* <li>{auth ? <Link onClick={logout} to='/signup'>Log out</Link> : <Link to='/signup'>SignUp</Link>}</li>
             */}
          </ul>
        : 
          <ul className="nav-ul navright">
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="login">LogIn </Link>
            </li>
          </ul>
        }
      </div>
    </>
  );
};
export default Navbar;
