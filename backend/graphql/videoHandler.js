const fs = require('fs');
const Op = require('sequelize').Op;
const models = require('../models');
const uuid = require('uuid/v1');

const storeFileStream = ({stream, filename}) => {
	const uploadDirectory = 'files';
	const path = `${uploadDirectory}/${uuid()}-${filename}`;
	return new Promise((resolve, reject) =>
		stream
			.on('error', error => {
				if (stream.truncated)
					// delete the truncated file
					fs.unlinkSync(path);
				reject(error);
			})
			.pipe(fs.createWriteStream(path))
			.on('error', error => reject(error))
			.on('finish', () => resolve({path}))
	);
};

const getVideos = async () => {
	return models.Video.findAll({
		limit: 15
	}) || [];
};

const getVideo = async (privateKey) => {
	return models.Video.findByPk(privateKey);
};

const loadVideo = async (file, title, description) => {
	try {
		// const {title, description} = args;
		console.log('title, description: ', title, description);
		console.log('await args.file: ', await file);
		const {filename, mimetype, createReadStream} = await file;
		console.log('filename, mimetype, createReadStream: ', filename, mimetype, createReadStream, );
		const stream = createReadStream();
		const pathObj = await storeFileStream({stream, filename});
		const location = pathObj.path;
		//TODO remove video logging
		const video = await models.Video.create({
			location,
			title,
			description,
		});
		console.log('video: ', video);
		return video;
	} catch (error) {
		return error;
	}
};

const editVideoData = async (id, file, title, description) => {
	let location;
	const video = await  models.Video.findByPk(id);
	if (!video) return null;
	if (file) {
		console.log('loaded file : ', await file);
		const {filename, mimetype, createReadStream} = await file;
		const stream = createReadStream();
		const pathObj = await storeFileStream({stream, filename});
		location = pathObj.path;
		await fs.unlink(video.get('location'), (err) => err);
	}
	if (video) {
		video.update({
			location,
			title,
			description
		});
		return video;
	}
	return null;
};

const deleteVideo = async (id) => {
	const video = await  models.Video.findByPk(id);
	if (video) {
		await video.destroy({returning: true, checkExistance: true});
	}
	const error = await fs.unlink(video.get('location'), (err) => err);
	return {
		success: !error,
		error,
	};
};

const searchVideo = async (searchQuery = '') => {
	if (!searchQuery) {
		return [null];
	}
	return models.Video.findAll({
		where: {
			[Op.or]: [
				{
					title: {
						[Op.like]: `%${searchQuery}%`
					}
				},
				{
					description: {
						[Op.like]: `%${searchQuery}%`
					}
				}
			]
		}
	});
};

module.exports = {
	getVideos,
	getVideo,
	loadVideo,
	editVideoData,
	deleteVideo,
	searchVideo
};
