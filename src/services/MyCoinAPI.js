import request from "../request";

const MyCoinAPI = {};
const service = process.env.REACT_APP_URL_API + "/my-coin";

MyCoinAPI.getInfo = (publicKey) => {
    return request(service, "getInfo", "POST", {
        publicKey
    });
}

MyCoinAPI.getHistory = (publicKey) => {
    return request(service, "getHistory", "POST", {
        publicKey
    });
}

MyCoinAPI.connectWallet = (publicKey, privateKey) => {
    return request(service, "connectWallet", "POST", {
        publicKey, privateKey
    });
}

MyCoinAPI.createWallet = (name, initAmount) => {
    return request(service, "createWallet", "POST", {
        name, initAmount
    });
}

MyCoinAPI.executeTrans = (senderKey, receiverKey, amount) => {
    return request(service, "executeTransaction", "POST", {
        senderKey, receiverKey, amount
    });
}

export default MyCoinAPI;