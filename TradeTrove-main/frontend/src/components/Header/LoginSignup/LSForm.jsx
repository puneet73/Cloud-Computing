import React from "react";
import "./Form.css";
import Login from "./login";
import Register from "./register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logout from "./logout";

function LSForm(props) {
  const { user, updateUser} = props;

  return (
    <div className="form">
    <div className="formMain">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>
    
    <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Logout  user={user} updateUser={updateUser} /> : <><Register/><Login user={user} updateUser={updateUser}></Login></>
            }
          </Route>
        </Switch>
      </Router>		
	</div>
  </div>
  );
}

export default LSForm;
