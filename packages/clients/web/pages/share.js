import { useCallback } from 'react'
import { isAndroid, isMobile } from 'react-device-detect'

import Head from 'next/head'
import ErrorPage from 'next/error'

import { api } from '../services/api'

import styles from '../styles/Account.module.css'

export default function Share({ error, account }) {
  if (error) {
    return <ErrorPage title={error.message} statusCode={error.statusCode} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Share {account.name}'s Page</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>

      <h1 className={styles.title}>This page is for {account.name}</h1>

      {isMobile ? (
        isAndroid ? (
            <ShareButton url="https://play.google.com/store/apps/details?id=com.instagram.android&hl=pt_BR">
              Download on PlayStore
            </ShareButton>
          ) : (
            <ShareButton url="https://apps.apple.com/br/app/instagram/id389801252">
              Download on AppStore
            </ShareButton>
          )
      ) : (
        <CopyButton url={account.url} />
      )}
    </div>
  )
}

const ShareButton = ({ url, children }) => {
  const handleOpen = useCallback(() => {
    open(url)
  }, [url])

  return (
    <button onClick={handleOpen} className={styles.button}>
      {children}
    </button>
  )
}

const CopyButton = ({ url }) => {
  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(url)
    } catch (error) {
      console.error(error)
    }
  }, [url])

  return (
    <button onClick={handleCopy} className={styles.button}>
      Copy Share Link
    </button>
  )
}

Share.getInitialProps = async ({ query }) => {
  const { account } = query

  try {
    const { data } = await api.get(`/accounts/${account}`)

    return { account: data }
  } catch (error) {
    const { response: { status, data } } = error

    return { error: { code: status, message: data.message } }
  }
}
