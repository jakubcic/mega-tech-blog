const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({
			attributes: { exclude: ['password'] },
		});

		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			attributes: { exclude: ['password'] },
			include: [
				{
					model: Post,
					attributes: ['id', 'title', 'post_content', 'created_at'],
				},
				{
					model: Comment,
					attributes: ['id', 'comment_content', 'created_at'],
					include: {
						model: Post,
						attributes: ['title'],
					},
				},
			],
		});

		if (!userData) {
			res.json(404).json({ message: 'No user found with this id' });
			return;
		}

		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/users
router.post('/', async (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.loggedIn = true;

			res.json(userData);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/users/login
router.post('/login', async (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	try {
		const userData = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!userData) {
			res.status(400).json({ message: 'Incorrect username or password, please try again' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect username or password, please try again' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.loggedIn = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/users/logout
router.post('/logout', async (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
	// expects {username: 'user', password: 'password1234'}
	try {
		const userData = await User.update(req.body, {
			individualHooks: true,
			where: {
				id: req.params.id,
			},
		});

		if (!userData[0]) {
			res.status(404).json({ message: 'No user found with this id' });
			return;
		}

		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
	try {
		const userData = await User.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!userData) {
			res.status(404).json({ message: 'No user found with this id' });
			return;
		}

		res.json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;