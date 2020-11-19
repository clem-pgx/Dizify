import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TitresList from 'components/Titres/TitresList';
import TitresForm from 'components/Titres/TitresForm'
import axios from 'axios';

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

function TitresApp() {
    const classes = useStyles();
    const [appState, setAppState] = useState({
        loading: false,
        titres: null,
        artistes: null,
        albums: null
    });

    useEffect(() => {
        setAppState({loading: true});
        axios.get(`http://localhost:8080/titres`)
            .then((response) => {
                setAppState({loading: false, titres: response.data});
            }).catch((error) => {
            console.log(error)
        })
        axios.get(`http://localhost:8080/artistes`)
            .then((response) => {
                setAppState({loading: false, artistes: response.data});
            }).catch((error) => {
            console.log(error)
        })
        axios.get(`http://localhost:8080/albums`)
            .then((response) => {
                setAppState({loading: false, albums: response.data});
            }).catch((error) => {
            console.log(error)
        })

    }, [setAppState]);
    if (appState.loading) {
        return <p style={{textAlign: 'center', fontSize: '30px'}}>
            Hold on, fetching data may take some time :)
        </p>
    }
    else
    {
        return (
            <div className='App'>
            <h4 className={classes.cardTitleWhite}>Titres</h4>
                <div className='titre-container'>
                    <TitresForm titres={appState.titres} artistes={appState.artistes} albums={appState.albums} />
                    <TitresList titres={appState.titres}/>
                </div>
            </div>
        );
    }
}

export default TitresApp;
