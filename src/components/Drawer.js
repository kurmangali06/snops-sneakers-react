import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import AppContext from '../context'
import Info from './Info'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post("https://627e11c7b75a25d3f3b112d3.mockapi.io/Orders", {
        items: cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://627e11c7b75a25d3f3b112d3.mockapi.io/cart/", + item.id)
        await delay(1000)
      }

    } catch (error) {

    }
    setIsLoading(false)

  }

  return (
    <div className='overlay'>
      <div className='driwer'>
        <h2>Корзина
          <img onClick={onClose} src="img/basket.svg" />
        </h2>

        {
          items.length > 0 ? (<div>
            <div className='items'>
              {
                items.map((obj) => (
                  <div key={obj.id} className='cartItem'>
                    <img width={70} height={70} src={obj.imageUrl} />
                    <div className='iteminfo'>
                      <p>{obj.title}</p>
                      <b>{obj.price}руб.</b>
                    </div>
                    <img className='removeBtn' src='img/btnremot.svg' onClick={() => onRemove(obj.id)} />
                  </div>
                ))
              }

            </div>
            <div className='listBasket'>
              <ul >
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className='greenbutton'>Оформить заказ <img className='imgbutton' src='img/Group.svg' /></button>
            </div>
          </div>) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : " Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "img/compit.jpg" : "img/image 8.jpg"} />
          )

        }






      </div>
    </div >
  )
}
