import React, { useEffect, useState } from "react";
import axios from "axios";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    auther: "",
    genre: "",
  });

  const [book, setBook] = useState([]);
  // get data:
  console.log("books", book);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("/api/book/get");
        console.log(res.data.books);
        setBook(res.data.books);
      } catch (error) {
        console.log("error fetching", error);
      }
    };
    fetchBook();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);

      //  API call to backend
      const res = await axios.post("/api/book/add", form);

      console.log(res);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book!");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4">
      <input
        type="text"
        name="title"
        placeholder="Enter your title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Enter your price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="auther"
        placeholder="Enter author name"
        value={form.auther}
        onChange={handleChange}
      />
      <input
        type="text"
        name="genre"
        placeholder="Enter your genre"
        value={form.genre}
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Book
      </button>

    </form>
      <div className="w-full grid grid-cols-4  m-3 bg-">
        {book.map((b) => (

          <div className=" shadow-2xl m-2 flex flex-col border-2  border-red-300 italic font-bold items-center justify-around rounded-2xl " key={b.title}>
            <div className="w-full m-1 bg-yellow-50 text-center">{b.title}</div>
            <div className="">{b.auther}</div>
            <div className="">{b.genre}</div>
            <div className="">{b.price}</div>
          </div>
      )
        )}
      </div>
      </>
  );
}

export default AddBook;
