const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')
const async=require('async')
const fs = require('fs')
const coustomers = require('./Files/m3-customer-data.json')
const coustomers_adress = require ('./Files/m3-customer-address-data.json')



const url = 'mongodb://localhost:27017/Hpdatabase'
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json({limit:'1gb',extended:true}))


let limit= parseInt(process.argv[2] ,10) || 1000
            
let tasks=[]
    


mongodb.MongoClient.connect(url, (error, db) => {
  if (error) return process.exit(1)

  
    index=0
    coustomers.forEach((coustumer,index,indexvector) => {
     
        coustomers[index]=Object.assign(coustumer,coustomers_adress[index])
       
      
   
    if(index % limit ==0) {
        const start =index 
        const end = (start+limit > coustomers.length)? customers.length-1 : start+limit
        tasks.push((done) => {
        
        console.log(`Processing ${start}-${end} out of ${coustomers.length}`)
        db.collection('coustomers4').insert(coustomers.slice(start,end), (error,results) => {
        
        done(error,results)
            
        })
        
        
        
        })
    
      
   
        }
    
    
    
    
  
    
   
        
    
       })
    
    
    
    
    
    
    
   
    async.parallel(tasks, (error,results) => {
    
      if(error) console.error(error)
        
     db.close()
    
    
    })
    
    
    
})         

   
    
  

      


app.listen(3000)