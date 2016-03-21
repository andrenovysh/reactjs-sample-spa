var express = require('express');
var app = express();

var now  = new Date();
now.setHours(0,0,0,0);

var increment = (function (initial) {
	var value = initial;

	return function() {
		return value++;
	}
})(1);

var store = [{
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Coffebox',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Cafe',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Tea & Cookies',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Sunny Beach',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Hops',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Om-nom-nom',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}];

function paginate (source, offset, limit) {
	return source.slice(+offset, +offset + +limit);
}

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('build'));

app.get('/records', function (req, res) {
	console.log(req.query);

	var offset = req.query.offset;
	var limit = req.query.limit;
	var filter = req.query.filter;

	var records = store;

	if(filter != undefined) {
		records = records.filter(function(item) {
			return item.merchant && item.merchant.indexOf(filter) >= 0;
		});
	}

	var total = records.length;

	if(offset != undefined && limit != undefined) {
		records = paginate(records, offset, limit);
	}
	
	setTimeout(function() {
		res.send({ records: records, total: total });
	}, 200);
});

app.get('/records/:id', function (req, res) {
	var record = store.filter(function(item) {
		return item.id == req.params.id;
	})[0];

	setTimeout(function() {
		res.send(record);
	}, 200);
});

app.post('/records', function(req, res) {
	console.log(req.body);
	var entity = req.body;

	entity.id = increment();

	store.push(entity);

	setTimeout(function() {
		res.send(entity);
	}, 200);
})

app.post('/records/:id', function (req, res) {
	var record = store.filter(function(item) {
		return item.id == req.params.id;
	})[0];

	record.date = req.body.date;
	record.merchant = req.body.merchant;
	record.amount = req.body.amount;
	record.currency = req.body.currency;
	record.category = req.body.category;

	setTimeout(function() {
		res.send(record);
	}, 200);
});

app.delete('/records/:id', function (req, res) {
	console.log(req.params);

	var record = store.filter(function(item) {
		return item.id == req.params.id;
	})[0];

	var index = store.indexOf(record);

	store.splice(index, 1);

	res.send({});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});