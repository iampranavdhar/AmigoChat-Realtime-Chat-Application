import Signin from "./Pages/Signin.js"
import Signup from "./Pages/Signup.js"
import Home from "./Pages/Home.js"
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext.js"

function App() {
  
  const { user } = useContext(AuthContext)
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Signin />}
          </Route>
          <Route exact path='/signin'>
            {user ? <Redirect to='/' /> : <Signin />}
          </Route>
          <Route exact path='/signup'>
            {user ? <Redirect to='/' /> : <Signup/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
