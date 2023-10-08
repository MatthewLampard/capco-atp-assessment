import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditContact from './EditContact';

const LOCAL_STORAGE_KEY = 'contactListApp.contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to retrieve contacts from localStorage
  const getContactsFromLocalStorage = () => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedContacts ? JSON.parse(storedContacts) : [];
  };

  useEffect(() => {
    // Load contacts from localStorage when the component mounts
    setContacts(getContactsFromLocalStorage());
  }, []);

  useEffect(() => {
    // Save contacts to localStorage whenever the contacts state changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = (data) => {
    const newContacts = [...contacts, data];
    setContacts(newContacts);
    reset();
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='First Name'
          {...register('firstName', { required: true })}
        />
        <input
          placeholder='Last Name'
          {...register('lastName', { required: true })}
        />
        {errors.lastName && alert('Last name is required')}
        <input
          placeholder='Phone Number'
          {...register('phone', { pattern: /\d+/ })}
        />
        {errors.phone && alert('Please enter a valid phone number')}
        <input placeholder='Email' {...register('email')} />
        <input placeholder='Address' {...register('address')} />
        <input type='submit' />
      </form>
      <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              {contact.firstName} {contact.lastName} {contact.phone} {contact.email} {contact.address}
              <button onClick={() => deleteContact(index)}>Delete Contact</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;