import {MessagesComponentProps} from '.'
import {useEffect, useState} from 'react'
import firestore, {FieldValue} from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export interface MessageProps {
  _id: string
  createdAt: FieldValue
  text: string
  user: {
    _id: string
    displayName: string
  }
}

export function useMessage({route}: MessagesComponentProps) {
  const {thread} = route.params
  const [messages, setMessage] = useState<MessageProps[] | null>(null)

  const user = auth().currentUser?.toJSON()

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnap) => {
        const messagesDoc = querySnap.docs.map((doc) => {
          const firebaseData = doc.data()
          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          } as MessageProps

          if (firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            }
          }

          return data
        })

        setMessage(messagesDoc)
      })

    return () => unsubscribeListener()
  }, [route])

  return {messages, user}
}
