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
            <div v-else>
                <div v-if="!isEmpty(message)">
                    <h3>Содержание записки</h3>
                    <p id="confirm">Эта записка удалена. Если вам нужно сохранить текст, скопируйте его перед закрытием этого окна. </p>
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

            showConfirmation: false,
        }),

        mounted() {
            let path = location.pathname.split('/')
            const id = path[path.length - 1]
            this.messageId = id
            this.loadData(id)
        },

        methods: {
            async loadData(id) {
                let result = await this.$store.dispatch('getMessage', id)
                if (result.success && !this.getExpired) {
                    this.showConfirmation = !this.getNotAskConfirmation
                    this.message = this.getMessage
                    this.loading = false
                    this.deleteURL(id)
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
                this.snackbar.message = 'Текст успешно скопировано'
                this.snackbar.color = 'success'
            },
        },

        computed: {
            ...mapGetters(['getMessage', 'getExpired', 'getNotAskConfirmation'])
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
    #confirm {
        padding: 5px;
        background-color: #F9D15F;
    }

</style>