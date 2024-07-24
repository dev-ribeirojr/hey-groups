import {SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native'
import {useSignIn} from './useSignIn'
import {stylesSignIn} from './styles'

export function SignIn() {
  const {
    email,
    name,
    password,
    action,
    setEmail,
    setName,
    setPassword,
    handleChangeForm,
    handleSubmit,
  } = useSignIn()

  return (
    <SafeAreaView style={stylesSignIn.container}>
      <Text style={stylesSignIn.logo}>Hey Grupos</Text>
      <Text style={{marginBottom: 20}}>Ajude, colabore, faça networking!</Text>

      {action === 'signUp' && (
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Qual seu nome?"
          placeholderTextColor="#99999B"
          style={stylesSignIn.input}
        />
      )}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        placeholderTextColor="#99999B"
        style={stylesSignIn.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Sua senha"
        placeholderTextColor="#99999B"
        style={stylesSignIn.input}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          stylesSignIn.buttonLogin,
          {
            backgroundColor: action === 'signIn' ? '#f53745' : '#57dd86',
          },
        ]}>
        <Text style={stylesSignIn.buttonText}>
          {action === 'signIn' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangeForm}>
        <Text style={{fontWeight: 'bold'}}>
          {action === 'signIn' ? 'Criar uma conta!' : 'Ja possuo uma conta!'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
