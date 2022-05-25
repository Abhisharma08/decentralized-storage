import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { create } from "ipfs-http-client";
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

export default function Main() {
  const [buffer, setBuffer] = useState(null);
  const fileHash = "Qmcy9YqDNP9a9RGBxpPmmjRUUBSwT529cza66RYhJRTm3N";

  const email = localStorage.getItem("email");
  const [hashCodes, setHashCodes] = useState([]);

  useEffect(() => {
    axios
      .post(`${baseAPIUrl}/user/getfiles`, { email })
      .then((res) => {
        if (res.data.ok) {
          setHashCodes(res.data.files);
        } else console.log("invalid user");
      })
      .catch((err) => console.log("ERROR ==> ", err));
  }, []);

  const baseAPIUrl = "http://localhost:8000/api";
  const sendData = async (hash) => {
    await axios
      .post(`${baseAPIUrl}/user/savefile`, {
        email,
        hash: hash,
      })
      .then((res) => {
        if (res.data.fileSaved) {
          alert("File saved successfully!");
        }
      });
  };
  const navigate = useNavigate();
  const captureFile = (event) => {
    event.preventDefault();
    //process file for IPFS

    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
    var infoArea = document.querySelector(".file-label");

    // use fileName however fits your app best, i.e. add it into a div
    infoArea.innerText = "File name: " + file.name;
    console.log(infoArea);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting the form...");
    const result = await ipfs.add(buffer);
    console.log("IPFS Result", result.path);
    sendData(result.path);
    setHashCodes((prev) => [...prev, result.path]);
  };
  // store file in blockchain

  const handleLogout = () => {
    console.log("redirect ---");
    localStorage.setItem("email", "");
    navigate("/");
  };

  const handleDelete = (hash) => {
    if (window.confirm("Delete ?")) {
      console.log(hash);
      axios
        .post(`${baseAPIUrl}/user/deletefile`, { email: email, hash: hash })
        .then((res) => {
          console.log(res.data);
          if (res.data.deleted) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("ERROR DELETING file -->", err);
        });
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          href="https://www.tech-geeks.tech"
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Decentralized Storage
        </a>
        <button
          className="logout-btn"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </nav>
      <div className="main-container">
        <div className="container-fluid mt-5 container">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://www.tech-geeks.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://ipfs.infura.io/ipfs/${fileHash}`}
                    className="App-logo"
                    alt="logo"
                  />
                </a>
                <p>&nbsp;</p>
                <form className="form" onSubmit={(event) => onSubmit(event)}>
                  <label for="file-input" className="file-label">
                    upload a file
                  </label>
                  <input
                    id="file-input"
                    className="form-file"
                    type="file"
                    onChange={(event) => captureFile(event)}
                  />
                  <input className="form-submit" type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
        <div className="sidePanel">
          <div>My Files</div>
          {hashCodes.map((hash) => {
            console.log(hash, "<---");

            return (
              <div className="image-container" key={hash}>
                <img
                  src={`https://ipfs.infura.io/ipfs/${hash}`}
                  className="App-logo"
                  alt="No prev"
                />
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(hash)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
