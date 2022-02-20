import React, { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { PhoneBook } from './componets/PhoneBook.js'
import { Contacts } from './componets/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import { addContact, deleteContact, setFilter } from './Redux/store'

const App = () => {
  const contacts = useSelector((state) => state.contacts.items)
  const filter = useSelector((state) => state.contacts.filter)

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`)
    } else {
      setName('')
      setNumber('')
      dispatch(addContact({ name, id: uuidv4(), number }))
    }
  }

  const handleDeleteItem = (id) => {
    dispatch(deleteContact(id))
  }

  const handlChange = (name, event) => {
    switch (name) {
      case 'name':
        setName(event.currentTarget.value)
        break
      case 'number':
        setNumber(event.currentTarget.value)
        break
      case 'filter':
        dispatch(setFilter(event.currentTarget.value))
        break
      default:
        break
    }
  }

  const filterContacts = () => {
    if (filter === '') {
      return contacts
    } else {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase())
      })
    }
  }

  return (
    <div>
      <PhoneBook
        filter={filter}
        name={name}
        number={number}
        handleSubmit={handleSubmit}
        handleChange={handlChange}
      />
      <Contacts
        contacts={filterContacts()}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  )
}

export default App
