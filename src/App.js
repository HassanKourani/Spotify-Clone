import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./views/Nav";
import { db } from "./config";
import { getAuth } from "firebase/auth";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Search from "./views/Search";
import Playlists from "./views/Playlists";
import Playlist from "./views/Playlist";
import Liked from "./views/Liked";
import Welcome from "./views/Welcome";
import NotFound from "./views/NotFound";
function App() {
  const auth = getAuth();
  return (
    <div className="font-Nunito bg-gray-900">
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/home/:id">
            <Home db={db} />
            <Nav auth={auth} />
          </Route>
          <Route exact path="/playlists/:id">
            <Playlists db={db} />
            <Nav auth={auth} />
          </Route>
          <Route exact path="/playlists/:id/:pid">
            <Playlist db={db} />
            <Nav auth={auth} />
          </Route>
          <Route exact path="/liked/:id">
            <Liked db={db} />
            <Nav auth={auth} />
          </Route>
          <Route exact path="/search/:id">
            <Search db={db} />
            <Nav auth={auth} />
          </Route>
          <Route exact path="/signup">
            <Signup auth={auth} db={db} />
          </Route>
          <Route exact path="/signin">
            <Signin auth={auth} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
