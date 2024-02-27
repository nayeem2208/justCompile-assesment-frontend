"use client";
import { MdOutlineDeleteOutline } from "react-icons/md"
import { useRouter } from "next/navigation";
import axios from "axios";

function RemoveBtn({id,onUserDeleted }) {
  const router = useRouter();

  const removeUser = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await axios.delete(`http://localhost:3000/user/${id}`);

      if (res.status==200) {
        onUserDeleted();
      }
    }
  };

  return (
    <div className="flex justify-center">
        <button onClick={removeUser}>
      <MdOutlineDeleteOutline className="w-7 h-7 text-red-500"/>
      </button>
    </div>
  )
}

export default RemoveBtn
