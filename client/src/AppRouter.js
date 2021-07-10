import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Ongkir from './Ongkir'

const Approuter = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={App} />
      <Route path='/ongkir' component={Ongkir} />
    </Switch>
  </Router>
)

export default Approuter
