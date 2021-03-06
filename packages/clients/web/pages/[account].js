import Head from 'next/head'
import ErrorPage from 'next/error'

import { api } from '../services/api'

import styles from '../styles/Account.module.css'

export default function Account({ error, account }) {
  if (error) {
    return <ErrorPage title={error.message} statusCode={error.statusCode} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{account.name}'s Page</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content={`Account page from '${account.name}'`} />
      </Head>

      <h1 className={styles.title}>This page is for {account.name}</h1>

      <a href={account.url} className={styles.button}>Share</a>
    </div>
  )
}

Account.getInitialProps = async ({ query }) => {
  const { account } = query

  try {
    const { data } = await api.get(`/accounts/${account}`)

    return { account: data }
  } catch (error) {
    const { response: { status, data } } = error

    return { error: { code: status, message: data.message } }
  }
}
