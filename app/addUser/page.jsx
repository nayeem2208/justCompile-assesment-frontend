"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


function Page() {
  const router = useRouter();
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!id || !name || !age || !place) {
      alert("All fields are required.");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:3000/user/",
        {
          id,
          name,
          age,
          place,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        router.refresh();
        router.push("/");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="mx-auto p-6 bg-white shadow-lg w-2/5 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500 text-center">
          Add User
        </h1>
        <form onSubmit={handleSubmit}>
          {/* ID input field */}
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Name input field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Age input field */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Age:
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Place input field */}
          <div className="mb-4">
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Place:
            </label>
            <input
              type="text"
              id="place"
              name="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

// Export the component
export default Page;
