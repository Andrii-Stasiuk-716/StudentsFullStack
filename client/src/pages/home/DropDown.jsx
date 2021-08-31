import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterRange, setFilter } from '../../redux/slices/studentSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropDown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fields } = useSelector((state) => state.students);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(getFilterRange('nationality'));
  }, []);

  useEffect(() => {
   if (fields.length) {
    setValue(fields[0])
    dispatch(setFilter('nationality', fields[0]));
   }
  }, [fields]);

  const handleChange = async (event) => {
    setValue(event.target.value);
    dispatch(setFilter('nationality', event.target.value));
  };

  return (
    <FormControl className={classes.formControl}>
      <Select value={value} defaultValue="Hello" onChange={handleChange}>
        {fields.map((field) => (
          <MenuItem key={field} value={field}>
            {field}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
