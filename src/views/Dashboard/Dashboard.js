import React, { useState, useEffect } from 'react';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import axios from 'axios'
import Typical from 'react-typical'

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const api = axios.create({
  baseURL: `http://localhost:8080`
})
export default function Dashboard() {

  const [artistes, setArtistes] = useState([]); //table data
  const [albums, setAlbums] = useState([]); //table data

  useEffect(() => { 
    api.get("/artistes")
        .then(res => {
            setArtistes(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
     api.get("/albums")
        .then(res => {
            setAlbums(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  console.log(artistes.slice(2));
  const classes = useStyles();
  return (
    <div>
      <Typical steps={['', 1000, 'Nos artistes du moment !', 1000]} loop={1} wrapper="h3"/>
      <GridContainer>
      {artistes.slice(1).map(artiste => (
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning">
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>
                {artiste.nom}
              </h3>
            </CardHeader>
            <cardFooter stats>
            <div className={classes.stats}>
                {/* <img src="https://i.pravatar.cc/100"/> */}
            </div>
            </cardFooter> 
          </Card>
        </GridItem>
      ))}
      </GridContainer>
      <Typical steps={['', 1000, 'Nos albums du moment !', 1000]} loop={1} wrapper="h3"/>
      <GridContainer>
      {albums.slice(0).map(album => (
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" >
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>
                {album.nom}
              </h3>
            </CardHeader>
            <cardFooter stats>
            <div className={classes.stats}>
              </div>
            </cardFooter> 
          </Card>
        </GridItem>
      ))}
      </GridContainer>
    </div>
  );
}
