import React, { useState, useEffect } from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios'
import Typical from 'react-typical'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const api = axios.create({
  baseURL: `http://localhost:8080`
})
export default function Dashboard() {

  const [artistes, setArtistes] = useState([]); //table data
  const [titres, setTitres] = useState([]); //table data
  const [albums, setAlbums] = useState([]); //table data

  useEffect(() => { 
    api.get("/artistes")
        .then(res => {
            setArtistes(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
    api.get("/titres")
        .then(res => {
            setTitres(res.data)
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
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {artiste.nom}
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
      <Typical steps={['', 1000, 'Nos albums du moment !', 1000]} loop={1} wrapper="h3"/>
      <GridContainer>
      {albums.slice(0).map(album => (
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>content_copy</Icon>
              </CardIcon>
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

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
