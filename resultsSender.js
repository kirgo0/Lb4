const express  = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')

const app = express()

const PORT = 3001
// let user = undefined

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/html', express.static(__dirname + '/html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

app.post('/results', (req, res) => { 
    console.log(req.body.string);
    const message = {        
        to: 'mina12@ethereal.email',
        subject: 'Your Test Results!',
        text: `Hello ${req.body.name} ${req.body.surname} ${req.body.group},
        You have just completed the test in web.quiz.com,
        Your result is: ${req.body.points}/10`
    }
    mailer(message) 
    // user = req.body 
    // res.redirect('/registration') 
})

app.get('/results', (req, res) => { 
    // res.sendFile(__dirname + '/html/testPage.html')   
    res.redirect('html/index.html')   
    // res.send(`Регистрация прошла успешно! Данные учетной записи отправлены на email: ${user.email}`) 
    // user = undefined  
})

app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/results`))