"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _expressWs = _interopRequireDefault(require("express-ws"));
var _seed = _interopRequireDefault(require("./routes/seed"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _expressWs["default"])(app);
var port;
var host;
if (process.env.NODE_ENV = 'development') {
  _dotenv["default"].config({
    path: process.cwd() + '/.env.dev'
  });
  port = process.env.PORT;
  host = process.env.HOST;
} else if (process.env.NODE_ENV = 'production') {
  _dotenv["default"].config({
    path: process.cwd() + '/.env.prod'
  });
  port = process.env.PORT;
}
app.get('/', function (req, res) {
  res.status(200).sendFile(process.cwd() + '/app/views/index.html');
});
app.use('/seed', _seed["default"]);
app.listen(port, function () {
  console.log('listening on port: ' + port);
});