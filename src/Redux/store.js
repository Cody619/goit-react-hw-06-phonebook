import { configureStore } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit'

export const addContact = createAction('ADD_CONTACT')
export const deleteContact = createAction('DELETE_CONTACT')
export const setFilter = createAction('SET_FILTER')

const contactsReducer = createReducer(
  {
    items: [],
    filter: '',
  },
  {
    [addContact]: (state, action) => {
      state.items.push(action.payload)
    },
    [deleteContact]: (state, action) => {
      return {
        ...state,
        items: state.items.filter((contact) => contact.id !== action.payload),
      }
    },
    [setFilter]: (state, action) => {
      state.filter = action.payload
    },
  },
)

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
})
