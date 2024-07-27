import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {stylesModalNewRoom} from './styles'
import {useModalNewRoom} from './useModalNewRoom'

export function ModalNewRoom({close}: {close: () => void}) {
  const {roomName, loading, setRoomName, createNewRoom} = useModalNewRoom({
    close,
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
