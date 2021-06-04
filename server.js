/**
 * Created by erosb on 2017.04.26..
 */
require('dotenv').config();
var fs = require('fs');
const PORT = process.env.PORT || 8282;

const app = require("./app");

var privateKey  = fs.readFileSync('sslcert/cert.key', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var httpsServer = require("https").createServer(credentials, app.app);

httpsServer.listen(PORT);

console.log("Running on http://localhost:" + PORT);
console.log("\texpected Client ID: " + app.EXPECTED_CLIENT_ID);
console.log("\texpected Client Secret: " + app.EXPECTED_CLIENT_SECRET);
console.log("\tauthorization endpoint: " + app.AUTH_REQUEST_PATH);
console.log("\taccess token endpoint: " + app.ACCESS_TOKEN_REQUEST_PATH);
console.log("\tredirect URLs: " + app.permittedRedirectURLs());

process.on("SIGTERM", function() {
  server.close(() => {
    httpsServer.exit(0);
  });
});
