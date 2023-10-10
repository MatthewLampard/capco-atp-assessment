import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

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
    // Update the contact with the edited data
    const updatedContact = { ...contact, ...data };

    // Load contacts from localStorage
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];

    // Update the contact in the parsedContacts array
    parsedContacts[index] = updatedContact;

    // Save the updated contacts array back to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedContacts));

    // Redirect or navigate back to the main contacts page
    navigate('/'); // Redirect to the main contacts page
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='First Name'
          {...register('firstName')}
          defaultValue={contact.firstName}
        />
        <input
          placeholder='Last Name'
          {...register('lastName')}
          defaultValue={contact.lastName}
        />
        <input
          placeholder='Phone'
          {...register('phone')}
          defaultValue={contact.phone}
        />
        <input
          placeholder='Email'
          {...register('email')}
          defaultValue={contact.email}
        />
        <input
          placeholder='Address'
          {...register('address')}
          defaultValue={contact.address}
        />
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  );
}

export default EditContact;
