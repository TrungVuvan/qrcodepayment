let max, at_OK;
let bienx = [];
let bieny_sin = [];
let bieny_cos = [];

function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

let client = new Paho.MQTT.Client("broker.hivemq.com", 8000, makeid());

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

let options = {
    useSSL: false,
    userName: "",
    password: "",
    onSuccess: onConnect,
    onFailure: doFail
}

console.log("Connect to broker.hivemq.com:8000");

client.connect(options);
function doFail(e) {
    console.log(e);
}

function onConnect() {
    client.subscribe("Graph");
    client.subscribe("qrcodepaymenttype")
    console.log("Connected to topic Graph");
    client.subscribe("ControlLED");
    console.log("Connected to topic ControlLED");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log(message.payloadString);
    if (message.destinationName == 'Graph') {
        
    }
}

function public(topic, data) {
    message = new Paho.MQTT.Message(data);
    message.destinationName = topic;
    console.log(topic + ":" + data);
    client.send(message);
}
