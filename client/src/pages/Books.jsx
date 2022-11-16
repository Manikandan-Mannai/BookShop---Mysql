import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                console.log(books);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Book Shop</h1>
            <div className="books">
                {
                    books.map((book) => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt="" />}
                            <h2>{book.title}</h2>
                            <p>{book.desc}</p>
                            <b>{book.price}</b>
                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                            <button><Link to={`/update/${book.id}`}>Update</Link></button>
                        </div>
                    ))
                }
            </div>
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    )
}

export default Books