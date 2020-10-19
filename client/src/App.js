import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// components 
import InputPost from './components/InputPost.js';
import ListPosts from './components/ListPosts.js';
import Post from "./components/Post.js";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path ="/" exact component={Home} />
        <Route path ="/posts/:id" component={Post} />
        {/* <Route path ="/replies/:id" component={Reply} /> */}
        </Switch>
        </div>
    </Router>
    );
}

const Home = () => (
  <Fragment>
      <div className="container text-center">

        <div className="col-lg-5 container">
          <InputPost />
        </div>
        <ListPosts />
      </div> 
      </Fragment>
)

export default App;
