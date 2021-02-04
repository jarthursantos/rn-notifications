import { useCallback, useState, useRef } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const nameInputRef = useRef(null)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const clearError = useCallback(() => setError(''), [])

  const handleSubmit = useCallback(event => {
    event.preventDefault()

    async function createAccount() {
      const { value: name } = nameInputRef.current

      setLoading(true)
      clearError()

      try {
        const response = await fetch(`https://api.github.com/users/${name}`)
        const data = await response.json()

        if (response.status === 200) {
          console.log({ data })

          router.push(`/${name}`)
        } else {
          setError(data.message)
          console.log(response.status, data.message)
        }

      } catch (error) {
        console.log({ error })
      } finally {
        setLoading(false)
      }
    }
    
    createAccount()
  }, [nameInputRef, clearError, router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create new Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        Create new Account
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.field} ${error ? styles.error : ''}`}>
          <label htmlFor="name">Account Name</label>
          <input type="text" name="name" id="name" ref={nameInputRef} onBlur={clearError} />
          {error && <span className={styles.fieldError}>{error}</span>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ?
            (
              <LoadingIndicator />
            ) : (
              <span>Create</span>
            )}
        </button>
      </form>
    </div>
  )
}

function LoadingIndicator() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
        <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}