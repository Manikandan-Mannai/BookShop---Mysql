import express, { json, request, response } from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "6383241428@mani",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    response.json("This is home page of backed")
})

//get
app.get("/books", (request, response) => {
    const q = "SELECT * FROM boooks";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return response.json(err);
        }
        return response.json(data);
    });
});

//post
app.post("/books", (request, response) => {
    const q = "INSERT INTO boooks (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        request.body.title,
        request.body.desc,
        request.body.price,
        request.body.cover,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return response.json(err);
        return response.json(data);
    })
});

//delete
app.delete("/books/:id", (request, response) => {
    const bookId = request.params.id;
    const q = " DELETE FROM boooks WHERE id = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return response.send(err);
        return response.json(data);
    });
});

//update
app.put("/books/:id", (request, response) => {
    const bookid = request.params.id;
    const q = "UPDATE boooks SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
    const values = [
        request.body.title,
        request.body.desc,
        request.body.price,
        request.body.cover,
    ];

    db.query(q, [...values, bookid], (err, data) => {
        if (err) return response.send(err);
        return response.json(data);
    });
})


app.listen(8800, () => {
    console.log("backend connected Sucessfully");
})