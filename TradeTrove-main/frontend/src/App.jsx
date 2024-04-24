import Home from './components/Home.jsx'
import './index.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import checkout from './components/Checkout.jsx';
import Orderhistory from './components/Orderhistory.jsx';

function App() {

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  return (
    <BrowserRouter>
      {
        <div>

          {user ?
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/checkout' exact component={checkout} />
              <Route path='/orderHistory' exact component={Orderhistory} />
            </Switch>
            :
            <Switch>
              <Route path='/' exact component={Home} />
              <Redirect to='/' exact component={Home} />
            </Switch>
          }

        </div>
      }
    </BrowserRouter>
  );
}
export default App;