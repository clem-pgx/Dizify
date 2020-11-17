import React from 'react';
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);


const List = (props) => {
    const classes = useStyles();
    const {titres} = props;
    if (!titres || titres.length === 0) return <p>Aucun titres</p>;
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Tous les titres</h4>
                        </CardHeader>
                        <CardBody>
                            <table>
                                <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Durée</th>
                                </tr>
                                </thead>
                                <tbody>
                                {titres.map((titre) => {
                                    return (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
};
export default List;
