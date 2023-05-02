

import {React, useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

function App(){

const [itemText,setitemText]=useState('')
const [listItems,setlistitems]=useState([])

//add item
const additem=async(e)=>{
  e.preventDefault()
  try{
     const res=await axios.post('http://localhost:5500/api/item',{item:itemText})
     setlistitems((previtems)=>[...previtems,res.data])
     setitemText('')
  }catch(err){
    console.log(err)
  }
}

//get item
useEffect(()=>{
  const getitem=async()=>{
    try{
  const res=await axios.get('http://localhost:5500/api/items')
  setlistitems(res.data)
    }catch(err){
      console.log(err)
    }
  }
  getitem()
},[])


//delete item
const deleteitem=async(dfdv)=>{
try{
    await axios.delete(`http://localhost:5500/api/item/${dfdv}`)
    const filtereditems=listItems.filter((item)=>item._id!==dfdv) //store all values in filtereditems except clicked on delete items
    setlistitems(filtereditems)
   
}catch(err){
  console.log(err)
}
}
// update item
const updateitem=async(dfdv,newitemText)=>{
try{
      const res=await axios.put(`http://localhost:5500/api/item/${dfdv}`,{item:newitemText})
      const updateditem=listItems.map((item)=>{
        if(item._id===dfdv){
          return res.data
        }
        return item;
      })
      setlistitems(updateditem)

}catch(err){
  console.log(err)
}
}

return (
  <div className='App'>
    <h1>MERN-Todo App</h1>
    <form onSubmit={e=>additem(e)}>
   <input type='text' className='input-text' placeholder='add a todo' onChange={e=>setitemText(e.target.value)} value={itemText}/>
   <button className='Add-btn' type='submit'>Add</button>
    </form>
    <div className='list-items'>
      {listItems.map(item=>(
        <div className='list-items' key={item._id}>
        <p className='p-tag'>{item.item}</p>
        <input type='text' value={item.item} onChange={e=>updateitem(item._id,e.target.value)}></input>
        <button className='update-btn'  onClick={()=>updateitem(item._id)}>update</button>
        <button className='delete-btn' onClick={()=>deleteitem(item._id)}>delete</button>  
        </div>
        //delete id._id
      ))}
    </div>
  </div>
)

}
export default App