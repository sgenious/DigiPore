import React from 'react';
import {HashRouter as Router, Route, Switch,Link} from 'react-router-dom';
import {Hub} from './hub';
import { PersonDetail } from './app.persondetail';
import { PersonComponent } from './app.personAdmin';
import { Login } from './app.login';

export class PersonMain extends React.Component{
    render(){
        return <Router><div>
            <header>
                <h1>Person Application</h1>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
    
            </nav>
            <main>
                <Switch>
                <Route exact path="/" component={Hub} />
                <Route path ="/detail/:id" component={PersonDetail} />
                <Route path ="/Login" component={Login} />
                <Route path ="/Admin" component={PersonComponent} />
                </Switch>
            </main>
            <footer>
                Copyright (c) Acme Solutions Ltd
            </footer>
        </div></Router>
    }
}