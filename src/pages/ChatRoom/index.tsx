import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {stylesChatRoom} from './styles'
import {useChatRoom} from './useChatRoom'
import {FabButton} from '../../components'
import {ModalNewRoom, Threads} from './modules'

export function ChatRoom() {
  const {
    handleSignOut,
    handleVisibleModal,
    handleModalOrRedirect,
    handleUpdateScreen,
    isVisibleModal,
    loadingThreads,
    threads,
    user,
  } = useChatRoom()

  if (loadingThreads) {
    return <ActivityIndicator size="large" color="#555" />
  }

  return (
    <SafeAreaView style={stylesChatRoom.container}>
      <View style={stylesChatRoom.headerRoom}>
        <View style={stylesChatRoom.headerRoomLeft}>
          {user && (
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <Text style={stylesChatRoom.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FabButton onPress={handleModalOrRedirect} />
      {threads && <Threads threads={threads} />}
      <Modal visible={isVisibleModal} animationType="fade" transparent={true}>
        <ModalNewRoom
          close={() => handleVisibleModal('close')}
          updateScreen={handleUpdateScreen}
        />
      </Modal>
    </SafeAreaView>
  )
}
