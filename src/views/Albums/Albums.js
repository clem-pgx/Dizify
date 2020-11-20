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
                  <Button variant="contained" /* startIcon={<Album />} */>
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
}