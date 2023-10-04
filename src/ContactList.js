import React from 'react'
import Contact from './Contact'

export default function ContactList({contacts}) {
  return (
    contacts.map(contact => {
        return <Contact key={contact.phone} contact={contact} />
    })
  )
}
