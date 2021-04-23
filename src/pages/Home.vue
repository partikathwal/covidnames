<template>
  <div class="overlay">
    <div class="modal" v-if="!showCreateModal">
      <form @submit.prevent="joinRoom()">
        <header style="justify-content: center;">
          COVID NAMES
        </header>
        <section>
          <input v-model="roomId" placeholder="ROOM CODE" style="margin-bottom: 0.5rem">
          <input v-model="username" placeholder="YOUR NAME">
        </section>
        <section v-if="errorText" style="color: red">
          {{errorText}}
        </section>
        <footer>
          <button @click="createRoom()" type="button">CREATE ROOM</button>
          <button type="submit" style="margin-left: 0.5rem; background: green; color: white">JOIN ROOM</button>
        </footer>
      </form>
    </div>
    <div class="modal" v-if="showCreateModal">
      <header>
        COVID NAMES
      </header>
      <section>
        <input v-model="username" placeholder="YOUR NAME">
      </section>
      <footer>
        <button @click="back()">BACK</button>
        <button @click="create()" style="margin-left: 0.5rem; background: green; color: white">CREATE</button>
      </footer>
    </div>
  </div>
</template>

<script>
import api from '../utilities/api';
import router from '../router';

export default {
  data(){
    return {
      roomId: "",
      username: "",
      showCreateModal: false,
      errorText: ""
    }
  },
  methods: {
    async joinRoom(){
      this.errorText = "";
      this.roomId = this.roomId.toUpperCase();
      this.username = this.username.toUpperCase();
      const response = await api.room.join(this.roomId, this.username);
      if(response.error){
        this.errorText = "No such room.";
        return;
      }

      const userId = response.data.userId;
      console.log(userId);
      router.push(`/${this.roomId}?uid=${userId}`);
    },
    createRoom(){
      this.errorText = "";
      this.showCreateModal = true;
    },
    async create(){
      const response = await api.room.create(this.username);
      router.push(`/${response.data.roomId}?uid=${response.data.userId}`);
    },
    back(){
      this.showCreateModal = false;
    }
  }
}
</script>

<style>
input {
  text-transform: uppercase;
}

html, body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>