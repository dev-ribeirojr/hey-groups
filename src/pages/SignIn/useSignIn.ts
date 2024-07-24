import {useState} from 'react'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'

export function useSignIn() {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [action, setAction] = useState<'signIn' | 'signUp'>('signIn')

  function handleChangeForm() {
    if (action === 'signIn') {
      setAction('signUp')
    } else {
      setAction('signIn')
    }
  }

  async function signIn() {
    if (!email || !password) {
      // dados inválidos

      return
    }

    try {
      await auth().signInWithEmailAndPassword(email, password)

      navigation.goBack()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const code = error.code

      if (code === 'auth/invalid-email') {
        console.log('email inválido')
      }
    }
  }

  async function signUp() {
    if (!name || !email || !password) {
      // dados inválidos
    }
    try {
      const snapshot = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )

      const {user} = snapshot

      await user.updateProfile({
        displayName: name,
      })

      navigation.goBack()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const code = error.code

      if (code === 'auth/email-already-in-use') {
        console.log('email em uso')
      }
      if (code === 'auth/invalid-email') {
        console.log('email inválido')
      }
    }
  }

  async function handleSubmit() {
    if (action === 'signIn') {
      await signIn()
    } else {
      await signUp()
    }
  }

  return {
    name,
    email,
    password,
    action,
    setName,
    setEmail,
    setPassword,
    handleChangeForm,
    handleSubmit,
  }
}
