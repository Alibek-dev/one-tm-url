<template>
    <div>
        <Loader
                v-if="loading"
        />

        <h3 v-else-if="getExpired">Срок записки истёк</h3>

        <div v-else>
            <div v-if="showConfirmation">
                <h3>Прочитать и уничтожить?</h3>
                <p>Вы собираетесь прочитать и уничтожить записку <i>"{{ messageId }}"</i></p>
                <v-row justify="center" align="center">
                    <v-col>
                        <v-btn
                                large
                                color="#960000"
                                class="btn-ok"
                                @click="showConfirmation = false"
                        >Да, покажите мне записку</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                                large
                                color="#D5D5D5"
                                class="btn-cancel"
                        >Нет, не сейчас</v-btn>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="!passwordSuccess && !isEmpty(message)">
                <h3>Содержание записки</h3>
                <p class="confirm">Не закрывайте и не перезагружайте эту страницу, иначе вы потеряете записку навсегда </p>
                <h3>Секретный пароль</h3>
                <v-text-field
                        label="Введите пароль для прочтения этой записки "
                        type="password"
                        outlined
                        v-model="password"
                ></v-text-field>
                <v-btn
                        large
                        color="#960000"
                        class="btn-ok"
                        @click="checkPassword()"
                >Продолжить</v-btn>
            </div>
            <div v-else>
                <div v-if="!isEmpty(message)">
                    <p class="confirm">Эта записка удалена. Если вам нужно сохранить текст, скопируйте его перед закрытием этого окна. </p>
                    <Textarea
                            :text="message.message"
                    ></Textarea>
                    <v-btn
                            class="btn-copy-url"
                            large
                            color="#F1F1F1"
                            @click="copyText"
                    >Скопировать текст записки</v-btn>
                </div>
                <h3 v-else>Записка не найдена</h3>
            </div>

        </div>
        <v-snackbar
                v-model="snackbar.active"
                :timeout="3000"
                :color="snackbar.color"
        >{{ snackbar.message }}</v-snackbar>
    </div>

</template>

<script>
    import Textarea from '../../shared/Textarea'
    import Loader from '../../shared/Loader'
    import {mapGetters} from "vuex"
    export default {
        name: "ReadMessagePage",
        components: {
            Textarea,
            Loader
        },

        data: () => ({
            loading: true,
            message: {},
            messageId: '',
            snackbar: {
                active: false,
                color: '',
                message: '',
            },
            passwordSuccess: false,
            showConfirmation: false,
            password: '',
            truePassword: '',
        }),

        mounted() {
            let path = location.pathname.split('/')
            const id = path[path.length - 1]
            this.messageId = id
            this.loadData(id)


            this.deleteURL(this.messageId)
        },

        methods: {
            async loadData(id) {
                let result = await this.$store.dispatch('getMessage', id)
                if (result.success && !this.getExpired) {
                    this.showConfirmation = !this.getNotAskConfirmation
                    this.message = this.getMessage
                    this.loading = false
                    this.truePassword = this.getPassword
                    if (this.truePassword === "" || this.truePassword === undefined) {

                        this.passwordSuccess = true
                    }
                } else {
                    this.loading = false
                }
            },

            async deleteURL(id) {
                let result = await this.$store.dispatch('deleteMessage', id)
                if (result.success) {
                    console.log('Успешно удалена')
                }
            },

            isEmpty(obj) {
                return JSON.stringify(obj) === "{}"
            },

            copyText() {
                let copyText = document.getElementById('text')
                copyText.select()
                document.execCommand('copy')

                this.snackbar.active = true
                this.snackbar.message = 'Текст успешно скопирован'
                this.snackbar.color = 'success'
            },

            checkPassword() {
                if (this.password === this.truePassword) {
                    this.passwordSuccess = true
                } else {
                    this.snackbar.active = true
                    this.snackbar.message = 'Пароль введён неверно'
                    this.snackbar.color = 'error'
                }
            }
        },

        computed: {
            ...mapGetters(['getMessage', 'getExpired', 'getNotAskConfirmation', 'getPassword'])
        }
    }
</script>

<style scoped>
    h3 {
        font-size: 26px;
        margin: 10px 0 10px 0;
    }
    .btn-ok {
        color: white;
        font-size: 14px;
        font-weight: bold;
    }
    .btn-cancel {
        font-size: 14px;
    }

    .btn-ok, .btn-cancel {
        width: 100%;
    }
    .confirm {
        font-size: 14px;
        padding: 7px;
        background-color: #F9D15F;
        border-radius: 6px;
    }

</style>