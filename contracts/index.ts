import express from 'express'
import cors from 'cors'
import { registerUser, mintAchievement, getStudentAchievements, getUserRole } from './routes'

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
  }))
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('API is running!')
})

app.post('/register', registerUser)
app.post('/mint', mintAchievement)
app.get('/achievements/:wallet', getStudentAchievements)
app.get('/get-role/:wallet', getUserRole);



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
