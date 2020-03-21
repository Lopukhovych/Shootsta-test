const express = require('express');
const router = express.Router();
const models = require('../models');
const uuid = require('uuid/v1');


const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './files/')
	},
	filename: function (req, file, cb) {
		cb(null, `${uuid()}-${file.filename}`)
	},
	preservePath: true,
});

const upload = multer({storage: storage});

router.post('/upload', upload.single("file"), async (req, res) => {
	try {
		const {title, description} = req.body;
		const file = req.file;
		const location = file.path;
		const video = await models.Video.create({
			location,
			title,
			description,
		});
		res.send(video);
	} catch (error) {
		console.log('error: ', error);
	}
});

router.put('/upload', upload.single("file"), async (req, res) => {
	try {
		const {id, title, description} = req.body;
		console.log('title, description: ', title, description);
		const file = req.file;
		let location;
		if (file) location = file.path;
		const video = await  models.Video.findByPk(id);
		if (video) {
			video.update({
				location,
				title,
				description
			});
			res.send(video);
		}
		res.send(null);

	} catch (error) {
		console.log('error: ', error);
	}
});

module.exports = router;
