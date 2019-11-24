const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
apiKey:'*****',
apiSecret:'****'
},{debug: true}
)


const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res)=>{
  
    const  number = req.body.number
    const text = req.body.text
    
    nexmo.message.sendSms(
        'Target', number , text , {type: 'unicode'},
        (err , responseData) => {
            if(err){
                console.log(err)
            }else{
                console.dir(responseData)
            }
        }
    )
    
})
const port = 3000

const server = app.listen(port, ()=> console.log(`Serve start on port ${port}`))