<template>
    <div>
        <div class="wrap">
            <h3>Новая записка</h3>
            <v-btn small color="#E5E5E5" class="btn-discription" @click="showDiscription = !showDiscription">?</v-btn>
        </div>
        <p v-if="showDiscription">
            С помощью Private message appliction вы можете посылать записки, которые самоуничтожаются после того, как их прочитают.<br>
            1. Напишите записку ниже, зашифруйте её и получите ссылку.<br>
            2. Отправьте ссылку тому, кто должен прочесть записку.<br>
            3. Записка самоуничтожится после того, как её прочитают.<br><br>

            Нажав кнопку "параметры", вы можете указать пароль для дешифрования записки и установить срок её действия.
        </p>
        <MessageForm/>
        <router-link to="/template">Пример</router-link>
    </div>
</template>

<script>
    import MessageForm from "./MessageForm";
    export default {
        name: "Home",
        components: {
            MessageForm
        },
        data: () => ({
           showDiscription: false,
        }),
    }
</script>

<style scoped>
    h3 {
        font-size: 26px;
        margin: 10px 0 10px 0;
    }

    .btn-discription {
        font-size: 20px;
        font-weight: bold;
    }

    .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p {
        background-color: #EEEEEE;
        padding: 10px;
    }
</style>
