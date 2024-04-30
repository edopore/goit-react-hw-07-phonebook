import Contacts from './contacts/Contacts';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, filterContact } from './redux/contactSlice';
import { nanoid } from 'nanoid';

export function App() {
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contacts.contacts);
  const filterValue = useSelector(state => state.contacts.filter);
  const searchContact = name => {
    const result = contactList.filter(word =>
      word.name.toLowerCase().includes(name.toLowerCase())
    );
    if (result.length > 0) {
      return true;
    }
    return false;
  };

  const handleAddContact = event => {
    event.preventDefault();
    const id = nanoid();
    const name = event.target.name.value;
    const number = event.target.number.value;
    searchContact(name)
      ? alert(`${name} already exists`)
      : dispatch(addContact({ id, name, number }));
    event.target.reset();
  };

  const handleRemoveContact = event => {
    dispatch(deleteContact(event.target.id));
  };

  const handleFilter = event => {
    dispatch(filterContact(event.target.value));
  };
  return (
    <div className="app">
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filterContacts={handleFilter} filterValue={filterValue} />
      <Contacts contactsList={contactList} handleDelete={handleRemoveContact} />
    </div>
  );
}
