<template>
  <div class="card" :class="revealed? ('type-'+type) : isSpymaster? ('text-type-'+type) : 'default-color'">
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
        revealed: Boolean,
        isSpymaster: Boolean
    }
}
</script>

<style>
.card {
    /* font-size: 24px; */
    /* width: 17%; */
    /* margin: 1%; */
    /* height: 4em; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
}

.default-color {
    background-color: #cccccc;
    color: black;
}
.type-0 {
    background-color: #dbc786;
    color: black;
}
.type-1 {
    background-color: #b32020;
    color: white;
}
.type-2 {
    background-color: #2367c0;
    color: white;
}
.type-3 {
    background-color: #000000;
    color: white;
}

.text-type-0 {
    background-color: #cccccc;
    color: black;
}
.text-type-1 {
    background-color: #e2b1b1;
    color: black;
}
.text-type-2 {
    background-color: #b6cae9;
    color: black;
}
.text-type-3 {
    background-color: #7a7a7a;
    color: white
}
</style>