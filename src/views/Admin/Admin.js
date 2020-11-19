import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
//import Grid from '@material-ui/core/Grid'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
//import CustomInput from "components/CustomInput/CustomInput.js";
//import Button from "components/CustomButtons/Button.js";
//import CardFooter from "components/Card/CardFooter.js";
//import { card } from "assets/jss/material-dashboard-react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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

const api = axios.create({
  baseURL: `http://localhost:8080`
})

function ArtistesApp() {

  var columnsArtistes = [
    {title: "id", field: "id", hidden: true},
    {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={50} round={true} name={rowData === undefined ? " " : rowData.nom} />  },
    {title: "Nom", field: "nom"},
    /* {title: "Image", field: "image"} */
  ]
  var columnsTitres = [
    {title: "id", field: "id", hidden: true},
    {title: "Nom", field: "nom"},
    {title: "Duree", field: "duree"},
    {title: "Artistes", field: "artistes.nom"},
    {title: "Albums", field: "album.nom"}

  ]
  var columnsAlbums = [
    {title: "id", field: "id", hidden: true},
    {title: "Nom", field: "nom"},
    /* {title: "Image", field: "image"}, */
    {title: "Date", field: "date"},
    {title: "Artistes", field: "artistes.nom"}
  ]
  const [artistes, setArtistes] = useState([]); //table data
  const [titres, setTitres] = useState([]); //table data
  const [albums, setAlbums] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

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
  //artistes
  const artistesRowUpdate = (newArtistes, oldArtistes, resolve) => {
    //validation
    let errorList = []
    if(newArtistes.nom === ""){
      errorList.push("Stp ton nom")
    }

    if(errorList.length < 1){
      api.put("/artistes/"+newArtistes.id, newArtistes)
      .then(res => {
        const artistesUpdate = [...artistes];
        const index = oldArtistes.tableData.id;
        artistesUpdate[index] = newArtistes;
        setArtistes([...artistesUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const artistesRowAdd = (newArtistes, resolve) => {
    //validation
    let errorList = []
    if(newArtistes.nom === undefined){
      errorList.push("stp ton nom")
    }

    if(errorList.length < 1){ //no error
      api.post("/artistes", newArtistes)
      .then(res => {
        let artistesToAdd = [...artistes];
        artistesToAdd.push(newArtistes);
        setArtistes(artistesToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const artistesRowDelete = (oldArtistes, resolve) => {
    
    api.delete("/artistes/"+oldArtistes.id)
      .then(res => {
        const artistesDelete = [...artistes];
        const index = oldArtistes.tableArtistes.id;
        artistesDelete.splice(index, 1);
        setArtistes([...artistesDelete]);
        resolve()
        console.log(index);
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  //titres
   const titresRowUpdate = (newTitres, oldTitres, resolve) => {
    //validation
    let errorList = []
    if(newTitres.nom === ""){
      errorList.push("Stp ton nom")
    }

    if(errorList.length < 1){
      api.put("/titres/"+newTitres.id, newTitres)
      .then(res => {
        const titresUpdate = [...titres];
        const index = oldTitres.tableData.id;
        titresUpdate[index] = newTitres;
        setTitres([...titresUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const titresRowAdd = (newTitres, resolve) => {
    //validation
    let errorList = []
    if(newTitres.nom === undefined){
      errorList.push("stp ton nom")
    }

    if(errorList.length < 1){ //no error
      api.post("/titres", newTitres)
      .then(res => {
        let titresToAdd = [...titres];
        titresToAdd.push(newTitres);
        setTitres(titresToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const titresRowDelete = (oldTitres, resolve) => {
    
    api.delete("/titres/"+oldTitres.id)
      .then(res => {
        const titresDelete = [...titres];
        const index = oldTitres.tableTitres.id;
        titresDelete.splice(index, 1);
        setTitres([...titresDelete]);
        resolve()
        console.log(index);
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  //albums
  const albumsRowUpdate = (newAlbums, oldAlbums, resolve) => {
    //validation
    let errorList = []
    if(newAlbums.nom === ""){
      errorList.push("Stp ton nom")
    }

    if(errorList.length < 1){
      api.put("/albums/"+newAlbums.id, newAlbums)
      .then(res => {
        const albumsUpdate = [...albums];
        const index = oldAlbums.tableData.id;
        albumsUpdate[index] = newAlbums;
        setAlbums([...albumsUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const albumsRowAdd = (newAlbums, resolve) => {
    //validation
    let errorList = []
    if(newAlbums.nom === undefined){
      errorList.push("stp ton nom")
    }

    if(errorList.length < 1){ //no error
      api.post("/albums", newAlbums)
      .then(res => {
        let albumsToAdd = [...albums];
        albumsToAdd.push(newAlbums);
        setAlbums(albumsToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const albumsRowDelete = (oldAlbums, resolve) => {
    
    api.delete("/albums/"+oldAlbums.id)
      .then(res => {
        const albumsDelete = [... albums];
        const index = oldAlbums.tableAlbums.id;
        albumsDelete.splice(index, 1);
        setAlbums([...albumsDelete]);
        resolve()
        console.log(index);
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }
  

  const classes = useStyles();
  return (
    <div className="App">
      <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Artistes</h4>
              </CardHeader>
              <CardBody>
                <div>
                  {iserror && 
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                    </Alert>
                  }       
                </div>
                <MaterialTable
                  title=""
                  columns={columnsArtistes}
                  data={artistes}
                  icons={tableIcons}
                  editable={{
                    onRowUpdate: (newArtistes, oldArtistes) =>
                      new Promise((resolve) => {
                          artistesRowUpdate(newArtistes, oldArtistes, resolve);
                          
                      }),
                    onRowAdd: (newArtistes) =>
                      new Promise((resolve) => {
                        artistesRowAdd(newArtistes, resolve)
                      }),
                    onRowDelete: (oldArtistes) =>
                      new Promise((resolve) => {
                        artistesRowDelete(oldArtistes, resolve)
                      }),
                  }}
                />
              </CardBody>
              </Card>
            </GridItem>
      </GridContainer>

       <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Titres</h4>
              </CardHeader>
              <CardBody>
                <div>
                  {iserror && 
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                    </Alert>
                  }       
                </div>
                <MaterialTable
                  title=""
                  columns={columnsTitres}
                  data={titres}
                  icons={tableIcons}
                  editable={{
                    onRowUpdate: (newTitres, oldTitres) =>
                      new Promise((resolve) => {
                          titresRowUpdate(newTitres, oldTitres, resolve);
                          
                      }),
                    onRowAdd: (newTitres) =>
                      new Promise((resolve) => {
                          titresRowAdd(newTitres, resolve)
                      }),
                    onRowDelete: (oldTitres) =>
                      new Promise((resolve) => {
                          titresRowDelete(oldTitres, resolve)
                      }),
                  }}
                />
              </CardBody>
              </Card>
            </GridItem>
      </GridContainer>

      <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Albums</h4>
              </CardHeader>
              <CardBody>
                <div>
                  {iserror && 
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                    </Alert>
                  }       
                </div>
                <MaterialTable
                  title=""
                  columns={columnsAlbums}
                  data={albums}
                  icons={tableIcons}
                  editable={{
                    onRowUpdate: (newAlbums, oldAlbums) =>
                      new Promise((resolve) => {
                          albumsRowUpdate(newAlbums, oldAlbums, resolve);
                          
                      }),
                    onRowAdd: (newAlbums) =>
                      new Promise((resolve) => {
                        albumsRowAdd(newAlbums, resolve)
                      }),
                    onRowDelete: (oldAlbums) =>
                      new Promise((resolve) => {
                        albumsRowDelete(oldAlbums, resolve)
                      }),
                  }}
                />
              </CardBody>
              </Card>
            </GridItem>
      </GridContainer>
    </div>
  );
}

export default ArtistesApp;