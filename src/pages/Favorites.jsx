import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context';
import Card from '../components/Card/Card'
import "./Favorites.scss"


export default function Favorites() {
  const { favorit, onAddToFavorite } = useContext(AppContext);

  return (
    <>
      <h1>
        Мой загладки
      </h1>
      <div className='favorite'>


        {favorit.map((item, index) => (
          <Card
            key={index}
            title={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}

          />
        ))}

      </div>
    </>
  )

}
