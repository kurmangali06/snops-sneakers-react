import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.scss';

import Drawer from './components/Drawer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import { Orders } from './pages/Orders';






function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorit, setFavorit] = useState([])
  const [cartOpened, setCartOpened] = useState(false)


  useEffect(() => {
    try {
      axios.get('https://627e11c7b75a25d3f3b112d3.mockapi.io/items').then(res => {
        setItems(res.data);
      })
      axios.get('https://627e11c7b75a25d3f3b112d3.mockapi.io/cart').then(res => {
        setCartItems(res.data);
      })
      axios.get('https://627e11c7b75a25d3f3b112d3.mockapi.io/favorites').then(res => {
        setFavorit(res.data);

      })
    } catch {
      alert('ошибка')
    }

  }, []);

  const onAddToCart = (obj) => {

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://627e11c7b75a25d3f3b112d3.mockapi.io/cart`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://627e11c7b75a25d3f3b112d3.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj])
    }
  }



  const onRemoveCart = (id) => {
    axios.delete(`https://627e11c7b75a25d3f3b112d3.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorit.find(fanObj => fanObj.id === obj.id)) {
        axios.delete(`https://627e11c7b75a25d3f3b112d3.mockapi.io/favorites/${obj.id}`);
        setFavorit((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        const { data } = await axios.post('https://627e11c7b75a25d3f3b112d3.mockapi.io/favorites', obj);

        setFavorit((prev) => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в избранное')
    }
  }


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };


  return (
    <AppContext.Provider value={{ cartItems, favorit, items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, setCartOpened, setCartItems, isItemAdded }}>
      <div className='wrapper'> {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveCart} />}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>



          <Route path='/' element={
            <Home />} >
            < Route path="/favorites" element={
              <Favorites />} />
            < Route path="/orders" element={
              <Orders />} />
          </Route>


        </Routes>



      </div>
    </AppContext.Provider>
  )
}

export default App;
