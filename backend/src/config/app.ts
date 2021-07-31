import express from 'express'
import cors from 'cors'
import queryParse from 'express-query-int'
import routes from './routes'

class App {
   public express:express.Application

   public constructor () {
     this.express = express()
     this.middlewares()
     this.routes()
   }

   private middlewares ():void {
     this.express.use(express.json())
     this.express.use(express.urlencoded({ extended: true }))
     this.express.use(cors())
     this.express.use(queryParse())
   }

   private routes (): void {
     this.express.get('/', (req, res) => {
       return res.send('Use /Api')
     })
     this.express.get('/Api', (req, res) => {
       res.json({
         Papel: {
           GET: 'Use /API/Papel',
           GETs: 'Use /API/Papel/:ID',
           POST: 'Use /API/Papel',
           PUT: 'Use /API/Papel/:ID',
           DELETE: 'Use /API/Papel/:ID',
           COUNT: 'Use /API/Papel'
         },
         Ordem: {
           GET: 'Use /API/Papel',
           GETs: 'Use /API/Papel/:ID',
           POST: 'Use /API/Papel',
           PUT: 'Use /API/Papel/:ID',
           DELETE: 'Use /API/Papel/:ID',
           COUNT: 'Use /API/Papel'
         }
       })
     })
     this.express.use((req, res, next) => {
       if (process.env.NODE_ENV.trim() !== 'test') {
         console.log('[[[ ROUTER  :::: - - >')
         console.log(' ', req.method, req.url, '@')
         console.log('         Initi ->', new Date())
         res.on('finish', () => { console.log('          Finish ->', new Date(), '< - - ::::   ]]]') })
       }
       next()
     })

     this.express.use('/Api', routes)
   }
}

export default new App().express
