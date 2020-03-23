const fs = require('fs');
const Op = require('sequelize').Op;
const models = require('../models');
const {v4: uuidv4} = require('uuid');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const rimraf = require('rimraf');


ffmpeg.setFfmpegPath(ffmpegPath);
const uploadDirectory = 'files';

const storeFileStream = ({stream, filename, directory}) => {
	const path = `${directory}/${filename}`;
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
		where: {
			deleted: false,
		},
		limit: 15,
	}) || [];
};

const getVideo = async (privateKey) => {
	return models.Video.findOne({where: {id: privateKey, deleted: false}});
};

const createFolder = async () => {
	let directoryPath = `${uploadDirectory}/${uuidv4()}`;
	while (await fs.existsSync(directoryPath)) {
		directoryPath = `${uploadDirectory}/${uuidv4()}`;
	}
	await fs.promises.mkdir(directoryPath, {recursive: true});
	return directoryPath;
};

const generateScreenShot = async ({location, filename, directory}) => {
	const fileName = `${path.parse(filename).name}.png`;
	await ffmpeg(location)
		.screenshot({
			timestamps: ['00:00:01'],
			filename: fileName,
			folder: directory,
			size: '320x240'
		});
	return `${directory}/${fileName}`;
};

const handleUploadVideo = async ({file}) => {
	const {filename, createReadStream} = await file;
	const stream = createReadStream();
	const directory = await createFolder();
	const pathObj = await storeFileStream({stream, filename, directory});
	const location = pathObj.path;
	const preview = await generateScreenShot({location, filename, directory});
	return {
		location,
		directory,
		preview
	}
};

const handleRemoveVideo = async ({directory}) => {
	try {
		await rimraf(directory, function () {
			console.log(`Video ${directory} removed`);
		});
	} catch (error) {
		return error;
	}
};

const loadVideo = async ({file, title, description}) => {
	const {location, directory, preview} = await handleUploadVideo({file});
	return await models.Video.create({
		location,
		title,
		description,
		preview,
		directory,
	});

};

const editVideoData = async ({id, file, title, description}) => {
	let prevDirectory, location, directory, preview;
	const video = await getVideo(id);
	if (!video) return null;
	if (file) {
		prevDirectory = video.get('directory');
		({location, directory, preview} = await handleUploadVideo({file}));
	}
	await video.update({
		location,
		directory,
		preview,
		title,
		description
	});
	if (prevDirectory) await handleRemoveVideo({directory: prevDirectory});
	return video;

};

const deleteVideo = async (id) => {
	const video = await getVideo(id);
	if (video) {
		await video.update({deleted: true});
		// TODO if we really want to delete video files, exec this code
		// await handleRemoveVideo({directory: video.get('directory')});
	}
	return {
		success: true,
		error: null,
	}
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
	searchVideo,
	createFolder
};
