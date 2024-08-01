import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {ThreadsProps} from '../../useChatRoom'
import {stylesThreads} from './styles'

interface ThreadsComponentProps {
  deleteRoom: (ownerId: string, id: string) => Promise<void>
  threads: ThreadsProps[]
}

export function Threads({threads, deleteRoom}: ThreadsComponentProps) {
  return (
    <FlatList
      data={threads}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          style={stylesThreads.button}
          onLongPress={() => deleteRoom(item.owner, item._id)}>
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
