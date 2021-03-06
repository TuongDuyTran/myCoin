import { Form, Input, Button, message } from "antd";
import MyCoinAPI from "../services/MyCoinAPI";
import { useNavigate } from 'react-router-dom';

function Connect({ setInfoAccount, setIsLoading }) {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setIsLoading(true);
        const res = await MyCoinAPI.connectWallet(values.publicKey, values.privateKey);
        setTimeout(() => {
            if (res.code === 200) {
                const data = res.data;
                localStorage.setItem("infoAccount", JSON.stringify(data));
                setInfoAccount({
                    name: data.name,
                    address: data.publicKey,
                    balance: data.amount,
                    isConnected: true
                });
                navigate("/home");
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
            <h2>Connect...</h2>
            <div className="card">
                <Form
                    name="connect_wallet"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Public key"
                        name="publicKey"
                        rules={[
                            { required: true, message: "Please input your public key!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Private key"
                        name="privateKey"
                        rules={[
                            { required: true, message: "Please input your private key!" },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
}

export default Connect;
