var mongo = require('mongodb'); // set up mongodb

// creating server, DB and BSONPure Object
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

// Setting up the Local MongoDB Configuration 
var server = new Server('localhost', 27017, {auto_reconnect:true});
db = new Db('blogdb', server, {safe:true});

// Setting up the Production MongoDB Configuration
/* 
var server = new Server('Host', Port, {auto_reconnect:true});
db = new Db('DatabaseName', server, {safe:true});*/

// Connecting with the Local MongoDB and its Collections
db.open(function(err, db) {

	if(!err) {

		console.log("Connected to 'blogdb' database");

		db.collection('posts', {safe:true}, function(err, collection) {

			if(err) {

				console.log("The 'posts' collection doesn't exist.");
			}
		});
	};

});


// Connecting with the Production MongoDB and its Collections
/*
db.open(function(err, db) {
    db.authenticate('Username', 'Password', function(err, success) {
        if(!err) {

			console.log("Connected to 'Database Name' database");

			db.collection('posts', {safe:true}, function(err, collection) {

				if(err) {

					console.log("The 'posts' collection doesn't exist.");
				}
			});
		};
    });
});*/

// Fetch the document by Id
exports.findById = function(req, res) {

	var id = req.params.id;

	console.log("Retrieving post : " + id);

	db.collection('posts', function(err, collection) {

		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {

			res.send(item);
		});
	});
}

// Get All Documents from the Posts Collection
exports.findAll = function(req, res) {

	db.collection('posts', function(err, collection) {

		collection.find().toArray(function(err, items) {

			res.send(items);
		});
	});
}


// Save the new Post Model to the Posts Document
exports.addPost = function(req, res) {

	var post = req.body;

	console.log('Adding Post: ' + JSON.stringify(post));

	db.collection('posts', function(err, collection){

		collection.insert(post, {safe:true}, function(err, result) {

			if(err) {

				res.send({'error':'There is an error while inserting post detail'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}

		});

	});
}
 
 
// Update the document from the Id
exports.updatePost = function(req, res) {

	var id = req.params.id;
	var post = req.body;
	delete post._id;
	console.log('Updating post: '+ id);
	console.log(JSON.stringify(post));
	db.collection('posts', function(err, collection) {

		collection.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {

			if(err) {

				console.log('Error Updating Post:' + err);
				res.send({'error':'There is an error while updating the post detail'});

			} else {

				console.log('' + result + ' document(s) updated');
				res.send(post);
			}

		});
	});
}


// Delete the document based on Id
exports.deletePost = function(req, res) {

	var id = req.params.id;
	console.log('Deleting Post:' + id);
	db.collection('posts',function(err, collection) {

		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {

			if(err) {

				res.send({'error':'There is an error while deleting the post record -' + err});

			} else {

				console.log('' + result + ' document(s) deleted');
				res.send(req.body);

			}

		});

	});
}

