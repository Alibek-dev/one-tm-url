<template>
    <div>
        <div v-if="!showCreatedURL">
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
            <MessageForm
                v-on:go-over-URL="goOverURL"
            />
        </div>


        <div v-else>
            <div class="wrap">
                <h3>Ссылка на зписку готова</h3>
                <v-btn small color="#E5E5E5" class="btn-discription" @click="showDiscription = !showDiscription">?</v-btn>
            </div>
            <p v-if="showDiscription">
                Отправьте эту ссылку тому, кто должен её прочесть.
            </p>

            <v-text-field
                    id="url"
                    label="Записка самоуничтожится после прочтения"
                    outlined
                    readonly
                    background-color=#FFFACE
                    color="black"
                    :value="url"
                    @focus="$event.target.select()"

            ></v-text-field>
            <div class="buttons">
                <v-btn
                        class="btn-copy-url"
                        large
                        color="#F1F1F1"
                        @click="copyURL"
                >Скопировать ссылку</v-btn>
                <v-btn
                        class="btn-delete-url"
                        large
                        color="#F9D15F"
                        @click="confirmStatement"
                >Удалить записку сейчас</v-btn>
            </div>
        </div>

        <OpenDialog
            :openDialog="openDialog"
            v-on:delete-message="deleteURL"
        />

        <v-snackbar
                v-model="snackbar.active"
                :timeout="3000"
                :color="snackbar.color"
        >{{ snackbar.message }}</v-snackbar>
    </div>
</template>

<script>
    import MessageForm from "./MessageForm";
    import Textarea from "../../shared/Textarea";
    import OpenDialog from "../../shared/OpenDialog"

    import {mapGetters} from "vuex"
    export default {
        name: "Home",
        components: {
            MessageForm,
            Textarea,
            OpenDialog,
        },
        data: () => ({
            showDiscription: false,
            showCreatedURL: false,

            snackbar: {
                active: false,
                color: '',
                message: '',
            },

            openDialog: {
                active: false,
                question: '',
            }
        }),

        computed: {
            ...mapGetters(['url', 'messageId'])
        },

        methods: {
            goOverURL(hideForm) {
                this.showCreatedURL = hideForm
            },

            copyURL() {
                let copyText = document.getElementById('url')
                copyText.select()
                document.execCommand('copy')

                this.snackbar.active = true
                this.snackbar.message = 'Ссылка успешно скопировано'
                this.snackbar.color = 'success'
            },

            confirmStatement() {
                this.openDialog.question = 'Вы уверены, что хотите удалить записку?'
                this.openDialog.active = true
            },

            async deleteURL() {
                let result = await this.$store.dispatch('deleteMessage', this.messageId)

                if (result.success) {
                    this.snackbar.color = 'success'
                    this.snackbar.message = 'Ваша записка успешно удалена'
                    this.snackbar.active = true
                    setTimeout(function () {
                        location.reload()
                    }, 2000)

                } else {
                    this.snackbar.active = true
                    this.snackbar.color = 'error'
                    this.snackbar.message = 'Не удалось соединиться с сервером'
                }
            }
        }
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

    .btn-delete-url, .btn-copy-url {
        color: black;
        font-size: 12px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>
