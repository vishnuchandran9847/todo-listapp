import { useEffect, useState } from "react";
import "./App.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { db } from "./firebase";
// import { db } from "./firebase";
// import {addDoc, collection,onSnapshot} from "firebase/firestore"

import { addDoc, collection, onSnapshot } from 'firebase/firestore';









function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editindex, setEditindex] = useState(-1);


  useEffect(() => {
    const unsubscribe= onSnapshot(collection(db,'todos'),(snapshot)=>{
      setTodos(snapshot.docs.map((doc)=>({id: doc.id, todo: doc.data().todo}))
    )});
    return()=>unsubscribe();
  }, [])



  const setEdit=(index)=>{
    setInput(todos[index].todo);
    setEditindex(index);
  };



  const addTodo=async()=>{
    try{
      if (input.trim() !==""){
        setTodos([...todos,{id: new Date(),todo:input }]);
        await addDoc(collection(db,"todos"),{todo:input})
        setInput("")
      }
    }
    catch (error){
      console.error(error.message);
    }
  }


  const updateTodo=async()=>{
    try{
      if (input.trim() !==""){
       const updatedTodos=[...todos];
       updatedTodos[editindex].todo=input;
       setTodos(updatedTodos);
       setEditindex(-1);
       setInput("");
      }
    }
    catch (error){
      console.error(error.message);
    }
  }


  const removeTodo=async(id)=>{
    let filterTodos= todos.filter((todo)=>todo.id !==id);
    setTodos(filterTodos);
   }



  return (
   <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-white-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Todo App</h1>
        <div className="flex flex-row">
          <input type="text" 
          placeholder="Enter Your Todo"
          className="py-2 px-4 border rounded w-full focus:outline-none mr-2" value={input}  onChange={(e)=>setInput(e.target.value)} />
           <button onClick={editindex=== -1 ? addTodo:updateTodo} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded">{editindex===-1?<MdAdd /> : <MdEdit />}</button>
        </div>
       
    </div>
     {todos.length>0 &&
      <div className="bg-white-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
      <ul>
          {todos.map((todo,index)=>(
            <li key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-md mb-3">
            <span className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{todo.todo}</span>
           <div>
           <button onClick={()=>setEdit(index)} className=" mr-2 bg-gradient-to-r hover: from-gray-400 hover: to-gray-600 text-white p-2 rounded"><MdEdit /></button>
            <button onClick={()=>removeTodo(todo.id)} className="bg-gradient-to-r hover: from-red-400 hover: to-red-600 text-white p-2 rounded"><MdDelete /></button>

           </div>
          </li>
          ))}
      </ul>
    </div>}
   </div>
  )
}

export default App
