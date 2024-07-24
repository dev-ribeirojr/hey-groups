import {Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {stylesChatRoom} from './styles'
import {useChatRoom} from './useChatRoom'

export function ChatRoom() {
  const {handleSignOut} = useChatRoom()

  return (
    <SafeAreaView style={stylesChatRoom.container}>
      <View style={stylesChatRoom.headerRoom}>
        <View style={stylesChatRoom.headerRoomLeft}>
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={stylesChatRoom.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
