import styles from './loginCard.module.css'
import Input from './Input/input'
export default function LoginCard({ title, children }) {
  return (
     <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
     </div>
  )
}
