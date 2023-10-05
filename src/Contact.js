import React from 'react'

export default function Contact({contact, selectContact}) {
    function handleSelectContact(){
        selectContact(contact.phone)
    }

  return (
    <div>
        <label>
        <input type='checkbox' checked={contact.isChecked} onChange={handleSelectContact}/>
        {contact.fName} {contact.lName} {contact.phone} {contact.email} {contact.address}
        <button>Update Contact</button>
        </label>
    </div>
  )
}
