import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../context'

import "./Favorites.scss"


export function Orders() {
  const [orders, setOrders] = React.useState([]);


  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://627e11c7b75a25d3f3b112d3.mockapi.io/Orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

      } catch (error) {

        aa
      }
    })();
  }, []);

  return (
    <div className="content ">
      <div >
        <h1>Мои заказы</h1>
      </div>

      <div className="Orders">
        {orders.map((item, index) => (
          <Card key={index}  {...item} />
        ))}
      </div>
    </div>
  );
}

