<template>
  <div class="overlay">
    <div id="modal">
      <div id="modalHeader">
        <div id="modalTitle">
          <slot name="title"></slot>
        </div>
        <div id="modalClose" v-if="cancellable">X</div>
      </div>
      <div id="modalBody">
        <slot name="body"></slot>
      </div>
      <div id="modalFooter">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      cancellable: { type: Boolean, required: false, default: false }
    }
}
</script>

<style>

  #modal {
    background: white;
    border-radius: 0.5em;
    padding: 1em;
    box-shadow: 0 0.5em 1em #333;
    align-self: flex-start;
    margin-top: 20vh;
  }

  #modalHeader {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: flex-start
  }
  #modalTitle{
    width: 80%;
  }
  #modalClose {
    
  }
  #modalClose:hover {
    background: red;
  }
  #modalBody {
    padding: 1em;
  }
  #modalFooter {
    padding: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

</style>