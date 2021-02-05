import { useCallback } from 'react'

import { isAndroid, isMobile } from 'react-device-detect'

import Head from 'next/head'
import ErrorPage from 'next/error'

import styles from '../styles/Account.module.css'

export default function Account({ error, account }) {
  if (error) {
    return <ErrorPage title={error.message} statusCode={error.statusCode} />
  }

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({ title: `Share ${account.name} account`, text: 'text', url: account.url })
    } catch (error) {
      console.log(error)
      open(account.url)
    }
  }, [account])

  return (
    <div className={styles.container}>
      <Head>
        <title>{account.name}'s Page</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={`Account page from '${account.name}'`} />
      </Head>

      <h1 className={styles.title}>This page is for {account.name}</h1>

      {isMobile && (
        <button className={styles.button} onClick={handleShare}>
          Download on {isAndroid ? 'PlayStore' : 'AppStore'}
        </button>
      )}
    </div>
  )
}

Account.getInitialProps = async ({ query }) => {
  const { account } = query

  const response = await fetch(`${process.env.SERVER_URL}/${account}`)
  const data = await response.json()

  if (response.status === 200) {
    return { account: data }
  }

  return { error: { code: response.status, message: data.message } }
}