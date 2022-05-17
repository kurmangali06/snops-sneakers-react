import React from 'react'
import { useContext } from 'react'
import AppContext from '../context'

export default function Info({ image, title, description }) {
  const { setCartOpened } = useContext(AppContext)
  return (
    <div className='cartEmpty'>
      <img width={130} height={130} src={image} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className='greenbutton' onClick={() => setCartOpened(false)}  >
        Вернуться назад
      </button>
    </div>
  )
}
