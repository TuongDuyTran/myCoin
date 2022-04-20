import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import { ethers } from "ethers";
import { useState } from "react";
import { Layout } from "antd";
import SlideBar from "./components/SlideBar";
import Dashboard from "./components/Dashboard";
import SendTransaction from "./components/SendTransaction";
import Home from "./components/Home";

function App() {
  const { Sider, Content } = Layout;

  const [infoAccount, setInfoAccount] = useState({
    balance: 0,
    address: "0x4685cF0F76b4b7402A187AA1AA94917602d811Eb",
  });

  return (
    <>
      <Router>
        <Layout className="h-full">
          <Sider className="style-slidebar">
            <SlideBar infoAccount={infoAccount} />
          </Sider>
          <Layout>
            <Content style={{ background: "#fff" }}>
              <Routes>
                <Route path="/" exact component={<Home />} />
                <Route path="dashboard" component={<Dashboard />} />
                <Route path="send" component={<SendTransaction />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
}

export default App;
