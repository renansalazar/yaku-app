import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";

import Title from './Title';

moment.locale("es"); 

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({data}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Cantidad de Deshechos:</Title>
      <Typography component="p" variant="h4">
        {data.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {"al "+moment().format("DD MMMM YYYY")}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Balance
        </Link>
      </div>
    </React.Fragment>
  );
}
