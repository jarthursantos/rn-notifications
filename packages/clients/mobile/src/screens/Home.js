import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import dynamic from '@react-native-firebase/dynamic-links'

import { api } from '../service/api'
import { extractAccount } from '../utils/extract-account'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState()

  const handleSendNotification = useCallback(() => {}, [])

  useEffect(() => {
    async function getInitialLink() {
      const result = await dynamic().getInitialLink()

      if (result) {
        try {
          const { data } = await api.get(`/accounts/${extractAccount(result.url)}`)

          setAccount(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    getInitialLink()
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Loading</Text>
      </View>
    )
  }

  if (!account) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>No Account found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>This page is for {account.name}</Text>

      <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={handleSendNotification}>
        <Text style={styles.buttonLabel}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 24
  },

  name: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },

  buttonContainer: {
    backgroundColor: '#333',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase'
  }
})
