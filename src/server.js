
const courses = require('../data/courses.json');
const reservations = require('../data/reservations.json');

const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
// app.options('http://localhost:3001', cors())
app.use(cors())

app.get('/kurzy', (req, res) => {
    res.json(courses);
});

app.get('/kurzy/:courseUrl', (req, res) => {
    console.log('kurz detail')
    const course = courses.find(course => course.url === req.params.courseUrl);
    const connectedReservations = reservations.find(reservation => reservation.url === req.params.courseUrl);
    res.send({course, reservations: connectedReservations ? connectedReservations.reservations : []});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))