var ChatController = require('./controllers/chat');

module.exports = function(router) {
    router.addRoute({
        url: '/',
        process: function(req, res) {
            var chat = new ChatController(req, res);
            chat.index();
        }
    });
    
    router.addRoute({
        url: '/chat',
        process: function(req, res) {
            var chat = new ChatController(req, res);
            chat.chatIndex();
        }
    });
    
    router.addRoute({
        url: '/chat/subscribe',
        process: function(req, res) {
            var chat = new ChatController(req, res);
            chat.subscribe();
        }
    });
    
    router.addRoute({
        url: '/chat/publish',
        process: function(req, res) {
            var chat = new ChatController(req, res);
            chat.publish();
        }
    });
};