import {useState} from 'react'

export function useModalNewRoom() {
  const [roomName, setRoomName] = useState('')

  return {roomName, setRoomName}
}
