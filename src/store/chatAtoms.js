import { atom } from 'recoil'

// Чат
export const messagesState = atom({
  key: 'messagesState',
  default: [],
})

export const isChatFetchingState = atom({
  key: 'isChatFetchingState',
  default: false,
})

export const isChatFinishedState = atom({
  key: 'isChatFinishedState',
  default: false,
})

// Состояние для отображения текста
export const typingState = atom({
  key: 'typingState',
  default: false,
})
