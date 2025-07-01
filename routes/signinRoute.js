const router = express.Router();
const signinValidator = require('../middlewares/inputValidator');

router.get('/signin', signinValidator, (req, res) => {

});

module.exports = signinRoute