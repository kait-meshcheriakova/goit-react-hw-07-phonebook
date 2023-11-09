import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledField,
  ErrorMsg,
  InputContainer,
  ButtonForm,
  Text,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Please, enter only letter')
    .min(3, 'Too short!')
    .required('This field is required!'),
  number: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{2}-\d{2}$/, 'Format: 066-123-45-67')
    .required('This field is required!'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, helpers) => {
        const check = contacts.some(({ name }) => name === values.name);
        if (check) {
          alert(`${values.name} is already in contacts`);
          return;
        }
        const finalContact = {
          name: values.name,
          phone: values.number,
        };
        dispatch(addContact(finalContact));
        helpers.resetForm();
      }}
    >
      <StyledForm>
        <InputContainer>
          <Text>Name</Text>
          <StyledField type="text" name="name" />

          <ErrorMsg name="name" component="div" />
        </InputContainer>
        <InputContainer>
          <Text>Number</Text>
          <StyledField type="tel" name="number" />

          <ErrorMsg name="number" component="div" />
        </InputContainer>

        <ButtonForm type="submit">Add contact</ButtonForm>
      </StyledForm>
    </Formik>
  );
};

export default ContactForm;
