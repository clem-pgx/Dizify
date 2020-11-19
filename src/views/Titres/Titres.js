import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
//import StarIcon from '@material-ui/icons/Star';


var columns = [
    {title: "Nom", field: "nom"},
    {title: "Duree", field: "duree"},
    {title: "Albums", field: "albums.nom"},
    {title: "Artistes", field: "artistes.nom"},
]

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
const useStyles = makeStyles(styles);

export default function DataTable() {
    const classes = useStyles();

    const [titres, setTitres] = useState([]); //table data

    useEffect(() => { 
        fetch("http://localhost:8080/titres")
        .then(res => res.json())
        .then(
        (result) => {
            setTitres(result);
            console.log(result)
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        )
    }, [])

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Titres</h4>
                    </CardHeader>
                    <CardBody>
                        <MaterialTable title="" columns={columns} data={titres} actions={[
                        {
                            icon: 'star',
                            tooltip: 'Favoris',
                            onClick: (event, rowData) => alert(rowData.nom + " ajouté au favoris")
                        }]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}