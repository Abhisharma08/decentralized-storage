import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function SignUpPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const navigate = useNavigate();

  const baseAPIUrl = "http://localhost:8000/api";

  const sendData = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseAPIUrl}/user/register`, {
        ok: true,
        email,
        pass,
      })
      .then((res) => {
        if (res.data.userSaved) {
          navigate("/login");
        }
      });
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={(e) => sendData(e)}>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            I agree all statements in{" "}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms of service
            </a>
          </span>
          .
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
