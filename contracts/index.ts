import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { registerUser, mintAchievement, getStudentAchievements, getUserRole, generateProfile, getUserName, getAllStudents } from './routes'

const app = express()
const upload = multer()

app.use(cors({
    origin: 'http://localhost:3000',
  }))
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('API is running!')
})

app.post('/register', registerUser)
app.get('/achievements/:wallet', getStudentAchievements)
app.get('/generate-profile/:wallet', generateProfile)
app.get('/get-role/:wallet', getUserRole);
app.get('/get-name/:wallet', getUserName);
app.post('/mint', upload.single('image'), mintAchievement)
app.get('/students', getAllStudents)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
