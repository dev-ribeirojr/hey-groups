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
  const {roomName, setRoomName} = useModalNewRoom()

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
        <TouchableOpacity style={stylesModalNewRoom.buttonCreate}>
          <Text style={stylesModalNewRoom.buttonText}>Criar Sala</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
