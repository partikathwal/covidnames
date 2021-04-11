<template>
  <div class="card" :class="revealed? ('type-'+type) : 'default-color'">
      <span>{{text}}</span>
  </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props: {
        type: Number,
        text: String,
        revealed: Boolean
    }
}
</script>

<style>
.card {
    /* font-size: 24px; */
    /* width: 17%; */
    /* margin: 1%; */
    /* height: 4em; */
    background: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.default-color {
    background-color: #cccccc;
    color: black;
}
.type-0 {
    background-color: #eece67;
    color: black;
}
.type-1 {
    background-color: #d10000;
    color: white;
}
.type-2 {
    background-color: #0063e6;
    color: white;
}
</style>