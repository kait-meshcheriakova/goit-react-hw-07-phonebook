import React from 'react';

import { Div, Label, Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filterSlice';

function Filter() {
  const handleFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };
  const dispatch = useDispatch();
  return (
    <Div>
      <Label>
        Find contacts by name
        <Input
          type="text"
          value={useSelector(selectFilter)}
          onChange={handleFilterChange}
        />
      </Label>
    </Div>
  );
}

export default Filter;
