<template>
  <div id="gameBoardContainer">
    <h3 style="font-weight: bold">ROOM ID: {{roomId}}</h3>
    <div id="hostButtons" v-if="isHost">
      <button @click="newGame()">New Game</button>
    </div>
    <div id="gameBoard">
      <Word :type="word.type"
            :text="word.text"
            :revealed="isSpymaster? true : word.revealed"
            v-for="word in words"
            :key="word.text"
            @click="selectWord(word)"/>
    </div>
    <div id="spymasterButtons">
      <label>
        <input type="checkbox" v-model="isSpymaster"> Spymaster
      </label>
    </div>
  </div>
</template>

<script>
import Word from "../components/Word";
import api from "../utilities/api";

export default {
  name: "Gameboard",
  components: {Word},
  data(){
    return {
      userId: null,
      roomId: null,
      gameId: null,
      isHost: false,
      words: [],
      isSpymaster: false
    }
  },
  async mounted(){
    const roomId = this.$route.params.roomId;
    const isHost = this.$route.query.isHost;
    const response = await api.game.getCurrent(roomId);
    this.roomId = roomId;
    this.gameId = response.data.currentGameId;
    this.words = response.data.gameState.words;
    this.isHost = isHost;

    this.listenForWordChange();
    this.listenForGameChange();
  },
  methods: {
    wordChanged(updatedWord){
      this.words.find(word => word.text === updatedWord.text).revealed = updatedWord.revealed;
    },
    async gameChanged(newGameId){
      this.gameId = newGameId;
      const response = await api.game.get(this.roomId, newGameId);
      this.words = response.data.gameState.words;
      
      this.listenForWordChange(false);
      this.listenForWordChange(true)
    },
    listenForWordChange(on = true){
      on ?
        api.game.onWordChange(this.roomId, this.gameId, this.wordChanged) :
        api.game.offWordChange(this.roomId, this.gameId, this.wordChanged)
    },
    listenForGameChange(on = true){
      on ?
        api.game.onGameChange(this.roomId, this.gameChanged) :
        api.game.offGameChange(this.roomId, this.gameChanged)
    },
    async selectWord(word){
      if(this.isSpymaster) return false;

      word.revealed = true;
      const index = this.words.indexOf(word);
      await api.game.revealWord(this.roomId, this.gameId, index);
    },
    async newGame(){
      await api.game.create(this.roomId);
      this.listenForWordChange(false);
      this.listenForWordChange(true);
    }
  },
  beforeUnmount(){
    this.listenForGameChange(false);
    this.listenForWordChange(false);
  }
}
</script>

<style>
#gameBoardContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#gameBoard {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  box-sizing: border-box;
  width: 40rem;
  height: 28em;
}

#hostButtons {
  margin-bottom: 1em;
}
#spymasterButtons {
  margin: 3rem 0;
}
#spymasterButtons label{
  display: flex;
  align-items: center;
}
#spymasterButtons input{
  display: inline-block;
  width: 2rem;
}

html {
  font-size: 9px;
}

@media (orientation: landscape) {
  html {
    font-size: 9px;
  }
}
@media only screen and (min-width: 540px) and (orientation: portrait){
  html {
    font-size: 12px;
  }
}
@media only screen and (min-width: 768px){
  html {
    font-size: 16px;
  }
}
@media only screen and (min-width: 960px){
  html {
    font-size: 20px;
  }
}
/* @media only screen and (min-width: 1280px){
  html {
    font-size: 22px;
  }
}
@media only screen and (min-width: 1560px){
  html {
    font-size: 24px;
  }
} */
</style>