
import { BrowserRouter as Router,  Route } from "react-router-dom";
import {Registration} from '../src/pages/Registration'
import {Login} from '../src/pages/Login'
import { Forgot } from "./pages/Forgot";
import {Reset} from "./pages/Reset";
import Dashboard from "./components/Dasboard";

import {MiniDrawer} from "./pages/Fundokeep";

function App() {
  return (
    <div className="App">
    <Router>
        <Route path="/" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/users/reset/:token" exact component={Reset} />
        <Route path="/Fundokeep" exact component={MiniDrawer}/>
        {/* <Route path="/dashboard"exact><Dashboard/></Route> */}
    </Router>
  </div>
  );
}

export default App;
