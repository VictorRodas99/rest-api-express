import employeesRoutes from './routes/employees.routes.js'
import homeRoutes from './routes/index.routes.js'
import { logger } from './middlewares/logger.js'
import express from 'express'

const app = express()

// Settings
const PORT = process.env.PORT || 8000

// Middlewares
app.use(logger)
app.use(express.json())

// Endpoints
app.use(homeRoutes)
app.use(employeesRoutes)

//Sonar qube


app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))