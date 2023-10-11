import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const LOCAL_STORAGE_KEY = 'contactListApp.contacts';

function EditContact() {
  const navigate = useNavigate();
  const { index } = useParams();

  const [contact, setContact] = useState({});
  const {
    register,
    handleSubmit,
  } = useForm();

  // Load contacts from localStorage when the component mounts
  useEffect(() => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];
    const selectedContact = parsedContacts[index] || {};
    setContact(selectedContact);
  }, [index]);

  const onSubmit = (data) => {
    // Load contacts from localStorage
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];
  
    // Retrieve the original contact
    const originalContact = parsedContacts[index] || {};
  
    // Initialize an object to store the updated contact data
    const updatedContact = {};
  
    // Compare each field with the original contact data
    for (const key in originalContact) {
      if (originalContact.hasOwnProperty(key)) {
        updatedContact[key] = data[key] || originalContact[key];
      }
    }
  
    // Update the contact in the parsedContacts array
    parsedContacts[index] = updatedContact;
  
    // Save the updated contacts array back to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedContacts));

    alert('Contact Updated')
  
    navigate('/'); // Redirect to the main contacts page
  };
  

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Contact</h2>
        <input
          name='firstName'
          placeholder='First Name'
          {...register('firstName')}
          defaultValue={contact.firstName}
          className="form-input" // Apply the input style
        />
        <input
          name='lastName'
          placeholder='Last Name'
          {...register('lastName')}
          defaultValue={contact.lastName}
          className="form-input" // Apply the input style
        />
        <input
          name='phone'
          placeholder='Phone'
          {...register('phone')}
          defaultValue={contact.phone}
          className="form-input" // Apply the input style
        />
        <input
          name='email'
          placeholder='Email'
          {...register('email')}
          defaultValue={contact.email}
          className="form-input" // Apply the input style
        />
        <input
          name='address'
          placeholder='Address'
          {...register('address')}
          defaultValue={contact.address}
          className="form-input" // Apply the input style
        />
        <button type='submit'>Save Changes</button>
      </form>
    </div>
    </>
  );
}

export default EditContact;
