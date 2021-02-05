import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import createHttpError, { isHttpError } from 'http-errors'
import mongoose from 'mongoose'
import logger from 'morgan'

import { URL } from '../configs/mongo'
import { accountsRoutes } from './routes/accounts'

const app = express()

// mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('accounts', accountsRoutes)

app.use((_req, _res, next) =>
  next(createHttpError(404, 'Unavaliable resource'))
)

app.use(
  async (error, _req, res, next) => {
    if (isHttpError(error)) {
      console.error(error)

      return res.status(error.statusCode).json({ message: error.message })
    }

    next(error)
  }
)

export { app }
