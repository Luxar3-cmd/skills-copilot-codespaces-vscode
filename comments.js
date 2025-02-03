// Create web server
//  - Load comments from file
//  - Add a new comment to the file
//  - Serve comments to client
//  - Save comments to file
//  - Start server
//  - Listen for requests
//  - Respond to requests

// Load the comments from the file
var comments = require('./comments.json');

// Include the http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Create the server
http.createServer(function(req, res) {
    // Check the request method
    if (req.method === 'POST') {
        // Handle the post request
        var body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function() {
            var newComment = qs.parse(body);
            comments.push(newComment);

            fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
                if (err) {
                    console.log(err);
                }

                res.end();
            });
        });
    } else {
        // Serve the comments
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    }
}).listen(3000, function() {
    console.log('Server is listening on port 3000');
});