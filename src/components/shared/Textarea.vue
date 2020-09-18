<template>
    <div>
        <v-textarea
                id="text"
                label="Напишите ваш текст здесь..."
                outlined
                background-color=#FFFACE
                color="black"
                :value="text"
                readonly
                auto-grow
        ></v-textarea>
    </div>
</template>

<script>
    export default {
        name: "Textarea",
        props: ['text']
    }
</script>

<style scoped>

</style>