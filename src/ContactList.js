import React from 'react'
import Contact from './Contact'

export default function ContactList({contacts, selectContact}) {
  return (
    contacts.map(contact => {
        return <Contact key={contact.phone} selectContact={selectContact} contact={contact} />
    })
  )
}
