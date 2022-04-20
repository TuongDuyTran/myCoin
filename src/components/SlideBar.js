import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  SendOutlined,
  QrcodeOutlined,
  CopyOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import wallet from "./../download.png";

const { SubMenu } = Menu;

function SlideBar({ infoAccount }) {
  const { address, balance } = infoAccount;

  return (
    <>
      <h3
        style={{
          paddingLeft: "30px",
          margin: "5px 0",
          color: "#fff",
          fontSize: "2rem",
        }}
      >
        myCoin
      </h3>
      <div
        style={{
          margin: "20px 20px",
        }}
      >
        <div className="component-wallet">
          <div className="background-wallet">
            <img src={wallet} />
          </div>
          <div className="info-container">
            <div>MY PERSONAL ACCOUNT</div>
            <div className="address">
              {address.slice(0, 6)}...{address.slice(address.length - 6)}
            </div>
            <div className="binance">{balance} ETH</div>
            <div className="quick-action">
              <QrcodeOutlined className="icon" />
              <CopyOutlined className="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="component-connect-wallet">
        <div className="connect-wallet">
          <ThunderboltOutlined style={{ fontSize: "24px" }} />
          Connect
        </div>
      </div>
      <Menu mode="inline" theme="dark">
        <Menu.Item
          key="1"
          icon={<DashboardOutlined style={{ fontSize: "24px" }} />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<SendOutlined style={{ fontSize: "24px" }} />}>
          Send Transaction
        </Menu.Item>
      </Menu>

      <Menu mode="inline" theme="dark">
        <Menu.Item
          key="3"
          icon={<LogoutOutlined style={{ fontSize: "24px" }} />}
        >
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
}

export default SlideBar;
