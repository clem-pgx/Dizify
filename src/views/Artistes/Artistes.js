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
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { RedirectSource } from 'react-avatar';

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

  const [artistes, setArtistes] = useState([]); //table data
  //for error handling
  //const [iserror, setIserror] = useState(false)
  //const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    fetch("http://localhost:8080/artistes")
    .then(res => res.json())
    .then(
      (result) => {
        setArtistes(result);
      },
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
    )
  }, [])
    return (
      <div>
      <GridContainer>
      {artistes.map(artiste => (
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>{artiste.nom}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Button variant="contained" href={"/admin/artistes/albumsbyArtist/" + artiste.id}>
                  + d'infos
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
            <Route path="/admin/artistes/albumsbyArtist/">
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
      <h2>Albums</h2>
      <Link variant="contained" size="small" color="secondary" style={{float:'right'}} to="/admin/artistes">
        Retour
      </Link>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${url}/:artistId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {

  let { artistId } = useParams();
  const [album, setAlbum] = useState([]); //table data
  const [titres, setTitres] = useState([]); //table data
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  //for error handling
  //const [iserror, setIserror] = useState(false)
  //const [errorMessages, setErrorMessages] = useState([])
  const getAlbum = "http://localhost:8080/artistes/albums/";
  const getTitre = "http://localhost:8080/albums/titres/";
  const theIdAlbum = artistId;

  useEffect(() => { 
    fetch(getAlbum + theIdAlbum)
    .then(res => res.json())
    .then(
      (result) => {
        setAlbum(result);
        console.log(result)
      },
    )
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
      {album.map(album => (
/*         <a href={'/admin/albums/titresByAlbums/' + album.id}>{album.nom}</a> */
        <Chip avatar={<Avatar></Avatar>} label={album.nom} onClick={(e) => {
          e.preventDefault();
          window.location.href='/admin/albums/titresByAlbums/' + album.id;
          }}
          /* onClick={window.location.href='/admin/albums/titresByAlbums/' + album.id} *//>
      ))}
    </div>
  );
}