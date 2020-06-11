const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.set('view engine', 'ejs')
mongoose.connect('mongodb+srv://eunho9195:dmsgh123@cluster0-trbug.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true},
function(err){
    if(err){
        console.log(err)
    } else{
        console.log('connected')
    }

})

const surveyEx = new mongoose.Schema({
    gender:String,
    animal:String,
})
const survey = mongoose.model('survey',surveyEx)



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/surveyAction', function(req,res) {
    console.log(req.query)
    const surveyModel = new survey()
    surveyModel.gender = req.query.gender;
    surveyModel.animal = req.query.animal;
    surveyModel.save()
    
    .then(()=>{
        console.log("complete")
        let arr = []
        survey.countDocuments({gender:"남", animal:"호랑이"}, (err,c)=>{
            arr.push(c);
                      
            survey.countDocuments({gender:"남", animal:"코끼리"}, (err,c)=>{
                arr.push(c);
                
                survey.countDocuments({gender:"여", animal:"호랑이"}, (err,c)=>{
                    arr.push(c);
                    
                    survey.countDocuments({gender:"여", animal:"코끼리"}, (err,c)=>{
                        arr.push(c);
                        
                        res.render('index',{survey:arr})
                    })
                })        
            })
        })
        
    })
    .catch(err =>{
        if(err){
            res.send(err)
        }
        })    
})

app.listen(3001)