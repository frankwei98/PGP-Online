import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AboutUs, Keygen, Encrypt, Decrypt } from "./page";
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
    const { store } = this.props
    return (
      <div className="home" style={{ textAlign: "center" }}>
        <h1 className="title">PGP Online</h1>
        <h2 className="subtitle">使用现代前端技术，打造出简陋的 PGP (Pretty Good Privacy) 客户端</h2>
        <h2 className="subtitle">你可以在浏览器生成你的密钥对，和朋友开始加密通信！</h2>
        <p>你现在 {store.get('privateKey') ? "" : "没"}有 密钥对</p>
        {store.get('privateKey') ?
          <Link className="button is-primary" to="/decrypt" > 立即解密 </Link>
          : <Link className="button is-primary" to="/key" > 立即生成密钥对 </Link>}
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
              <Link className="navbar-item" to="/encrypt" > 加密 </Link>
              <Link className="navbar-item" to="/decrypt" > 解密 </Link>
              <Link className="navbar-item" to="/about" > 关于 </Link>
              <div className="navbar-end">
                <Link className="navbar-item is-right" to="/key" > 密钥管理 </Link>
              </div>
            </nav>
          </header>
          <Route path="/" exact component={() => this.Home()}></Route>
          <Route path="/about" component={AboutUs}></Route>
          <Route path="/encrypt" component={Encrypt}></Route>
          <Route path="/decrypt" component={Decrypt}></Route>
          <Route path="/key" component={Keygen}></Route>
        </div>
      </Router>
    );
  }
}

export default withStore(App);
