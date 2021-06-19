import React from 'react'
import useFetch from './useFetch'
import './App.css'

const url = '/api'

const App = () => {
  const { data, isLoading, isError } = useFetch(url)

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='loading'>
        <h1>Server is not responding :(</h1>
      </div>
    )
  }
  return (
    <div>
      <h1 className='title'>Menu</h1>
      <div className='container'>
        {data.map((value, index) => {
          const { id, img, name, price } = value
          return (
            <div className='product' key={index}>
              <img src={img} alt={name} />
              <h3>{name}</h3>
              <p>Price: ${price}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
