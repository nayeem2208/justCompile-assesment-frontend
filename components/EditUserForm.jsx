"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditUserForm({ id,name, age, place }) {
  let [newName, setName] = useState(name);
  let [newage, setAge] = useState(age);
  let [newplace, setPlace] = useState(place);

  
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/user/${id}`,
        {
          newName,
          newage,
          newplace,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="mx-auto p-6 bg-white shadow-lg w-2/5 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500 text-center">
          Edit User
        </h1>
        <form onSubmit={handleSubmit}>
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
              value={newName}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
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
              value={newage}
              onChange={(e) => setAge(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
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
              onChange={(e) => setPlace(e.target.value)}
              value={newplace}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
