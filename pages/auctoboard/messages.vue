<template>
  <div class="chat-container">
    <chat-sidebar
      :contacts="contacts"
      :active-contact-id="activeContactUid"
      @select-contact="setActiveContactUid"
    />
    <chat-main :activeContact="activeContact" />
  </div>
</template>

<script>
import Vue from 'vue'
import CometChat from '~/plugins/cometChat'
import ChatSidebar from '@/components/ChatSidebar.vue'
import ChatMain from '@/components/ChatMain.vue'
export default {
  components: {
    ChatSidebar,
    ChatMain
  },
  data() {
    return {
      loggedIn: false,
      contacts: [],
      activeContactUid: null
    }
  },
  computed: {
    activeContact() {
      return this.contacts.find((user) => user.uid === this.activeContactUid)
    }
  },
  mounted() {
    this.loadCurrentUser()
    this.loadContacts()
  },
  methods: {
    loadCurrentUser() {
      CometChat.getLoggedinUser()
        .then((user) => {
          this.loggedIn = true
          const { uid, name, avatar } = user
          Vue.prototype.$cometChatUser = {
            uid,
            name,
            avatar
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadContacts() {
      const usersRequest = new CometChat.UsersRequestBuilder()
        .setLimit(5)
        .build()
      usersRequest
        .fetchNext()
        .then((usersList) => {
          this.contacts = usersList.map((user) => ({
            uid: user.uid,
            name: user.uid,
            avatar: user.avatar,
            isOnline: user.status === 'online'
          }))
          this.activeContactUid = this.contacts[0].uid
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setActiveContactUid(uid) {
      this.activeContactUid = uid
    }
  }
}
</script>

<style scoped lang="scss">
.chat-page {
  background-image: url(../../assets/chat-background.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  min-height: 100%;
}
.chat-container {
  background: #fffffe;
  box-shadow: 0px 2px 36px rgba(45, 49, 63, 0.357436);
  border-radius: 6px;
  margin: 50px auto 50px;
  max-width: 800px;
  width: calc(100% - 20px);
  height: 500px;
  min-height: 500px;
  display: flex;
  justify-content: space-between;
}

.chat-sidebar {
  width: 240px;
}
.chat-main {
  flex: 1;
}
@media (max-width: 635px) {
  .chat-sidebar {
    width: 90px;
  }
}
</style>
