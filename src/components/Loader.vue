<template>
    <div class="overlay">
        <div id="loaderSpinner"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #loaderSpinner {
        width: 5em;
        height: 5em;
        border: 10px solid white;
        border-top-color: #7bd;
        border-radius: 100%;
        background: rgba(0, 0, 0, 0);
        animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>