import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Books</h1>
      <input type="text" placeholder='Title' name='title' onChange={handleChange} />
      <input type="text" placeholder='Description' name='desc' onChange={handleChange} />
      <input type="number" placeholder='Price' name='price' onChange={handleChange} />
      <input type="text" placeholder='Cover' name='cover' onChange={handleChange} />
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update