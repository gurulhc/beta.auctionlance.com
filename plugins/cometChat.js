/* eslint-disable no-console */
import { CometChat } from '@cometchat-pro/chat'
CometChat.init(process.env.Comet_Chat_App_ID)
  .then(() => {
    console.log('CometChat was initialized successfully!')
  })
  .catch(() => {
    console.log('An error occured while initializing CometChat')
  })
export default CometChat
