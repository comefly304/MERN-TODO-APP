


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);

  // add item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/item', { item: itemText });
      setListItems((prevItems) => [...prevItems, res.data]); //add list items to the existing list using spread operations
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  };

  // update item
  const updateItem = async (id, newText) => {
    try {
      const res = await axios.put(`http://localhost:5500/api/item/${id}`, { item: newText }); //we need item id and newtext for updating
      const updatedItems = listItems.map((item) => {
        if (item._id === id) {
          return res.data;
        }
        return item;
      });
      setListItems(updatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  // delete item
  const deleteItem = async (id) => {
    try {
     await axios.delete(`http://localhost:5500/api/item/${id}`);
      const filteredItems = listItems.filter((item) => item._id !== id);
      setListItems(filteredItems);
    } catch (err) {
      console.log(err);
    }
  };

  // get item
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      <h1>To do list</h1>
      <form onSubmit={(e) => addItem(e)}>
        <input type='text' placeholder='add a todo' onChange={(e) => setItemText(e.target.value)} value={itemText} />
        <button type='submit'>Add</button>
      </form>

      <div className='todo-listItems'>
        {listItems.map((item) => (
          <div className='todo-div' key={item._id}>
            <input type='text' value={item.item} onChange={(e) => updateItem(item._id, e.target.value)} />
            <button onClick={() => updateItem(item._id, itemText)}>Update</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
//

export default App;

