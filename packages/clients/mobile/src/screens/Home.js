import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function Home() {
  const { params } = useRoute()

  const handleSendNotification = useCallback(() => {}, [])

  if (!params || !params.account) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>No Account found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>This page is for Arthur Santos</Text>

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
