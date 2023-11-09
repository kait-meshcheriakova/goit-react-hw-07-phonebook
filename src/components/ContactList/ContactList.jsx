import React from 'react';

import { List, Item, Button } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';

import { selectVisibleContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  return (
    <List>
      {contacts.map(({ id, name, phone }) => (
        <Item key={id}>
          {name + ' : ' + phone}
          {
            <Button
              type="button"
              name="delete"
              onClick={() => dispatch(deleteContact(id))}
            >
              &times;
            </Button>
          }
        </Item>
      ))}
    </List>
  );
};
export default ContactList;
