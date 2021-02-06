import admin from 'firebase-admin'
import axios from 'axios'

import serviceAccount from '../../serviceAccount.json'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

export async function notify() {
  admin.messaging().sendToTopic('all', {
    notification: {
      title: 'Title test',
      body: 'Body test'
    }
  })
}

export async function createShareURL(url) {
  try {
    const { data } = await axios.post(`${process.env.FIREBASE_ENDPOINT}?key=${process.env.API_KEY}`, {
      dynamicLinkInfo: {
        domainUriPrefix: process.env.BASE_DYNAMIC_LINK,
        link: url,
        androidInfo: {
          androidPackageName: "com.mobile",
          androidFallbackLink: process.env.ANDROID_APP_PAGE
        },
        iosInfo: {
          iosBundleId: "com.mobile",
          iosFallbackLink: process.env.IOS_APP_PAGE
        },
        socialMetaTagInfo: {
          socialTitle: "Check my app!",
          socialDescription: "Stydying MERN stack"
        }
      }
    })

    return data.shortLink
  } catch (error) {
    console.error(error)

    return undefined
  }
}
