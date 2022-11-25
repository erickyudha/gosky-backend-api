const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routers/router');
const {MORGAN_FORMAT} = require('../config/application');
const app = express();

app.use(morgan(MORGAN_FORMAT));
app.use(cors());
app.use(express.json());
module.exports = router.apply(app);
