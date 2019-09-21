<template>
  <div class="chat-main">
    <div v-if="$cometChatUser" class="header">
      <img class="avatar" :src="$cometChatUser.avatar" />
      <span>{{ $cometChatUser.name }}</span>
    </div>
    <!-- Loading Messages State -->
    <div v-if="loadingMessages" class="loading-messages">
      <spinner />
      <span class="loading-title">
        Loading Messages...
      </span>
    </div>
    <!-- End of Loading Messages State -->

    <!-- Empty State -->
    <div v-else-if="messages.length === 0" class="empty-state">
      <img class="empty-state-image" src="../assets/empty-state.svg" />
      <h2 class="empty-state-title">
        No new message?
      </h2>
      <span class="empty-state-description">
        Send your first message below.
      </span>
    </div>
    <!-- End of Empty State -->

    <!-- Has Messages State -->
    <chat-messages v-else ref="messagesContainer" :messages="messages" />
    <!-- End of Has Messages State -->

    <!-- Message Input -->
    <form class="chat-input-form" @submit.prevent="sendMessage">
      <input
        v-model="messageText"
        class="chat-input"
        type="text"
        placeholder="Type something"
        required="required"
        :disabled="sendingMessage"
      />
      <spinner
        v-if="sendingMessage"
        class="sending-message-spinner"
        :size="20"
      />
    </form>
    <!-- End of Message Input -->
  </div>
</template>
<script>
import { CometChat } from '@cometchat-pro/chat'
import Spinner from '@/components/Spinner.vue'
import ChatMessages from '@/components/ChatMessages.vue'
export default {
  components: {
    Spinner,
    ChatMessages
  },
  props: {
    activeContact: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loadingMessages: false,
      messages: [],
      messageText: '',
      sendingMessage: false
    }
  },
  watch: {
    'activeContact.id': {
      immediate: true,
      handler() {
        // this.loadMessages()
      }
    }
  },
  mounted() {
    const listenerID = 'com.auctionlance'
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          if (message.sender.uid === this.activeContact.uid) {
            this.messages.push(message)
          }
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }
      })
    )
  },
  methods: {
    sendMessage() {
      this.sendingMessage = true
      const textMessage = new CometChat.TextMessage(
        this.activeContact.uid,
        this.messageText,
        CometChat.MESSAGE_TYPE.TEXT,
        CometChat.RECEIVER_TYPE.USER
      )

      CometChat.sendMessage(textMessage)
        .then((message) => {
          this.sendingMessage = false
          this.messageText = ''
          this.messages.push(message)
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        })
        .catch((error) => {
          console.log(error)
          this.sendingMessage = false
        })
    },
    loadMessages() {
      this.loadingMessages = true
      if (this.activeContact.uid) {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(this.activeContact.uid)
          .build()
        messagesRequest
          .fetchPrevious()
          .then((messages) => {
            this.messages = messages
            this.loadingMessages = false
            this.$nextTick(() => {
              this.scrollToBottom()
            })
          })
          .catch((error) => {
            console.log('error', error)
            this.loadingMessages = false
          })
      }
    },
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer
      if (messagesContainer) {
        messagesContainer.$el.scrollTo(
          0,
          messagesContainer.$el.scrollHeight + 30
        )
      }
    }
  }
}
</script>

<style scoped style="scss">
.chat-main {
  border-left: 1px solid #bdccd7;
  background: #f8f9fb;
  border-radius: 0 6px 6px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-height: 100%;
}

.header {
  display: flex;
  align-items: center;
  background: #fffffe;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #2d313f;
  padding: 20px 25px;
  border-bottom: 1px solid #bdccd7;
  border-radius: 0 6px 0 0;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.empty-state-title {
  font-family: 'Abril Fatface', cursive;
  font-weight: normal;
  font-size: 26px;
  line-height: 35px;
  text-align: center;
  color: #1b47db;
  margin: 15px 0;
}

.empty-state-description {
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #2d313f;
  mix-blend-mode: normal;
  opacity: 0.8;
}

.chat-input-form {
  background: #ffffff;
  display: flex;
  box-shadow: 0px -1px 0px rgba(189, 204, 215, 0.544362);
}

.sending-message-spinner {
  padding: 15px;
}

.chat-input {
  width: 100%;
  background-color: #ffffff;
  border: none;
  outline: none;
  resize: none;
  border-radius: 0 0 6px 0;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #333;
  padding: 20px;
}

.chat-input::placeholder {
  color: #bbbebe;
}

.loading-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-title {
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
  font-size: 20px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
</style>
