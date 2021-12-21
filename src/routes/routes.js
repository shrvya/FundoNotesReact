import { BrowserRouter as Router,  Route } from "react-router-dom";
import {Registration} from '../pages/Registration'
import {Login} from '../pages/Login'
import { Forgot } from "../pages/Forgot";
import {Reset} from "../pages/Reset";
import Trash from "../pages/Trash";

import {MiniDrawer} from "../pages/Fundokeep";

function Routes() {
  return (
    
    <div className="App">
    <Router>
        <Route path="/" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/users/reset/:token" exact component={Reset} />
        <Route path="/Fundokeep" exact component={MiniDrawer}/>
        <Route path="/Trash" exact component={Trash}/>
     
    </Router>
  </div>
  );
}

export default Routes;
