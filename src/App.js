
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/addPostForm'
import { CounterApp } from './features/counter/'
import { SinglePost } from './features/posts/SinglePost'
import { EditPost } from './features/posts/editPost'

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Navbar } from './app/NavBar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/counter"
            render={() => (
              <React.Fragment>
                <CounterApp />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/editPost/:postId" component={EditPost} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
