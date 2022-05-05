import { Form, Input, Button, message, InputNumber, Table, Space } from "antd";
import MyCoinAPI from "../services/MyCoinAPI";
import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';


function Create({ setIsLoading }) {
    const [isCreated, setIsCreated] = useState(false);
    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => {
                return <Space size="middle">
                    {
                        record.key === 'publicKey' || record.key === 'privateKey' ? 
                        (<span>{shortAddress(record.value)}</span>) : 
                        (<>
                            {
                                record.key === 'amount' ?
                                (<span>{record.value + " ETH"}</span>) :
                                (<span>{record.value}</span>)
                            }
                        </>)
                    }
                </Space>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return <Space size="middle">
                    {
                        text.field === 'Private key' || text.field === 'Address' ? (<CopyToClipboard text={text.value}>
                            <a onClick={() => message.success("Copied")}>Copy</a>
                        </CopyToClipboard>) : (<></>)
                    }
                </Space>
            }
        }
    ];
    const [data, setData] = useState([
        {
            key: 'name',
            field: 'Name',
            value: ''
        },
        {
            key: 'publicKey',
            field: 'Address',
            value: ''
        },
        {
            key: 'privateKey',
            field: 'Private key',
            value: ''
        },
        {
            key: 'amount',
            field: 'Initialize amount',
            value: ''
        }
    ]);

    const shortAddress = (address) => {
        return address.slice(0, 20) + "..." + address.slice(address.length - 20);
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        const res = await MyCoinAPI.createWallet(values.name, values.initAmount);
        setTimeout(() => {
            console.log(res);
            if (res.code === 200) {
                data.forEach(item => {
                    Object.keys(res.data).forEach(key => {
                        if (key === item.key) {
                            item.value = res.data[key];
                        }
                    });
                })
                setData(data);
                setIsCreated(true);
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
            <h2>Create...</h2>
            <div className="card">
                {
                    !isCreated ? (<Form
                        name="create_wallet"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: "Please input your name!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Initialize amount"
                            name="initAmount"
                            rules={[
                                { required: true, message: "Please input your amount!" },
                            ]}
                        >
                            <InputNumber addonAfter="ETH" min={0} style={{ width: 376 }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>) : (
                        <>
                            <h2>Create successfully</h2>
                            <Table columns={columns} dataSource={data} pagination={false} />
                        </>
                    )
                }

            </div>
        </main>
    );
}

export default Create;
