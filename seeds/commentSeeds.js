const Comment = require('../models/Comment');

const commentData = [
	{
		comment_content: 'Nice post! Eager to see more.',
		user_id: 1,
		post_id: 1,
	},
	{
		comment_content: 'Nice blog! Check out my blog too! I used this tutorial to make it.',
		user_id: 2,
		post_id: 2,
	},
	{
		comment_content: 'How do you do <insert specific thing here>?',
		user_id: 3,
		post_id: 3,
	},
	{
		comment_content: 'This FINALLY helped me understand how to use the map method on an array!',
		user_id: 4,
		post_id: 4,
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;