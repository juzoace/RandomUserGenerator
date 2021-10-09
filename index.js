const app = require("./app");
const config = require("./config");
const PORT = config.port
// const logger = require('./logger');
// app.use(logger('dev'));
app.listen(PORT, ()=>
// logger.info(`Server started and running on port http${PORT}`)
console.log(`Server running on port ${PORT}`)
);
