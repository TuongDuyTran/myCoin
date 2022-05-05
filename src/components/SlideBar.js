import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  WalletOutlined,
  DashboardOutlined,
  SendOutlined,
  QrcodeOutlined,
  CopyOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import wallet from "./../download.png";
import { useNavigate } from 'react-router-dom';

function SlideBar({ infoAccount, setInfoAccount }) {
  const { address, balance } = infoAccount;
  const navigate = useNavigate();

  const shortAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 6);
  }

  const handleLogOut = () => {
    localStorage.removeItem("infoAccount");
    setInfoAccount({
      name: "noname",
      address: "",
      balance: 0,
      isConnected: false
    });
    navigate('/home');
  }

  return (
    <>
      <Link to="/home"
        style={{
          paddingLeft: "30px",
          margin: "5px 0",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: "bolder"
        }}>
        myCoin
      </Link>

      <div
        style={{
          margin: "20px 20px",
        }}
      >
        <div className="component-wallet">
          <div className="background-wallet">
            <img src={wallet} alt="bg-wallet" />
          </div>
          <div className="info-container">
            <div>MY PERSONAL ACCOUNT</div>
            <div className="address">
              {shortAddress(address)}
            </div>
            <div className="binance">{balance} ETH</div>
            <div className="quick-action">
              <QrcodeOutlined className="icon" />
              <CopyOutlined className="icon" />
            </div>
          </div>
        </div>
      </div>

      <Menu mode="inline" theme="dark">
        <Menu.Item key="1" icon={<ThunderboltOutlined style={{ fontSize: "24px" }} />}> 
          <Link to="/connect">Connect</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<WalletOutlined style={{ fontSize: "24px" }} />}>
          <Link to="/create">Create Wallet</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DashboardOutlined style={{ fontSize: "24px" }} />}>
          <Link to="/dashboard">History Transaction</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SendOutlined style={{ fontSize: "24px" }} />}>
          <Link to="/send">Send Transaction</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined style={{ fontSize: "24px" }} />}>
          <Link to="#" onClick={handleLogOut}>Log Out</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default SlideBar;
