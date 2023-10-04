import React from 'react'

export default function Contact({contact}) {
  return (
    <div>
        <label>
        <input type='checkbox'></input>
        {contact.fName} {contact.lName} {contact.phone} {contact.email} {contact.address}
        </label>
    </div>
  )
}
