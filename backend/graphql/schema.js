const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull
} = require('graphql');
const {GraphQLUpload, Upload} = require('graphql-upload');
const fs = require('fs');

const {
	getVideos,
	getVideo,
	loadVideo,
	editVideoData,
	deleteVideo,
	searchVideo
} = require('./videoHandler');

const VideoDeleteType = new GraphQLObjectType({
	name: 'VideoDelete',
	fields: () => ({
		success: {type: new GraphQLNonNull(GraphQLBoolean)},
		error: {type: GraphQLString},
	})
});

const VideoType = new GraphQLObjectType({
	name: 'Video',
	fields: () => ({
		id: {type: GraphQLID},
		location: {type: GraphQLString},
		title: {type: GraphQLString},
		description: {type: GraphQLString},
		preview: {type: GraphQLString},
		directory: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
	})
});


const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		video: {
			type: VideoType,
			args: {id: {type: new GraphQLNonNull(GraphQLID)}},
			resolve(parent, {id}) {
				console.log('Query video id: ', id);
				if (!id) return null;
				return getVideo(id);
			},
		},
		videos: {
			type: new GraphQLList(VideoType),
			args: {},
			async resolve(parent, args) {
				return getVideos();
			}
		},
		searchVideo: {
			type: new GraphQLList(VideoType),
			args: {searchQuery: {type: GraphQLString}},
			resolve(parent, {searchQuery}) {
				return searchVideo(searchQuery);
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		uploadVideo: {
			type: VideoType,
			args: {
				file: {
					description: 'Video file.',
					type: GraphQLUpload
				},
				title: {type: GraphQLString},
				description: {type: GraphQLString},
			},
			async resolve(parent, {file, title, description}) {
				try {
					return loadVideo({file, title, description});
				} catch (error) {
					console.log('error: ', error);
					return error;
				}
			}
		},
		uploadVideoFile: {
			type: VideoType,
			args: {
				file: {
					type: GraphQLUpload
				},
			},
			async resolve(parent, {file}) {
				try {
					console.log('resolve: ', await file);
					return {id: 1};
				} catch (error) {
					console.log('error: ', error);
					return error;
				}
			}
		},
		editVideo: {
			type: VideoType,
			args: {
				id: {type: GraphQLID},
				file: {
					type: GraphQLUpload,
					description: 'Video file.'
				},
				title: {type: GraphQLString},
				description: {type: GraphQLString},
			},
			async resolve(parent, {id, file, title, description}) {
				try {
					console.log('resolve: ', id, file, title, description);
					return editVideoData({id, file, title, description});
				} catch (error) {
					console.log('error: ', error);
					return error;
				}
			}
		},
		deleteVideo: {
			type: VideoDeleteType,
			args: {
				id: {type: GraphQLID},
			},
			async resolve(parent, {id}) {
				try {
					if (!id) return {
						success: false,
						error: "No id provided"
					};
					return deleteVideo(id);
				} catch (error) {
					console.log('deleteVideo error: ', error);
					return {
						success: false,
						error,
					};
				}
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});