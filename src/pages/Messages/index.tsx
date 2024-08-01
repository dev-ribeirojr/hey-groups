import {FlatList, SafeAreaView, Text} from 'react-native'
import {AppStackProps} from '../../routes/app.routes'
import {RouteProp} from '@react-navigation/native'
import {useMessage} from './useMessages'
import {DisplayMessages} from './modules'

type MessagesRouteProp = RouteProp<AppStackProps, 'Messages'>

export type MessagesComponentProps = {
  route: MessagesRouteProp
}

export function Messages({route}: MessagesComponentProps) {
  const {messages} = useMessage({route})

  return (
    <SafeAreaView>
      <Text>Teste</Text>
      <FlatList
        style={{width: '100%'}}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <DisplayMessages data={item} />}
      />
    </SafeAreaView>
  )
}
