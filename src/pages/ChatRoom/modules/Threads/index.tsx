import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {ChatRoomNavigationProp, ThreadsProps} from '../../useChatRoom'
import {stylesThreads} from './styles'
import {useNavigation} from '@react-navigation/native'

interface ThreadsComponentProps {
  deleteRoom: (ownerId: string, id: string) => void
  isAuthenticated: boolean
  threads: ThreadsProps[]
}

export function Threads({
  threads,
  deleteRoom,
  isAuthenticated,
}: ThreadsComponentProps) {
  const navigation = useNavigation<ChatRoomNavigationProp>()

  function openChat(item: ThreadsProps) {
    if (!isAuthenticated) {
      navigation.navigate('SignIn')
      return
    }
    navigation.navigate('Messages', {thread: item})
  }

  return (
    <FlatList
      data={threads}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          style={stylesThreads.button}
          onLongPress={() => deleteRoom(item.owner, item._id)}
          onPress={() => openChat(item)}>
          <View>
            <Text style={stylesThreads.title}>{item.name}</Text>
            <Text style={stylesThreads.description} numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}
