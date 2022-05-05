import { Form, Input, Button, message, InputNumber } from "antd";
import MyCoinAPI from "../services/MyCoinAPI";
import { useState } from "react";

function SendTransaction({ setIsLoading, infoAccount, setInfoAccount }) {
  const [form] = Form.useForm();
  
  const initValues = {
    sender: infoAccount.address,
    receiver: "",
    amount: 0
  };

  const onFinish = async (values) => {
    if (values.receiver === infoAccount.address) {
      message.error("The receiver does not match the sender");
      return;
    }

    setIsLoading(true);
    const res = await MyCoinAPI.executeTrans(infoAccount.address, values.receiver, values.amount);
    setTimeout(() => {
      if (res.code === 200) {
        form.resetFields(["receiver", "amount"]);
        message.success("Send successfully !");
        setInfoAccount({
          ...infoAccount, balance: infoAccount.balance - values.amount
        });
      } else {
        message.error(res.message);
      }
      setIsLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <main className="layout-main">
      <h2>Send transaction...</h2>
      <div className="card">
        <Form
          form={form}
          name="connect_wallet"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Sender"
            name="sender"
            disabled
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Receiver"
            name="receiver"
            rules={[
              { required: true, message: "Please input your private key!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input your private key!" },
            ]}
          >
            <InputNumber addonAfter="ETH" min={0} style={{ width: 376 }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}

export default SendTransaction;
