
// Initialize app
var app = new Framework7({
    cache: false,
    material: true
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    domCache: false
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
    initUDPReceiver();
});

function initUDPReceiver() {

    var socketId,
        decoder = new TextDecoder('utf-8');

    // Handle the "onReceive" event.
    var onReceive = function (info) {
        if (info.socketId !== socketId)
            return;

        console.log(new Date() + ' : ' + decoder.decode(info.data));
    };

    // Create the Socket
    chrome.sockets.udp.create({}, function (socketInfo) {
        socketId = socketInfo.socketId;
        console.log('create socket ' + socketId);
        // Setup event handler and bind socket.
        chrome.sockets.udp.onReceive.addListener(onReceive);
        chrome.sockets.udp.onReceiveError.addListener(
            function (error) {
                console.log('Recv  ERROR from socket: ', error);
                chrome.sockets.udp.close(error.socketId);
            }
        );

        chrome.sockets.udp.bind(socketId, '0.0.0.0', 11000,
            function (result) {
                if (result < 0) {
                    console.log("Error binding socket.");
                    return;
                };

                chrome.sockets.udp.joinGroup(socketId, '239.255.250.250', function (joinGroupResult) {
                    console.log('Joined to group ' + joinGroupResult);
                });
            }
        );
    });
}