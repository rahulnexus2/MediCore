import { useState } from 'react'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DoctorRegisterPage from '../pages/DoctorRegisterPage'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>

    <DoctorRegisterPage></DoctorRegisterPage>
    </>
  )
}

export default App
