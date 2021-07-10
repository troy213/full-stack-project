import React from 'react'
import useFetch from './hooks/useFetch'

const Ongkir = () => {
  const { data, isLoading, isError } = useFetch('/ongkir')

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>Error...</h1>
  }
  return (
    <>
      <label htmlFor='provinsi'>Provinsi:</label>
      <select name='provinsi' id='provinsi'>
        {data.map((value) => {
          const { province_id, province } = value
          return (
            <option value={province_id} key={province_id}>
              {province}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default Ongkir
