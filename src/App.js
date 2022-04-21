import { Routes, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import SlideBar from "./components/SlideBar";
import Dashboard from "./components/Dashboard";
import SendTransaction from "./components/SendTransaction";
import Home from "./components/Home";

function App() {
	const { Sider, Content } = Layout;

	const [infoAccount, setInfoAccount] = useState({
		balance: 0,
		address: "",
		isConnected: false,
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    const itemAccount = localStorage.getItem("account");
    if (itemAccount) {
      setInfoAccount(itemAccount);
    }
  }, []);

	const handleConnect = async () => {
		setIsLoading(true);
		const { ethereum } = window;
		const data = await ethereum.request({ method: "eth_requestAccounts" });
		const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

		web3.eth.getBalance(data[0]).then((value) => {
			console.log("value", value);
      const info = {
				balance: ethers.utils.formatEther(value),
				address: data[0],
				isConnected: true,
			};
			setIsLoading(false);
			setInfoAccount(info);
      localStorage.setItem("account", info);
		});
	};

	return (
		<>
			<Layout style={{ position: "relative" }} className="h-full">
				<Layout className="absolute-center" style={{ display: isLoading ? "flex" : "none" }}>
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
							</Routes>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
}

export default App;
