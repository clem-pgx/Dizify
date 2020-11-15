import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ArtistesList from 'components/Artistes/ArtistesList';
import withArtistLoading from 'components/Artistes/withArtistLoading';

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

function ArtistesApp() {
  const classes = useStyles();
  const ArtistesListLoading = withArtistLoading(ArtistesList);
  const [appState, setAppState] = useState({
    loading: false,
    artistes: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://localhost:8080/artistes`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((artistes) => {
        setAppState({ loading: false, artistes: artistes });
      });
  }, [setAppState]);
  return (
    <div className='App'>
      <div className='artiste-container'>
        <ArtistesListLoading isLoading={appState.loading} artistes={appState.artistes} />
      </div>
    </div>
  );
}
export default ArtistesApp;