/* import React, { useState, useEffect } from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from '@material-ui/core/Button';


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ArtistesApp() {
  const classes = useStyles();
  const [albums, setAlbums] = useState([]); //table data
  //for error handling
  //const [iserror, setIserror] = useState(false)
  //const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    fetch("http://localhost:8080/albums")
    .then(res => res.json())
    .then(
      (result) => {
        setAlbums(result);
        console.log(result)
      },
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
    )
  }, [])

    return (
      <div>
        <GridContainer>
        {albums.map(album => (
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>{album.artistes.nom} - {album.date}</p>
                <h3 className={classes.cardTitle}>{album.nom}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Button variant="contained">
                    Titres
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
        </GridContainer>
      </div>
    );
} */
import React, { useState, useEffect } from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // eslint-disable-next-line
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles(styles);

export default function ArtistesApp() {
  const classes = useStyles();

  const [albums, setAlbums] = useState([]); //table data
  //for error handling
  //const [iserror, setIserror] = useState(false)
  //const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    fetch("http://localhost:8080/albums")
    .then(res => res.json())
    .then(
      (result) => {
        setAlbums(result);
      },
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
    )
  }, [])
    return (
      <div>
      <GridContainer>
      {albums.map(album => (
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>{album.artistes.nom} - {album.date}</p>
                <h3 className={classes.cardTitle}>{album.nom}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Button variant="contained" href={"/admin/albums/titresByAlbums/" + album.id}>
                  Titres
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
      </GridContainer>
      <hr />
      <Router>
        <div>
          <Switch>
            <Route path="/admin/albums/titresByAlbums/">
              <Topics />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    );
}

function Topics() {

  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Titres</h2>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${url}/:albumsId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  
  let { albumsId } = useParams();
  const [titres, setTitres] = useState([]); //table data
  const getTitre = "http://localhost:8080/albums/titres/";
  const theIdAlbum = albumsId;
  useEffect(() => { 
    fetch(getTitre + theIdAlbum)
        .then(res => res.json())
        .then(
        (result) => {
            setTitres(result);
            console.log(result)
        },
        )
  }, [])
  return (
    <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Durée (en sec)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {titres.map(titre => (
                <TableRow>
                  <TableCell component="th" scope="row">{titre.nom}</TableCell>
                  <TableCell>{titre.duree}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}