define(['../common/socket.io',
        'sendMessage.tpl',
        'receiveMessage.tpl'
], function (io, sendMessageTpl, receiveMessageTpl) {

    var iosocket = io.connect('http://localhost:9999');

    function init() {

        iosocket.on('connect', function () {
            $('#incomingChatMessages').append($('<li>Connected</li>'));

            iosocket.on('new message', function(message) {
                var param = {
                    encodeHtml: encodeHtml,
                    dateFormat : dateFormat
                };
                $('#incomingChatMessages').append(receiveMessageTpl(message, param));
            });
            iosocket.on('user joined', function(message) {
                $('#incomingChatMessages').append($('<li></li>').text(message));
            });
            iosocket.on('disconnect', function() {
                $('#incomingChatMessages').append('<li>Disconnected</li>');
            });
        });

        $('#outgoingChatMessage').keypress(function(event) {
            if(event.which == 13) {
                event.preventDefault();
                iosocket.send($('#outgoingChatMessage').val());
                iosocket.emit("new message", $('#outgoingChatMessage').val());
                var param = {
                    encodeHtml: encodeHtml,
                    dateFormat : dateFormat
                };
                var data = {
                    message: $('#outgoingChatMessage').val(),
                    userName: "aa"
                }
                $('#incomingChatMessages').append(sendMessageTpl(data, param));
                $('#outgoingChatMessage').val('');
            }
        });
    }
    return {
        init: init
    }

});