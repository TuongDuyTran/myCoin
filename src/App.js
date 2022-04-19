import "./App.css";
import Web3 from "web3";
import { ethers } from "ethers";
import { useState } from "react";
import { Layout } from "antd";
import SlideBar from "./components/SlideBar";

function App() {
  const { Sider, Content } = Layout;

  const [infoAccount, setInfoAccount] = useState({
    balance: 0,
    address: "",
  });

  return (
    <>
      <Layout className="h-full">
        <Sider className="style-slidebar">
          <SlideBar />
        </Sider>
        <Layout>
          <Content style={{ background: "red" }}>Content</Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
