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
    // const message = {        
    //     to: req.body.email,
    //     subject: 'Congratulations! You are successfully registred on our site',
    //     text: `Поздравляем, Вы успешно зарегистрировались на нашем сайте!
        
    //     данные вашей учетной записи:
    //     login: ${localStorage.getItem("lasttry")}
    //     password: ${req.body.pass}
        
    //     Данное письмо не требует ответа.`
    // }
    // mailer(message) 
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