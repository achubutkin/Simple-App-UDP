
const dgram = require('dgram');
const message = Buffer.from('Message from Client');
const client = dgram.createSocket('udp4');

var address = '239.255.250.250',
    port = 11000,
    data = `AMXB<-UUID=GlobalCache_000C1E024239><-SDKClass=Utility>
    <-Make=GlobalCache><-Model=iTachWF2IR><-Revision=710-1001-05>
    <-Pkg_Level=GCPK001><-Config-URL=http://192.168.1.100.<-PCB_PN=025-0026-06&gt>;
    <-Status=Ready>`; // example data from device 

setInterval(function () {
    client.send(Buffer.from(data), port, address);
}, 1000);