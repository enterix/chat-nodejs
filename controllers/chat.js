var clib = require('clib');
var fs = require('fs');

function Chat(req, res) {
    if(Chat.subscribers === undefined) {
        Chat.subscribers = [];
    }
    
    var logMessage = function(message) {
        var logFile = fs.createWriteStream('./log', {'flags': 'a'});
                     /*message is always less than 512 bytes,
                     so we don't worry about buffer over flow.*/
        
        logFile.end(message + "\n");
    };
    
    var sendMessages = function(body) {
        try {
            body = JSON.parse(body);
        } catch(e) {
            res.statusCode = 400;
            res.end("Bad request");
            
            return;
        }
        
        logMessage(body.message);
        console.log(Chat.subscribers.length);
        Chat.subscribers.forEach(function(res) {
            res.end(body.message);
        });
        
        Chat.subscribers = [];
    };
    
    return {
        index: function() {
            clib.sendFile('./client/index.html', res);
        },
        
        chatIndex: function() {
            clib.sendFile('./client/chat.html', res);
        },
        
        subscribe: function() {
            Chat.subscribers.push(res);
        },
        
        publish: function() {
            var body = '';
            req
                .on('readable', function() {
                    body += req.read();
                    
                    if(body.length > 512) {
                        sendMessages(body);
                        res.statusCode = 413;
                        res.end("Message is too big");
                    }
                })
                .on('end', function() {
                    sendMessages(body);
                    res.end("ok");
                });
        }
    };
}

module.exports = Chat;