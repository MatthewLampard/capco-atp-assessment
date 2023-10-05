import React, { useState, useRef, useEffect } from 'react';
import ContactList from './ContactList';

const LOCAL_STORAGE_KEY = 'contactApp.contacts'

function App() {
  const [contacts, setContacts] = useState([]);
  const fNameRef = useRef()
  const lNameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedContacts) setContacts(prevContacts => [...prevContacts, ...storedContacts])
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  // localStorage.clear()
  // console.log(contacts)

  function selectContact(phone){
    const newContacts = [...contacts]
    const contact = newContacts.find(contact => contact.phone === phone)
    contact.isChecked = !contact.isChecked
    setContacts(newContacts)
  }

  function addContact(e) {
    const firstName = fNameRef.current.value
    const lastName = lNameRef.current.value
    const phone = phoneRef.current.value
    const email = emailRef.current.value
    const address = addressRef.current.value

    if(firstName === '' || lastName === '') return
    setContacts(prevContacts => {
      return [...prevContacts, {fName: firstName, lName: lastName, phone: phone, email: email,
        address: address, isChecked: false}]
    })
    fNameRef.current.value = null
    lNameRef.current.value = null
    phoneRef.current.value = null
    emailRef.current.value = null
    addressRef.current.value = null
  }

  function deleteContact(){
    const newContacts = contacts.filter(contact => !contact.isChecked)
    setContacts(newContacts)
  }

  return (
    <>
    <input ref={fNameRef} type='text' placeholder='First Name'/>
    <input ref={lNameRef} type='text' placeholder='Last Name'/>
    <input ref={phoneRef} type='text' placeholder='Phone Number'/>
    <input ref={emailRef} type='text' placeholder='Email'/>
    <input ref={addressRef} type='text' placeholder='Address'/>
    <button onClick={addContact}>Add Contact</button>
    <button onClick={deleteContact}>Delete Selected Contacts</button>
    <ContactList contacts = {contacts} selectContact={selectContact} />
    </>
  )
}

export default App;