const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

server.get('/', (req, res) => {
	res.send('Welcome To Lambda School');
});

// ---------------- COHORTS ------------------ //

server.get('/api/cohorts', (req, res) => {
	db('cohorts')
		.then(cohorts => {
			res.status(200).json(cohorts);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id/students', (req, res) => {
	db('students')
		.where({ cohort_Id: req.params.id })
		.then(students => {
			res.status(200).json(students);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/cohorts', (req, res) => {
	db('cohorts')
		.insert(req.body)
		.then(ids => {
			res.status(200).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.update(req.body)
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

// ---------------- STUDENTS ------------------ //

server.get('/api/students', (req, res) => {
	db('students')
		.then(students => {
			res.status(200).json(students);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/students/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.then(student => {
			res.status(200).json(student);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/students', (req, res) => {
	db('students')
		.insert(req.body)
		.then(ids => {
			res.status(200).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/students/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/students/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.update(req.body)
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

const port = 5000;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
