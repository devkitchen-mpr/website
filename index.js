const path = require('path')
const morgan = require('morgan')
const express = require('express')
const port = 3000

app = express()

app.use(morgan('dev'))

app.use(express.static('client'))
app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')))

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client', 'html', 'index.html'))
})

app.listen(port)

console.log('[INFO] app listening on port ' + port)