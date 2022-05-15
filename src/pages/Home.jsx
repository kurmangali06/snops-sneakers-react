import React from 'react'
import { useContext } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../context'

export default function Home(
) {
  const { cartItems, items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, } = useContext(AppContext)


  return (
    <div className='content'>
      <div className='content-d'>
        <h1>
          {searchValue ? `Поиск по запросу:" ${searchValue}"` : "Все кроссовки!"}
        </h1>
        <div className='search-blog'>
          <img src='img/Vector (3).svg' alt='seach' />
          {searchValue && < img onClick={() => setSearchValue('')} className="clear" src='img/unput.svg' />}
          <input onChange={onChangeSearchInput} placeholder='Поиск...' value={searchValue} />
        </div>
      </div>



      <div className='sneakers'>
        {

          items.map((item, index) => (
            <Card
              key={index}
              title={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              {...item}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
            />
          ))

        }
      </div>
    </div>
  )
}
