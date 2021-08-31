import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Box } from '@material-ui/core';
import StudentItem from './StudentItem';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsRange, setSort } from '../../redux/slices/studentSlice';
import MButton from '../../components/MButton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const HomeView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAsc, setIsAsc] = useState(true);
  const { students, studentsSort, studentsFilter } = useSelector(
    (state) => state.students,
  );

  useEffect(() => {
    dispatch(getStudentsRange(studentsFilter, studentsSort));
  }, [studentsFilter, studentsSort]);

  const handleClickSort = async () => {
    dispatch(setSort(isAsc ? 'asc' : 'desc', 'firstName'));
    setIsAsc(!isAsc);
  };

  return (
    <>
      <DropDown />
      <List>
        {students.map((student) => (
          <StudentItem key={student._id} student={student} />
        ))}
      </List>
      <Box className={classes.box}>
        <MButton size='large' onClick={handleClickSort}>
          Sort
        </MButton>
        <MButton
          onClick={() => {
            history.push('/new');
          }}>
          Add student
        </MButton>
      </Box>
    </>
  );
};

export default HomeView;
