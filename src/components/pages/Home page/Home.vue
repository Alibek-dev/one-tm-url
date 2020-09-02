<template>
    <div>
        <FormMessage/>
        <router-link to="/template">Пример</router-link>
    </div>
</template>

<script>
    import FormMessage from "./FormMessage";
    export default {
        name: "Home",
        components: {
            FormMessage
        },
    }
</script>

<style scoped>

</style>
