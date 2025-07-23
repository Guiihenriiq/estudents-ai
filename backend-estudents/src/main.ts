import express from 'express'
import 'dotenv/config'
import studentRoutes from './routes/students'
import { supabase } from './infra/supabaseClient'

async function testConnection() {
  const { data, error } = await supabase.from('students').select('*')
  if (error) {
    console.error('Erro ao conectar:', error.message)
  } else {
    console.log('Conexão bem-sucedida:', data)
  }
}

testConnection()
const app = express()
app.use(express.json())

app.use('/students', studentRoutes)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server running on port 3333')
})
