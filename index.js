//Server with Express
const { response } = require('express');
let express = require('express');
let app = express();

//DB initial code
let Datastore = require('nedb');
let db = new Datastore({ filename: 'boats.db', timestampData: true });
db.loadDatabase();

//Serve files from the "public" folder
app.use(express.static('public'));

//Parse JSON data
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '25mb'
}));

//Send Data Route
app.get('/data', (request, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.json({ task: "task failed" });
        } else {
            let obj = docs;
            console.log(obj);
            res.json(obj);
        }
    });
});

//Send Messages Route
app.get('/messages', (req, res) => {
    db.find({}, (err, docs) => {
        res.send(docs);
    });
});

//Send Latest Data Route
app.get('/latest_data', (request, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.json({ task: "task failed" });
        } else {
            //1. get timestamp of all images
            let obj = docs;
            //2. compare timestamp of all images (need to sort them)
            let sort_array = obj.sort((a, b) => a.updatedAt - b.updatedAt);
            //3. return the latest image
            res.json(sort_array[sort_array.length - 1]);
        }
    });
});

//Receive Data Route
app.post('/boats', (request, res) => {
    console.log("A POST Request!");
    console.log(request.body);

    //Grab the boat
    let boatObj = request.body;
    db.insert(boatObj, (err, newDocs) => {
        if (err) {
            res.json({ task: "task failed" });
        } else {
            res.json({ task: "success" });
        }
    });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at ', port);
});

// //Initialize the express 'app' object
// let express = require('express');
// let app = express();
// app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
// let listenport = process.env.PORT || 5000;
let listenport = 5000;
server.listen(listenport, () => {
    console.log("Server listening at port: " + listenport);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

        //Send a response to all other clients, not including this one
        // socket.broadcast.emit('msg', data);

        //Send a response to just this client
        // socket.emit('msg', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});