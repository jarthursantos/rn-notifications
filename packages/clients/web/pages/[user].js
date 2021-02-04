import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()

  const { user } = router.query

  return (
    <div>
      <span>{user}</span>
    </div>
  )
}

User.getInitialProps = ({ res }) => {
  res.statusCode = 404

  res.end()
}