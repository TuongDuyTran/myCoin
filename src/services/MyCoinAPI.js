import request from "../request";

const MyCoinAPI = {};
const service = process.env.REACT_APP_URL_API + "/my-coin";

MyCoinAPI.connectWallet = (publicKey, privateKey) => {
    return request(service, "connectWallet", "POST", {
        publicKey, privateKey
    });
}

export default MyCoinAPI;