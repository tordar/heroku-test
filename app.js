const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/static', express.static('public'))
app.set('view engine', 'pug')

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')

app.use(mainRoutes)
app.use('/cards', cardRoutes)

app.use((req, res, next) => {
    const err = new Error('The page was not found')
    err.status = 404;
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    res.render('error')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})