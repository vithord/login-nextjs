import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from '../styles/Login.module.css'
import LoginCard from "../src/components/loginCard/loginCard"
import Input from '../src/components/loginCard/Input/Input'
import Button from '../src/components/loginCard/Button/Button'

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault()
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(formData)
        
      })
      const json = await response.json()
      if (response.status !== 200) throw new Error(json)
      
      setCookie('authorization', json)
      router.push('/')
      

    } catch (err) {
      setError(err.message)
    }

  }

  return (
    <div className={styles.background}>
      <LoginCard title="Entre na sua conta">
        <form className={styles.form} onSubmit={handleForm}>
          <Input type='email' placeholder='Insira seu e-mail'
            required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}}/>

          <Input type='password' placeholder='Entre com sua senha'
          required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}}/>

          <Button>Entrar</Button>
          {
            error && <p className={styles.error}>{error}</p>
          }
          <Link href='/cadastro'>Crie uma conta</Link>
        </form>
      </LoginCard>
    </div>
  )
}
