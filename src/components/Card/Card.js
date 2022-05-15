import React from 'react';
import { useState } from 'react';
import ContentLoader from "react-content-loader"
import style from './Card.module.scss'

export default function Card({ id, title, imageUrl, price, onPlus, onFavorite, favorited = false, added = false, loading = false, parentId }) {
  const [isAdded, setIsAdded] = useState(added)
  const [isLike, setIsLike] = useState(favorited)
  const obj = { id, title, imageUrl, price }

  const onClickLike = () => {
    onFavorite(obj);
    setIsLike(!isLike)
  }
  const onClickPlus = () => {
    onPlus(obj);
    setIsAdded(!isAdded)
  }

  return (
    <div className={style.card}>
      {
        loading ? (<ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"

        >
          <rect x="28" y="38" rx="0" ry="0" width="154" height="150" />
          <rect x="19" y="219" rx="0" ry="0" width="195" height="31" />
          <rect x="29" y="272" rx="0" ry="0" width="165" height="27" />
          <rect x="39" y="333" rx="0" ry="0" width="64" height="44" />
          <rect x="135" y="335" rx="0" ry="0" width="54" height="37" />
        </ContentLoader>) : (
          <>
            <div className={style.favorite} onClick={onClickLike}>
              < img src={isLike ? 'img/like.svg' : 'img/unlike.svg'} />
            </div>
            <img width={133} height={112} src={imageUrl} />
            <h5>{title}</h5>
            <div className={style.cardButton}>
              <div className={style.cardButtonflex}>
                <span>
                  Цена:
                </span>
                <b>{price}руб.</b>
              </div>

              <img className={style.button} onClick={onClickPlus} width={11} height={11} src={isAdded ? 'img/v.svg' : 'img/Group 91.svg'} />

            </div></>
        )
      }


    </div>

  )
}
