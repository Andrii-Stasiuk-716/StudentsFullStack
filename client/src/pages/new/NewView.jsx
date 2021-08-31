import React, { useReducer } from 'react';
import { TextField, Typography, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../redux/slices/studentSlice';
import MButton from '../../components/MButton';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      marginBottom: theme.spacing(2),
    },
  },
}));

const NewView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()

  const [info, setInfo] = useReducer((state, newState) => ({ ...state, ...newState }), {
    id: Math.floor(Math.random() * 100000),
    firstName: '',
    lastName: '',
    age: 0,
    nationality: '',
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo({ [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addStudent(info));
    setInfo({ firstName: '', lastName: '', age: 0, nationality: '' });
  };

  return (
    <>
      <Typography variant='h3' gutterBottom>
        Add new student
      </Typography>
      <FormControl className={classes.root} autoComplete='off'>
        <TextField
          name='firstName'
          placeholder='Name'
          required={true}
          label='Required'
          value={info.firstName}
          onChange={handleInfoChange}
        />
        <TextField
          name='lastName'
          placeholder='Lastname'
          required
          label='Required'
          value={info.lastName}
          onChange={handleInfoChange}
        />
        <TextField
          name='age'
          type='number'
          placeholder='Age'
          required
          label='Required'
          value={info.age}
          onChange={handleInfoChange}
        />
        <TextField
          name='nationality'
          placeholder='Nationality'
          required
          label='Required'
          value={info.nationality}
          onChange={handleInfoChange}
        />
        <MButton type='submit' size='large' onClick={handleClick}>
          Add Student
        </MButton>
      </FormControl>
      <MButton
        onClick={() => {
          history.push('/');
        }}>
        Back
      </MButton>
    </>
  );
};

export default NewView;
