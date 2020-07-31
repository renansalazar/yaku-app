import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import MapChart from '../components/MapChart';
import PieChartSimple from '../components/PieChart';
import Deposits from '../components/Deposits';
import FiltroFechas from '../components/FiltroFechas';
import Orders from '../components/Orders';
import Avatar from '@material-ui/core/Avatar';
import moment from "moment";

import Title from '../components/Title';

moment.locale("es"); 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Hecho con 💓 para el Call for Code 2020, '}
      <Link color="inherit" href="#">
        Grupo 6
      </Link>
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "#0f16ad",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    display: 'flex',
  },
  drawerPaper: {
    background: "#2bcfcf",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    background: "#06b8b8",
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 360,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  largenombre: {
    marginTop: 12,
    width: theme.spacing(12),
    height: theme.spacing(4),
  },
  containerFiltroFechas: {
    margin: 20,
    padding: theme.spacing(2),
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(loading){
      const fechaInicio = moment().startOf('isoWeek')
      const fechaFin = moment()
      cargarDatos(fechaInicio, fechaFin)
    }
  },[])

  const cargarDatos = (fechaInicio, fechaFin) => {
    fetch('https://yaku.us-south.cf.appdomain.cloud/list')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {

        const JsonFiltrado = myJson.filter((x)=>{
          return ( moment(x.fec)>=fechaInicio && moment(x.fec)<=fechaFin )
        })
        setLoading(false)
        setData(JsonFiltrado)
        console.log(JsonFiltrado)
      });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const onFilter = (fechaInicio, fechaFin) => {
    cargarDatos(fechaInicio, fechaFin)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <Avatar alt="YAKU icono" title="YAKU" src={require("../assets/logoicono.jpeg")} className={classes.large} />
            <Avatar alt="YAKU nombre" title="YAKU" variant="square" src={require("../assets/logonombre.png")} className={classes.largenombre} />
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={classes.sidebar}>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FiltroFechas onFilter={onFilter} />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart data={data} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>
                <PieChartSimple data={data} className={fixedHeightPaper} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={7}>
              <Paper className={classes.paper}>
                <Orders data={data} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                <MapChart data={data} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
