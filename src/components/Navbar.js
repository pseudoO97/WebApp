import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
export default function Navbar() {
  const { toggleModals } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      alert("for some reasons we ca't  deconnect");
    }
  };
  return (
    <nav className=" navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJs
      </Link>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => toggleModals("signIn")}
        >
          sing in
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={() => toggleModals("signUp")}
        >
          sing up
        </button>
        <button className="btn btn-danger ms-2" onClick={logOut}>
          log out
        </button>
      </div>
    </nav>
  );
}
