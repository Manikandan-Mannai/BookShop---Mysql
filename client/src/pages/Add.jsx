import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add Books</h1>
      <input type="text" placeholder='Title' name='title' onChange={handleChange} />
      <input type="text" placeholder='Description' name='desc' onChange={handleChange} />
      <input type="number" placeholder='Price' name='price' onChange={handleChange} />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add