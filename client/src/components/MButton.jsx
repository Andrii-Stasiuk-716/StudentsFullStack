import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
}));

const MButton = (props) => {
  const classes = useStyles();
  const { type, onClick, children } = props;

  return (
    // can modify to use 'clx' for different classnames
    <Button type={type} className={classes.margin} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default MButton;
