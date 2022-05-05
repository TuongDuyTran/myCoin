import { Form, Input, Button, message, InputNumber, Table, Space } from "antd";
import MyCoinAPI from "../services/MyCoinAPI";
import { useEffect, useState } from "react";

function Dashboard({ infoAccount }) {
  const columns = [
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
      render: (text, record) => {
        return <Space size="middle">
          <span>{shortAddress(text)}</span>
        </Space>
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        // console.log("senderL ", record.sender);
        // console.log("infoaccount: ", infoAccount.sender);
        return <Space size="middle">
          {
            record.sender === infoAccount.address ?
              (<span style={{ color: "red", fontWeight: "bolder" }}>{"-" + record.amount + " ETH"}</span>) :
              (<span style={{ color: "green", fontWeight: "bolder" }}>{"+" + record.amount + " ETH"}</span>)
          }
        </Space>
      }
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      render: (text, record) => {
        return <Space size="middle">
          <span>{shortAddress(text)}</span>
        </Space>
      }
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp'
    }
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await MyCoinAPI.getHistory(infoAccount.address);
      if (res.code === 200) {
        setData(res.data.map((history, index) => {
          return {
            key: index + 1,
            sender: history.SenderPublicKey,
            amount: history.Amount,
            receiver: history.ReceiverPublicKey,
            timestamp: history.Timestamp
          }
        }))
      }
    }

    fetchHistory();
  }, []);

  const shortAddress = (address) => {
    return address.slice(0, 10) + "..." + address.slice(address.length - 10);
  }

  return (
    <main className="layout-main">
      <h2>History transaction...</h2>
      <div className="card">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </main>
  );
}

export default Dashboard;
