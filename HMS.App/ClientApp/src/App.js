import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css';
import { Houses } from "./components/Houses/Houses";
import { Settlers } from './components/Settlers/Settlers';
import {  SettlerDetails } from "./components/Settlers/SettlerDetails";
import Providers from './components/Providers/Providers';
import { ProviderDetails } from './components/Providers/ProviderDetails';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/houses' component={Houses} />
        <Route path="/house/:houseId" component={Settlers}/>
        <Route path="/settlers/:settlerId" component={SettlerDetails}/>
        <Route path='/providers' component={Providers} />
        <Route path='/provider/:providerId' component={ProviderDetails} />
      </Layout>
    );
  }
}
