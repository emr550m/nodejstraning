const express = require('express')
const app = express()
 

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => res.send('Hello From Post!'))
app.all('/all', (req, res) => res.send('Hello From All!'))
app.use('/css', express.static(__dirname + '/css'));

app.listen(8080, () => console.log("Server Ready On port 8080"));