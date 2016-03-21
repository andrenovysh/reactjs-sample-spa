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
	return source.slice(offset, offset + limit);
}

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
	
  	res.send({ records: records, total: total });
});

app.delete('/records', function (req, res) {
	console.log(req.params);

	var item = store.find(function(x) {
		return x.id == req.params.id;
	});

	var index = store.indexOf(item);

	store.splice(index, 1);

	req.send();
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});