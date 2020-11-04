<template>
    <div class="container-fluid header">
        <div class="row justify-center text-center">
            <div class="col-md-6 col-xl-6 my-2"><a href="/" ><h1>Hide message</h1></a></div>
            <div class="col-md-6 col-xl-6 my-2"><div>Посылайте сообщения, которые будут <br> самоуничтожены после прочтения</div></div>
        </div>
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
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #960000;
    }

    .header h1 {
        color: white;
    }

    .header div {
        color: white;
    }
</style>
