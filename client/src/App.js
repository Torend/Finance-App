import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/layuot/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import AddStock from './components/dashboard/AddStock'
import Dashboard from './components/dashboard/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{backgroundColor: '#eeeeee', height: '100vh'}}>
        <NavBar/>
        <Switch>
          <Route exact path='/'component={Dashboard} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/add-stock' component={AddStock} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
