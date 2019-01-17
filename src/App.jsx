import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AboutUs, Keygen } from "./page";
import { key } from "openpgp";
import { withStore } from "./store";
// import Keygen from "./components/keygen";
import './App.css';

class App extends Component {
  async componentDidMount() {
    const privateKeyArmored = localStorage.getItem('privateKeyArmored')
    if (privateKeyArmored) {
      const privateKey = await key.readArmored(privateKeyArmored)
      this.props.store.set('privateKey')(privateKey.keys[0])
    }

  }

  Home() {
    return (
      <div className="home">
        <h2 className="subtitle">Encrypt</h2>
        <textarea className="textarea" placeholder="请输入加密的内容, e.g. Hello world"></textarea>
      </div>
    )
  }

  render() {
    return (
      <Router>
        <div className="container">
          <header className="header">
            <h1 className="title">Pretty Good Privacy Online</h1>
            <h2 className="subtitle">by Frank Wei</h2>
            <nav className="navbar">
              <Link className="navbar-item" to="/" > 首页 </Link>
              <Link className="navbar-item" to="/about" > 关于 </Link>
              <div className="navbar-end">
                <Link className="navbar-item is-right" to="/key" > 密钥管理 </Link>
              </div>
            </nav>
          </header>
          <Route path="/" exact component={this.Home}></Route>
          <Route path="/about" component={AboutUs}></Route>
          <Route path="/key" component={Keygen}></Route>
        </div>
      </Router>
    );
  }
}

export default withStore(App);
