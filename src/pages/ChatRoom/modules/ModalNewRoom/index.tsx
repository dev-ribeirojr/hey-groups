import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {stylesModalNewRoom} from './styles'
import {useModalNewRoom} from './useModalNewRoom'

export interface ModalNewRoomProps {
  close: () => void
  updateScreen: () => void
}

export function ModalNewRoom({close, updateScreen}: ModalNewRoomProps) {
  const {roomName, loading, setRoomName, createNewRoom} = useModalNewRoom({
    close,
    updateScreen,
  })

  return (
    <View style={stylesModalNewRoom.container}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={stylesModalNewRoom.modal}></View>
      </TouchableWithoutFeedback>
      <View style={stylesModalNewRoom.modalContent}>
        <Text style={stylesModalNewRoom.title}>Criar um novo Grupo?</Text>
        <TextInput
          style={stylesModalNewRoom.input}
          value={roomName}
          onChangeText={setRoomName}
          placeholder="Nome para sua sala?"
        />
        <TouchableOpacity
          disabled={loading}
          style={stylesModalNewRoom.buttonCreate}
          onPress={createNewRoom}>
          <Text style={stylesModalNewRoom.buttonText}>
            {loading ? 'Carregando' : 'Criar Sala'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
