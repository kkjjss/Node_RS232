const SerialPort = require("serialport");
const readline = require('readline');

SerialPort.list().then(function(list) {
    console.log(list)
})


const comport = '/dev/tty.usbserial-1102';
const baudRate = 115200;

const port = new SerialPort(comport, {
    baudRate: baudRate,
    autoOpen: true,
    parity: "none"
}, function(err) {
    if (err) {
        return console.log('Error: ', err.message);
    } else {
        console.log('Serial port opened');
    }
}).setEncoding('utf8');


port.on('data', function(data) {
    const bitArray = [...data];
    console.log('data: ', bitArray);
});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('INPUT> ');
rl.prompt();

rl.on('line', function(line) {
        console.log("input : " + line);
        a

        const line_arr = line.split(',');
        var buff_arr = new Array();
        line_arr.forEach(element => {
            var tohex = ("0" + (Number(element).toString(16))).slice(-2).toUpperCase();
            tohex = "0x" + tohex;
            console.log("tohex : " + element + " => " + tohex);
            buff_arr.push(tohex);
        });
        console.log(buff_arr);
        // const buf1 = Buffer.allocUnsafe(5);
        // const buf = Buffer.from(buff_arr, 'base64');
        const buf = Buffer.from(buff_arr);
        console.log(buf);

        sendData(buf);
        rl.prompt();

    })
    .on('close', function() {
        console.log(input);
        process.exit();
    });

// coin data pattern : [151, 1, 1, coin_num, 156]
let coinReceiver_send_type = {
    'start': '160, 4, 5, 6, 175',
    'stop': '160, 1, 2, 3, 166',
    'insert': '151, 1, 1, 1, 156',
};


function sendData(input) {
    port.write(input, function(err) {
        if (err) {
            return console.log('Error on Write: ', err.message);
        }
    });
    console.log('전송완료');
    console.log(input);
};