// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db.js');

server.use(express.json());

// Get all users
server.get('/api/users', (req, res) => {
	User.find()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

// Get user by id
server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	User.findById(id)
		.then(data => {
			if (data) {
				res.status(200).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res
				.status(500)
				.json({ error: 'The user information could not be retrieved.' });
		});
});

// Add a new user
server.post('/api/users', (req, res) => {
  const userData = req.body;
  
	User.insert(userData)
		.then(data => {
			if (userData.name && userData.bio) {
				res.status(201).json(data);
			} else {
				res
					.status(400)
					.json({ errorMessage: 'Please provide name and bio for the user.' });
			}
		})
		.catch(error => {
			res.status(500).json({
				error: 'There was an error while saving the user to the database'
			});
		});
});

// Delete a user
server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	User.remove(id)
		.then(data => {
			if (data) {
				res.status(200).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});

// Update a user
server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
  const { userData } = req;
  
	User.update(id, userData)
		.then(data => {
			if (data) {
				if (userData.name && userData.bio) {
					res.status(200).json(data);
				} else {
					res.status(400).json({
						errorMessage: 'Please provide name and bio for the user.'
					});
				}
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res
				.status(500)
				.json({ error: 'The user information could not be modified.' });
		});
});

server.listen(3000, () => {
	console.log('listening on port 3000');
});
