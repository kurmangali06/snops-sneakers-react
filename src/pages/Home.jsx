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
          <img src='/img/Vector (3).svg' alt='seach' />
          {searchValue && <svg onClick={() => setSearchValue('')} className="clear" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB" />
            <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5" />
          </svg>}
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
