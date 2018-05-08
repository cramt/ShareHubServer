//æøå
import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Community } from "./components/Community";
import { Communities } from "./components/Communities";
import { NewCommunity } from "./components/NewCommunity";
import { Profile } from "./components/Profile";
import { InitNfc } from "./components/InitNfc";
//this is a list of all the routes the site has 
//a route is basicly just a different url that corresponses to a React Component
//path defines the url, and component decripes the corresponding React Component
export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/community/:communityId" component={Community} />
    <Route exact path="/community" component={Communities} />
    <Route exact path="/newCommunity" component={NewCommunity} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/initNfc" component={InitNfc} />
</Layout>;
