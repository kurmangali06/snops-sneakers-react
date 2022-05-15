import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context'

export default function Header(props) {
  const { cartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header>
      <div className='headerLeft'>
        <Link to='/' >
          <img width={40} height={40} src='img/logo.svg' />
          <div className='headerInfo'>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <div>
        <ul className='headerRight'>
          <li className='basket' onClick={props.onClickCart}>
            <img src='img/basket.svg' />
            <span>{totalPrice} руб.</span>
          </li>
          <li>
            <Link to='/favorites'><img src='img/like.svg' /></Link>

          </li>
          <li>
            <Link to='/orders'>
              <img src='img/pesron.svg' />
            </Link>


          </li>
        </ul>
      </div>
    </header >
  )
}
