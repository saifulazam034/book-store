import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
     const {id} =useParams();
      const navigate = useNavigate();
  const [values, setValues] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,

  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { url, title, author, price, desc, language } = values;

    if (!url || !title || !author || !price || !desc || !language) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:4001/api/v1/User/update-book",
        values,
        { headers }
      );

      alert(response.data.message);

     navigate("/all-books")
  
      setValues({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      console.log(error.response?.data?.message);
      alert("Something went wrong!");
    }
  };   
  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get(`http://localhost:4001/api/v1/User/get-book-by-id/${id}`
      )
      setValues(res.data.data)
    }
fetch();
  },[])

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-800 rounded-lg shadow-lg p-8 md:max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500">
          Update Book
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
<label htmlFor="" className="text-xl font-semibold">URL Image</label>
          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={values.url}
            onChange={handleChange}
            className="bg-gray-800  text-white px-4 py-2 rounded outline-none mt-2"
          />
<label htmlFor=""className="text-xl font-semibold mt-3 " >Title</label>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={values.title}
            onChange={handleChange}
           className="bg-gray-800 text-white px-4 py-2 rounded outline-none mt-2"
          />
<label htmlFor="" className="text-xl font-semibold">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={values.author}
            onChange={handleChange}
             className="bg-gray-800 text-white px-4 py-2 rounded outline-none mt-2"
          />
          <div className="items-center justify-items-center gap-5 flex flex-col md:flex-row ">
<label htmlFor="" className="text-xl font-semibold">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={values.price}
            onChange={handleChange}
            className="bg-gray-800 text-white px-4 py-2 rounded outline-none mt-2"
          />
<label htmlFor=""className="text-xl font-semibold">language</label>
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={values.language}
            onChange={handleChange}
         className="bg-gray-800 text-white px-4 py-2 rounded outline-none mt-2"
          />
          </div>
<label htmlFor=""className="text-xl font-semibold">Describtion</label>
          <textarea
            name="desc"
            rows="4"
            placeholder="Description"
            value={values.desc}
            onChange={handleChange}
         className="bg-gray-800 text-white px-4 py-2 rounded outline-none mt-2"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-md transition cursor-pointer"
          >
            Update book
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateBook;
