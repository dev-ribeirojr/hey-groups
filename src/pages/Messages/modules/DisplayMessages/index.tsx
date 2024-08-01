import {Text, View} from 'react-native'
import {MessageProps} from '../../useMessages'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {useMemo} from 'react'
import {stylesDisplayMessages} from './styles'

interface DisplayMessagesProps {
  data: MessageProps
}

export function DisplayMessages({data}: DisplayMessagesProps) {
  const user = auth().currentUser?.toJSON() as FirebaseAuthTypes.User

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user?.uid
  }, [data])

  return (
    <View style={stylesDisplayMessages.container}>
      <View
        style={[
          stylesDisplayMessages.messageBox,
          {
            backgroundColor: isMyMessage ? '#bcf8c5' : '#FFF',
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}>
        {!isMyMessage && (
          <Text style={stylesDisplayMessages.name}>
            {data?.user?.displayName}
          </Text>
        )}
        <Text style={stylesDisplayMessages.message}>
          {data?.user?.displayName}
        </Text>
        <Text>Message</Text>
      </View>
    </View>
  )
}
