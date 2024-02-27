import EditUserForm from "@/components/EditUserForm";
import axios from "axios";


const getUserById = async (id) => {
  try {
    
    const res = await axios.get(`http://localhost:3000/user/${id}`, {
      cache: "no-store",
    });
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export default async  function EditUser({params}) {
  const { id } = params;
  const  user  = await getUserById(id);
  const {name,age,place } = user;
  
  return (
    <div>
        <EditUserForm id={id} name={name} age={age} place={place}/>
    </div>
  )
}

