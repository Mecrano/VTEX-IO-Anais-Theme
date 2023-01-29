import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import styles from './styles.css'

const SORT_OPTIONS = [
  {
    value: 'OrderByReleaseDateDESC', /* Nuevo ingreso */
    label: 'Nuevo ingreso',
    img: '/arquivos/icon2.png'
  },
  {
    value: 'OrderByTopSaleDESC', /* Lo mas vendido */
    label: 'Lo más vendido',
    img: '/arquivos/star.png'
  },
  {
    value: 'OrderByBestDiscountDESC', /* Ofertas */
    label: 'Ofertas',
    img: '/arquivos/icon3.png'
  },
]

const ButtonHandleFilter = ({sort_option}: any) => {
  const { setQuery } = useRuntime()

  const handleOptionClick = () => {
    setQuery({ order: sort_option.value, page: undefined })
    console.log("first", sort_option.value)
  }

  return(
    <button
      className={styles.paragraphFilter}
      key={sort_option.value}
      onClick={handleOptionClick}
    >
      {sort_option.label}
      <img src={sort_option.img} alt={sort_option.label} />
    </button>
  )
}

export default function EspecialSearchFilter() {
  return (
    <div className={styles.containerFilters}>
      {SORT_OPTIONS.map(option =>
        <ButtonHandleFilter key={option.value} sort_option ={option}/>
      )}
    </div>
    )
}
