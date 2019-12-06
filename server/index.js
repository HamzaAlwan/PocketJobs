var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redirect = require('express-redirect');
var db = require('../database-mongo/index.js');
var Users = require('./Models/users');
var Jobs = require('./Models/jobs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidtor = require('express-validator');
var mongoStore = require('connect-mongo')(session);
var path = require('path');
var Msgs = require('./Models/messages')

//it generates a unique id for the session
var generateSecret = function (){
	var j, x;
	var random = ["f", "b", "C", "v", "I", "f", "N", "E", "j", "w", "i", "H", "N", "H", "z", "7", "n", "n", "a", "3", "V", "I", "Q", "J", "Q"]
	for (var i = random.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = random[i];
		random[i] = random[j];
		random[j] = x;
	}
	return random.join('');
};

var app = express();
redirect(app);

//connects the server with client side
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidtor());
app.use(session({
	secret: generateSecret(),
	saveUninitialized: false,
	resave: false,
	store:new mongoStore({mongooseConnection: mongoose.connection}),
	cookie:{maxAge: 180*60*1000}
}));

// app.use(function(req,res,next){
// 	res.locals.session=req.session;
// 	next();
// })
app.post('/messages',function(req,res){
	console.log('req ----------' ,req.body)
	Msgs.createmsg(req.body);
});
app.get('/messages',function(req,res){
	Msgs.retriveMsg(function(err,msg){
		console.log('hello from message')
		if(err){
			console.log(err)
		}else{
			res.send(msg)
		}
	});
});
app.put('/messages',function(req,res){
	console.log('index file req =======',req.body)
	Msgs.updateMsg(req.body.username,function(err,msg){
		if(err){
			console.log(err)
		}else{
			res.send(msg)
		}
	})
})

//it renders all the jobs
app.get('/jobs', function(req, res){
	Jobs.allJobs(function(err, jobs){
		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}
	});	
});
app.get('/logged', function(req, res){
	if(req.session.userName){
		res.send(true)
	}else{
		res.send(false)
	}
});
//it renders the jobs for each individual user
app.get('/userJobs', function(req, res){
	Jobs.jobByUserName({"user": req.session.userName}, function(err, job){
		if(err){
			console.log(err);
		} else {
			res.send(job);
		}
	});
});

//??
app.post('/userJob', function(req, res){
		Jobs.getUserJob(req.body.jobTitle,req.body.user, function(err, user){
		if(err){
			console.log(err);
		} else {

			res.send(user);
		}
	});
});

//it updates the user job
app.put('/updateUserJob', function(req, res){
	Jobs.updateUserJob(req.body.jobTitle,req.body.states.user,req.body.states, function(err, user){
		if(err){
			console.log(err);
		} else {
			res.send(user);
		}
	});
});

app.get('/userInfo', function(req, res){
		Users.getUserInfo(req.session.userName, function(err, user){
		if(err){
			console.log(err);
		} else {
			res.send(user);
		}
	});
});

app.get('/userI/:username', function(req, res){
		Users.getUserInfo(req.params.username, function(err, user){
		if(err){
			console.log(err);
		} else {

			res.send(user);
		}
	});
});

app.post('/postRate', function(req,res){
	var rate=req.body.rate
	var user = req.body.user
	console.log('server')
	Users.postRating(user,rate, function (err, user) {
		if (err) {
	      console.log(err)
	    } else if (!user) {
	      res.send('No user found')
	    } else {
	      user.rate.push(rate)
	      res.send(user)
	    }
	    user.save()
	})

})

//it updates the user information
app.put('/updateUser', function (req, res) {
	var query = req.session.userName;
	var updatedData = req.body;
	Users.updateUsers(query, updatedData, function(err, users){
		if(err){
			console.log(err);
		} else {
			res.send(users);
		}
	});
});

//sends the user information to the database
app.post("/signup",function(req, res){
	var user = req.body
	Users.createUsers(user, function(err, userdata){
		if(err){
			console.log(err);
		} else {
			res.send(userdata);
		}
	});
});

// destroys sessions when logout
app.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

//it checks the user information; if it already exists, it will create a session
app.post('/login', function (req, res) {
	Users.getUser(req.body.userName, req.body.password, function(err, user){
		if(err){
			res.send(err);
		} else {
			req.session.userName = user.userName;
			res.locals.login = user;
			res.locals.session = req.session;
			res.redirect('/');
		}
	});
});

//it creates a new job
app.post('/job', function(req, res){
	Jobs.createJob(req.session.userName,req.body, function(err,jobs){
		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}
	})
});

//it searches jobs by title
app.post('/someJobs', function (req, res) {
	Jobs.findSome(req.body.query, function(err, jobs){
		if(err){
			console.log(err);
		} else {
			res.send(jobs);
		}
	});
});

//it searches jobs by category
app.post('/jobCategory', function (req, res) {
	Jobs.jobsByCategory({"category":req.body.category}, function(err, job){
		if(err){
			console.log(err);
		} else {
			res.send(job);
		}
	});
});

app.post('/jobLocation', function (req, res) {
	Jobs.jobsByLocation({"location":req.body.location}, function(err, job){
		if(err){
			console.log(err);
		} else {
			res.send(job);
		}
	});
});

//?
app.delete('/delete/:jobTitle', function(req, res){
	Jobs.deleteJob(req.params.jobTitle, req.session.userName, function(err, job){
		if(err){
			console.log(err);
		} else {
			res.send(job);
		}
	});
});

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
})

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});

