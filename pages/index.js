import { getCookie } from "cookies-next"
import { validate } from "../services/user"


export default function Home() {
  return (
    <div>
      Página segura - Perfil do usuario
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', {req, res})
    if (!token) throw new Error('Token Inexistente')

    validate(token)
    return {
      props: {}
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/login' 
      },
      props: {}
    }
  }
}