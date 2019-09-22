import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import useJsonBox, { JsonBoxProvider } from 'react-jsonbox'
import './index.css'

function App() {
  const [editing, setEditing] = useState()
  const [values, setValues] = useState([])
  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')
  const [submited, setSubmitted] = useState(false)
  const { read, create, remove, update } = useJsonBox()

  const getData = async () => {
    const { data } = await read()
    setValues(data)
  }

  const removeName = async id => {
    setSubmitted(false)
    await remove(id)
    setSubmitted(true)
  }

  const addName = async e => {
    e.preventDefault()
    setSubmitted(false)
    await create({ name })
    setSubmitted(true)
    setName('')
  }

  const createNewName = async (e, id) => {
    e.preventDefault()
    setSubmitted(false)

    await update(
      {
        name: newName
      },
      id
    )
    setSubmitted(true)
    setEditing(false)
  }

  useEffect(() => {
    getData()
  }, [submited])

  return (
    <div className='App'>
      <h2>Names</h2>
      {values.map(value => (
        <li key={value._id}>
          {editing !== value._id ? (
            value.name
          ) : (
            <form onSubmit={async e => createNewName(e, value._id)}>
              <input
                value={newName || value.name}
                onChange={e => setNewName(e.target.value)}
              />
            </form>
          )}
          <button onClick={() => removeName(value._id)}>x</button>
          <button onClick={() => setEditing(value._id)}>edit</button>
        </li>
      ))}
      <h2>Add a name</h2>
      <form onSubmit={e => addName(e)}>
        <input
          id='input-component-1'
          label='Add a name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <JsonBoxProvider
    value={{ url: 'https://legitbackend.wtf/', id: 'lghjgsjhgasj' }}
  >
    <App />
  </JsonBoxProvider>,
  rootElement
)
