// Initializes the `consultation` service on path `/consultation`
const createService = require('feathers-sequelize');
const createModel = require('../../models/consultation.model');
const hooks = require('./consultation.hooks.');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../../../public/images/consultations')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
  });

  var upload = multer({storage})

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/consultation', upload.single('picture'), (req, res, next) => {
    if (req.file) {
      req.feathers.file = req.file;
    }

    next();
  }, createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('consultation');

  service.hooks(hooks);
};
