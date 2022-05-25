import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";

export default function SignInPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const navigate = useNavigate();

  const baseAPIUrl = "http://localhost:8000/api";

  const checkData = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseAPIUrl}/user/login`, { email, pass })
      .then((res) => {
        if (res.data.ok) {
          console.log("correct user detatils -->");

          localStorage.setItem("email", email);

          navigate("/home");
        } else {
          alert("Incorrect Email or Password!");

          console.log("incorrect -----");
        }
      })
      .catch((err) => console.log("ERROR ==> ", err));
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={(e) => checkData(e)}>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="first_name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            // placeholder="abhi@gmail.com"
          />
        </p>
        <p>
          <label>Password</label>

          <br />
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            // placeholder="password"
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
