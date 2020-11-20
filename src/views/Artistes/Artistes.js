import React, { useState, useEffect } from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Album from "@material-ui/icons/Album";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

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
        {artistes.map(artiste => (
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <h3 className={classes.cardTitle}>{artiste.nom}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <BottomNavigation
                  /* value={value} */
/*                   onChange={(event, newValue) => {
                    setValue(newValue);
                  }} */
                  showLabels
                  className={classes.root}
                >
                  <BottomNavigationAction label="Albums" icon={<AssessmentIcon />} />
                  <BottomNavigationAction label="Titres" icon={<Album />} />
                </BottomNavigation>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
        </GridContainer>
      </div>
    );
}