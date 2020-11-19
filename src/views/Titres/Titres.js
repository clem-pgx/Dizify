import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TitresList from 'components/Titres/TitresList';
import withTitresLoading from 'components/Titres/withTitresLoading';
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
    const TitresListLoading = withTitresLoading(TitresList);
    const [appState, setAppState] = useState({
        loading: false,
        titres: null,
    });

    useEffect(() => {
        setAppState({loading: true});
        const apiUrl = `http://localhost:8080/titres`;
        axios.get(apiUrl)
            .then((response) => {
                setAppState({loading: false, titres: response.data});
            }).catch((error) => {
            console.log(error)
        })

    }, [setAppState]);
    return (
        <div className='App'>
            <div className='titre-container'>
                <TitresListLoading isLoading={appState.loading} titres={appState.titres}/>
            </div>
        </div>
    );
}

export default TitresApp;
