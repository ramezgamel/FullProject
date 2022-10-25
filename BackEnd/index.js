const app = require('./app/src');
const port = process.env.PORT
app.listen(port, () => console.log(`http://localhost:${port}`))