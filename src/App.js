
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import {Registration} from '../src/component/Registration'
import {Login} from '../src/component/Login'
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Registration} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
