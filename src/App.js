import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import SlideBar from "./components/SlideBar";
import { Home, Dashboard, SendTransaction, Connect, Create } from "./pages/index";
import dotenv from "dotenv";
import { useNavigate } from 'react-router-dom';
import MyCoinAPI from "./services/MyCoinAPI";

dotenv.config();

function App() {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();

  let account = localStorage.getItem("infoAccount");
  if (account) {
    account = JSON.parse(account);
  }

  const [infoAccount, setInfoAccount] = useState({
    name: account?.name ? account.name : "noname",
    address: account?.publicKey ? account.publicKey : "",
    balance: account?.amount ? account.amount : 0,
    isConnected: account?.id ? true : false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      if (infoAccount.isConnected) {
        const res = await MyCoinAPI.getInfo(infoAccount.address);
        if (res.code === 200) {
          setInfoAccount({
            ...infoAccount, balance: res.data.amount
          });
        }
      }
    }

    fetchInfo();
  }, []);

  return (
    <>
      <Layout style={{ 'position': 'relative' }} className="h-full">
        <Layout className='absolute-center' style={{ 'display': isLoading ? 'flex' : 'none' }}>
          <Spin spinning={true} size="large"></Spin>
        </Layout>
        <Layout style={{ zIndex: 1 }}>
          <Sider className="style-slidebar">
            <SlideBar infoAccount={infoAccount} setInfoAccount={setInfoAccount} />
          </Sider>
          <Layout>
            <Content style={{ background: "#fff" }}>
              <Routes>
                <Route path="/" exact element={<Connect setInfoAccount={setInfoAccount} setIsLoading={setIsLoading} />} />
                <Route path="/home" exact element={<Home infoAccount={infoAccount} />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="send" element={<SendTransaction setIsLoading={setIsLoading} infoAccount={infoAccount} setInfoAccount={setInfoAccount} />} />
                <Route path="connect" element={<Connect setInfoAccount={setInfoAccount} setIsLoading={setIsLoading} />} />
                <Route path="create" element={<Create setIsLoading={setIsLoading} />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
