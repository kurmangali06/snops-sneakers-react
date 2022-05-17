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
        await axios.delete(cart.json, + item.id)
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
          <img onClick={onClose} width={30} src="https://avatars.mds.yandex.net/i?id=010d3ada603290641daf5935744bc8b1-4077654-images-thumbs&n=13" />
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
                    <img width={32} height={32} className='removeBtn' src='https://yt3.ggpht.com/a/AGF-l78EKuHfHD2Qy1nI7BRUqIbuMEdwCuksuOnL9g=s900-c-k-c0xffffffff-no-rj-mo' onClick={() => onRemove(obj.id)} />
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
              <button disabled={isLoading} onClick={onClickOrder} className='greenbutton'>Оформить заказ <img width={30} className='imgbutton' src='https://w7.pngwing.com/pngs/966/500/png-transparent-shopping-bags-trolleys-handbag-computer-icons-bag-rectangle-accessories-shopping-bags-trolleys.png' /></button>
            </div>
          </div>) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : " Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "https://dekasklad.ru/images/abt__ut2/menu-with-icon/3/%D0%B2%D0%B5%D1%81%D1%8C_%D0%B0%D1%81%D1%81%D0%BE%D1%80%D1%82%D0%B8%D0%BC%D0%B5%D0%BD%D1%82.jpg" : "https://papik.pro/uploads/posts/2021-12/thumbs/1639545881_39-papik-pro-p-korzinka-risunok-41.jpg"} />
          )

        }






      </div>
    </div >
  )
}
