/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Album from "@material-ui/icons/Album";
import Playlist_play from "@material-ui/icons/PlaylistPlay";
import Grade from "@material-ui/icons/Grade";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/Artistes/Artistes.js";
import TableList from "views/Titres/Titres.js";
import Playlists from "views/Playlists/Playlists.js";
import Favoris from "views/Favoris/Favoris.js";

const dashboardRoutes = [
  {
    path: "/accueil",
    name: "Accueil",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/artistes",
    name: "Artistes",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/titres",
    name: "Titres",
    icon: Album,
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/playlist",
    name: "Playlists",
    icon: Playlist_play,
    component: Playlists,
    layout: "/admin"
  },
  {
    path: "/favoris",
    name: "Favoris",
    icon: Grade,
    component: Favoris,
    layout: "/admin"
  }
];

export default dashboardRoutes;
