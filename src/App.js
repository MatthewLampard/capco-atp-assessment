import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'contactListApp.contacts';

const getContactsFromLocalStorage = () => {
  const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedContacts ? JSON.parse(storedContacts) : [];
};

function App() {
  const [contacts, setContacts] = useState(() => {
    // Load contacts from localStorage in the initial state
    return getContactsFromLocalStorage();
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    <h2>Add a Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='First Name'
          {...register('firstName', { required: true })}
        />
        <input
          placeholder='Last Name'
          {...register('lastName', { required: true })}
        />
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
        <h2>Your Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              {contact.firstName} {contact.lastName} {contact.phone} {contact.email} {contact.address}
              <button onClick={() => deleteContact(index)}>Delete Contact</button>
              <Link to={`/edit/${index}`}>Edit Contact</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;