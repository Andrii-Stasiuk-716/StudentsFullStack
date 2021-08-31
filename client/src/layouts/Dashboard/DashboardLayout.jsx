import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    backgroundColor: theme.palette.grey[200],
  },
}));

function DashboardLayout({ children }) {
  const classes = useStyles();

  return <Container className={classes.root}>{children}</Container>;
}

export default DashboardLayout;
