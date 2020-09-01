<template>
    <div class="header">
        <h1>Private message application</h1>
        <div>Посылайте сообщения, которые будут <br> самоуничтожены после прочтения</div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header {
        padding: 0 30% 0 30%;
        margin: 0 0 50px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100px;
        background-color: #960000;
    }

    .header h1 {
        color: white;
    }

    .header div {
        color: white;
    }
</style>