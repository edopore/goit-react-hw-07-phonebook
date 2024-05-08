import Contacts from './contacts/Contacts';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { fetchContacts } from './async_redux/contactOperators';
import { getContacts } from './async_redux/selectors';

export function App() {
  const dispatch = useDispatch();

  const { contacts, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Looks like there's an error</h3>}
      <Contacts contactsList={contacts} />
    </div>
  );
}
