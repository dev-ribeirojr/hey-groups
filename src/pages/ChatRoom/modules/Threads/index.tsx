import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {ThreadsProps} from '../../useChatRoom'
import {stylesThreads} from './styles'

export function Threads({threads}: {threads: ThreadsProps[]}) {
  return (
    <FlatList
      data={threads}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity style={stylesThreads.button}>
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
