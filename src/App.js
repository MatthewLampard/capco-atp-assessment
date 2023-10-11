import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './styles.css';
import { VariableSizeList } from 'react-window';
import useThemeChange from './ThemeChange';

const LOCAL_STORAGE_KEY = 'contactListApp.contacts';

const getContactsFromLocalStorage = () => {
  const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedContacts ? JSON.parse(storedContacts) : [];
};

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // 2 equal columns
  gap: 20px;
`;

const FormContainer = styled.div`
  background: var(--bg_0);
  padding: 20px;
`;

const ContactsContainer = styled.div`
  background: var(--bg_0);
  padding: 20px;
`;

const ContactListItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

const getItemSize = () => 150;

function App() {
  const {theme, setTheme} = useThemeChange();
  const [contacts, setContacts] = useState(() => {
    // Load contacts from localStorage in the initial state
    return getContactsFromLocalStorage();
  });
  const {
    register,
    handleSubmit,
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
    alert('Contact Saved')
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    if(window.confirm('Are you sure you want to delete this contact?')){
      setContacts(updatedContacts);
      alert('Contact Deleted')
    }
    else alert('Cancelled')
  };

  return (
    <>
    <div className="themeName">Current Theme: {theme.name}</div>
      <div className="btns">
          <button onClick={() => setTheme('dark')}>Dark</button>
          <button onClick={() => setTheme('light')}>Light</button>
          <button onClick={() => setTheme('gray')}>Gray</button>
      </div>
    <AppContainer>
      <FormContainer>
        <h2>Add a Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" {...register('firstName', { required: true })} />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" {...register('lastName', { required: true })} />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" {...register('phone', { pattern: /\d+/ })} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register('email')} />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" {...register('address')} />
          </div>
          <input type="submit" />
        </form>
      </FormContainer>
      <ContactsContainer>
        <h2>Your Contacts</h2>
        <VariableSizeList
          height={500} // Adjust the height as needed
          itemCount={contacts.length}
          itemSize={getItemSize}
          width={'100%'}
        >
          {({ index, style }) => (
            <ContactListItem style={style}>
              <h3>Contact Information</h3>
              <p><strong>First Name:</strong> {contacts[index].firstName}</p>
              <p><strong>Last Name:</strong> {contacts[index].lastName}</p>
              <p><strong>Phone Number:</strong> {contacts[index].phone}</p>
              <p><strong>Email:</strong> {contacts[index].email}</p>
              <p><strong>Address:</strong> {contacts[index].address}</p>
              <button onClick={() => deleteContact(index)}>Delete Contact</button>
              <Link to={`/edit/${index}`}>Edit Contact</Link>
            </ContactListItem>
          )}
        </VariableSizeList>
      </ContactsContainer>
    </AppContainer>
    </>
  );    
}

export default React.memo(App);