<template>
    <div class="header">
        <a href="/privmess" ><h1>Hide message</h1></a>
        <div>Посылайте сообщения, которые будут <br> самоуничтожены после прочтения</div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    a:hover {
        color: white;
        border-bottom: 4px solid white;
    }

    .header {
        padding: 0 25% 0 25%;
        margin: 0 0 30px 0;
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
