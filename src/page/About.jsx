import React from "react";

export default class About extends React.Component {
    render() {
        return <div className="about">
            <h1 className="title">关于 PGP Online</h1>
            <p>作者受《Computer Networking: A Top-Down Approach》 关于网络安全的启发，使用 React、 Node 等现代化前端技术，来验证 PGP 的安全性。</p>
            <p>通过使用PGP Online，学生可以无需安装 PGP 即可学习网络安全原理。</p>
        </div>
    }
}