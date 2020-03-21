const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');


// const graphqlHTTP = require('express-graphql');
const expressGraphql = require('express-graphql');
const schema = require('./graphql/schema');
const { graphqlUploadExpress, GraphQLUpload } = require('graphql-upload');

const indexRouter = require('./routes/index');
const videoRouter = require('./routes/videos');


const app = express();

const {
  getVideos,
  getVideo,
  loadVideo,
  editVideoData,
  deleteVideo,
  searchVideo
} = require('./graphql/videoHandler');

const root = {
  Upload: GraphQLUpload,
  getVideos,
  getVideo,
  loadVideo,
  editVideoData,
  deleteVideo,
  searchVideo
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/video', videoRouter);
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
