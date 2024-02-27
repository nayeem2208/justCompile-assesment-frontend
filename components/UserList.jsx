"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuClipboardEdit } from "react-icons/lu";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios";
import toast, { Toaster } from "react-hot-toast";

const UserList = () => {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const adminInfo = localStorage.getItem("adminInfo");

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:3000/user/", {
        cache: "no-store",
      });
      setUserData(res.data);

    } catch (error) {
      console.error("Error loading user data: ", error);
    }
  };

  let users=userData.sort((a,b)=>a.id-b.id)
  console.log(users,'users')
  useEffect(() => {
    if (!adminInfo) {
      console.log("There is no adminInfo");
      router.push("/login");
      return;
    }

    fetchData();
  }, [adminInfo, router]);

  const handleUserDeleted = () => {
    fetchData();
    toast.success('Successfully deleted')
  };
  

  if (!userData) {
    console.error("User data is undefined or null.");
    return null;
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-center my-4">
      <h1 className="text-3xl text-gray-700 font-bold">Users</h1></div>
      <table className="min-w-full bg-white border border-gray-300 shadow-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Place</th>
            <th className="py-2 px-4 border-b">Edit</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user,index) => (
            <tr key={user.id} className={`border-b text-center  hover:bg-slate-800 hover:text-emerald-400 `}>
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.age}</td>
              <td className="py-2 px-4">{user.place}</td>
              <td className="py-2 px-4 flex justify-center items-center">
                <Link
                  href={`/editUser/${user.id}`}
                  className="text-cyan-500 hover:underline my-2 "
                >
                  <LuClipboardEdit className="w-6 h-6" />
                </Link>
              </td>
              <td className="py-2 px-4">
                <RemoveBtn id={user.id} onUserDeleted={handleUserDeleted}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
