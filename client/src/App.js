import React, { useState } from 'react'
import useFetch from './useFetch'
import './App.css'
import Axios from 'axios'

const url = '/api'

const App = () => {
  const { data, isLoading, isError } = useFetch(url)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')

  const setForm = (id, name, price, img) => {
    console.log(id, name, price)
    setId(id)
    setName(name)
    setPrice(price)
    setImg(img)
  }

  const handleSubmit = () => {
    Axios.post('/api', { name: name, price: price, img: img })
    if (name && price && img) {
      alert('Success')
      window.location.reload()
    } else {
      alert('form still empty!')
    }
  }

  const handleUpdate = () => {
    Axios.put('/api', { id: id, name: name, price: price, img: img }).then(
      () => {
        window.location.reload()
      }
    )
  }

  const handleDelete = (id) => {
    Axios.delete(`/api/${id}`)
    window.location.reload()
  }

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
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type='text'
        placeholder='img'
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleUpdate}>Update</button>

      <div className='container'>
        {data.map((value, index) => {
          const { id, name, price, img } = value
          return (
            <div
              className='product'
              key={id}
              onClick={() => setForm(id, name, price, img)}
            >
              <img src={img} alt={name} />
              <h3>{name}</h3>
              <p>Price: ${price}</p>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
