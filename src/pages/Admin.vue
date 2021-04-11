<template>
  <h1>Admin Console</h1>
  <button @click="upload()">Upload Words</button>
  &nbsp;
  <button @click="test()">Test</button>
  <Loader v-if="isLoading" />
</template>

<script>
import Loader from '../components/Loader';
import api from "../utilities/api";
// import router from '../router';
// import { db } from "../utilities/firebase";
import wordList from "../assets/wordList";

export default {
    data(){
        return {
            isLoading: false
        }
    },
    components: {Loader},
    methods: {
        async upload(){
            this.isLoading = true;
            const words = wordList.map(w => ({text: w}) );
            await api.wordBank.addMany(words);
            this.isLoading = false;
        },
        test(){
            this.isLoading = true;
            //await api.game.create("ZQWD");
            //await api.game.revealWord("ZQWD", 302922, 26);
            //router.push("/game");
            //await db.ref(`rooms/${"NVUK"}`).child("currentGameId").set(2893456);
            this.isLoading = false;
        }
    }
}
</script>

<style>

</style>