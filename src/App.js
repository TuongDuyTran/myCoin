import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { Layout, Spin } from "antd";
import SlideBar from "./components/SlideBar";
import { Home, Dashboard, SendTransaction, Connect } from "./pages/index";
import dotenv from "dotenv";

dotenv.config();

function App() {
  const { Sider, Content } = Layout;
  
  let account = localStorage.getItem("infoAccount");
  if (account) {
    account = JSON.parse(account);
  }

  const [infoAccount, setInfoAccount] = useState({
    address: account?.publicKey ? account.publicKey : "",
    balance: account?.amount ? account.amount : 0,
    isConnected: account?.id ? true : false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setInfoAccount({
      balance: "100.00",
      address: "0x4685cF0F76b4b7402A187AA1AA94917602d811Eb",
      isConnected: true,
    });
    setIsLoading(true);
  };

  return (
    <>
      <Layout style={{ 'position': 'relative' }} className="h-full">
        <Layout className='absolute-center' style={{ 'display': isLoading ? 'flex' : 'none' }}>
          <Spin spinning={true} size="large"></Spin>
        </Layout>
        <Layout style={{ zIndex: 1 }}>
          <Sider className="style-slidebar">
            <SlideBar infoAccount={infoAccount} handleConnect={handleConnect} />
          </Sider>
          <Layout>
            <Content style={{ background: "#fff" }}>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="send" element={<SendTransaction />} />
                <Route path="connect" element={<Connect />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
