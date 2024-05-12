import Contacts from './contacts/Contacts';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import {
  createContact,
  deleteContact,
  fetchContacts,
} from './async_redux/contactOperators';
import {
  getContacts,
  getErrorStatus,
  getIsLoading,
} from './async_redux/selectors';
import { filterContact } from './async_redux/contactSlice';

export function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getErrorStatus);

  const filterValue = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContacts = event => {
    event.preventDefault();
    dispatch(
      createContact({
        name: event.target.name.value,
        phoneNumber: event.target.number.value,
      })
    );
    event.target.reset();
  };

  const onDeleteContact = event => {
    console.log(event.target.id);
    dispatch(deleteContact(event.target.id));
    dispatch(fetchContacts());
  };

  const handleFilter = event => {
    dispatch(filterContact(event.target.value));
  };

  return (
    <div className="app">
      <h1>Phonebook</h1>
      <ContactForm handleAddContacts={onAddContacts} />
      <h2>Contacts</h2>
      <Filter filterContacts={handleFilter} filterValue={filterValue} />
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Looks like there's an error</h3>}
      <Contacts contactsList={contacts} handleDeleteContact={onDeleteContact} />
    </div>
  );
}
