import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {},
}));

const HomeView = ({ student }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemText
        primary={`${student.firstName} ${student.lastName}`}
        secondary={student.age}></ListItemText>
    </ListItem>
  );
};

export default HomeView;
