"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    router.push("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 ">
        <Link className="text-white text-2xl font-bold hover:text-emerald-500" href={'/'}>Just Complie </Link>
        <div>
        <Link className="text-white mr-4" href={'/addUser'}>Add User</Link>
        <button className="mx-5 font-bold text-emerald-500" onClick={handleLogout}>Logout</button>
        </div>
    </nav>
  )
}
