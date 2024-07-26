import {Modal, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {stylesChatRoom} from './styles'
import {useChatRoom} from './useChatRoom'
import {FabButton} from '../../components'
import {ModalNewRoom} from './modules'

export function ChatRoom() {
  const {handleSignOut, handleVisibleModal, isVisibleModal} = useChatRoom()

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
      <FabButton onPress={() => handleVisibleModal('open')} />

      <Modal visible={isVisibleModal} animationType="fade" transparent={true}>
        <ModalNewRoom close={() => handleVisibleModal('close')} />
      </Modal>
    </SafeAreaView>
  )
}
