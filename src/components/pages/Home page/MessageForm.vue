<template>
    <form @submit.prevent="submitHandler" class="container-fluid">
        <div class="row">
            <v-textarea
                label="Напишите ваш текст здесь..."
                clearable
                outlined
                background-color=#FFFACE
                color="black"
                auto-grow
                v-model.trim="message"
                @blur="$v.message.$touch()"
                @input="$v.message.$touch()"
                :error-messages="messageErrors"
                :counter="MAX_LENGHT_MESSAGE"
            >
            </v-textarea>
        </div>

        <div class="row">
            <div class="column" v-if="btnShowParams.showParameters">
                <h3>Записка самоуничтожится</h3>
                <div class="row align-center justify-center text-center">
                    <div class="col-md-6 col-xl-6">
                        <v-select
                            :items="dropDownMenu.dueDateItems"
                            v-model="dropDownMenu.model"
                            outlined
                        ></v-select>
                    </div>
                    <div class="col-md-6 col-xl-6">
                        <v-checkbox
                            v-model="notAskConfirmation"
                            label="Не спрашивать подтверждение перед тем, как показать и уничтожить записку."
                        ></v-checkbox>
                    </div>
                </div>
                <h3>Секретный пароль</h3>
                <div class="row align-center justify-center">
                    <div class="col-md-6 col-xl-6">
                        <v-text-field
                            label="Введите пароль для дешифрования записки"
                            type="password"
                            outlined
                            counter
                            v-model="decryptionPassword"
                            @blur="$v.decryptionPassword.$touch()"
                            @input="$v.decryptionPassword.$touch()"
                            :error-messages="decryptionPasswordErrors"
                        ></v-text-field>
                    </div>
                    <div class="col-md-6 col-xl-6">
                        <v-text-field
                            label="Повторите пароль"
                            type="password"
                            outlined
                            counter
                            v-model="secondDecryptionPassword"
                            @blur="$v.secondDecryptionPassword.$touch()"
                            @input="$v.secondDecryptionPassword.$touch()"
                            :error-messages="secondDecryptionPasswordErrors"
                        ></v-text-field>
                    </div>
                </div>
            </div>
        </div>


        <div class="buttons row">
            <v-btn
                    large
                    color="#960000"
                    class="btn-create col-md-4 col-xl-4 my-2"
                    type="submit"
            >Создать записку</v-btn>
            <v-btn
                    large
                    color="#D5D5D5"
                    class="btn-params col-md-4 col-xl-4 my-2"
                    @click="btnClickShowParams"
            >{{ btnShowParams.showParameters ? 'Отключить параметры' : 'Показать параметры' }}</v-btn>
        </div>
        <v-snackbar
                v-model="snackbar.active"
                :timeout="3000"
                :color="snackbar.color"
        >{{ snackbar.message }}</v-snackbar>
    </form>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    import {mapGetters} from "vuex"

    export default {
        name: "MessageForm",
        data: () => ({
            MAX_LENGHT_MESSAGE: 10000,
            message: '',
            decryptionPassword: '',
            secondDecryptionPassword: '',
            dropDownMenu: {
                dueDateItems: ['После прочтения', 'Спустя 1 час', 'Спустя 24 часа', 'Спустя 7 дней', 'Спустя 30 дней'],
                model: 'После прочтения',
            },
            notAskConfirmation: false,
            btnShowParams: {
                label: "Показать параметры",
                showParameters: false,
            },

            snackbar: {
                active: false,
                color: '',
                message: '',
            },

        }),
        validations: {
            message: {required, maxLength: maxLength(10000)},
            decryptionPassword: {required, minLength: minLength(3), maxLength: maxLength(30)},
            secondDecryptionPassword: {required},
        },
        methods: {
            btnClickShowParams() {
                this.btnShowParams.showParameters = !this.btnShowParams.showParameters
                this.dropDownMenu.model = 'После прочтения'
                this.notAskConfirmation = false
                this.decryptionPassword = ''
                this.secondDecryptionPassword = ''
            },
            submitHandler() {
                this.$v.message.$touch()
                this.$v.secondDecryptionPassword.$touch()

                if ([...this.messageErrors, ...this.decryptionPasswordErrors, ...this.secondDecryptionPasswordErrors].length === 0) { // this.messageErrors.length === 0
                    this.createMessage()
                } else {
                    this.snackbar = {
                        active: true,
                        color: 'error',
                        message: 'Форма не валидна'
                    }
                }
            },

            async createMessage() {
                let result = await this.$store.dispatch('sendMessage', this.sendData())

                if (result.success) {
                    this.$emit('go-over-URL', true)
                } else {
                    this.snackbar.active = true
                    this.snackbar.color = 'error'
                    this.snackbar.message = 'Не удалось соединиться с сервером'
                }
            },

            sendData() {
                let messageObject = {
                    message: this.message,
                    notAskConfirmation: this.notAskConfirmation,
                    dateToDeleteMessage: this.whenDeleteMessage()
                }
                if (!this.decryptionPasswordErrors.length && !this.secondDecryptionPasswordErrors.length) {
                    messageObject.password = this.secondDecryptionPassword
                } else {
                    messageObject.password = ''
                }
                return messageObject
            },

            whenDeleteMessage() {
                let dueDate = new Date()
                switch (this.dropDownMenu.model) {
                    case 'После прочтения':
                        return ''
                    case 'Спустя 1 час':
                        dueDate.setHours(dueDate.getHours() + 1)
                        break
                    case 'Спустя 24 часа':
                        dueDate.setDate(dueDate.getDate() + 1)
                        break
                    case 'Спустя 7 дней':
                        dueDate.setDate(dueDate.getDate() + 7)
                        break
                    case 'Спустя 30 дней':
                        dueDate.setDate(dueDate.getDate() + 30)
                        break
                }
                return new Date(dueDate).toISOString()
            }
        },
        computed: {
            ...mapGetters(['getStatus']),

            messageErrors() {
                const errors = []
                if (!this.$v.message.$dirty) return errors
                !this.$v.message.required && errors.push('Ошибка: текст записки пуст')
                !this.$v.message.maxLength && errors.push('Ошибка: текст записки превышает ' + this.MAX_LENGHT_MESSAGE + ' символов')
                return errors
            },

            decryptionPasswordErrors() {
                const errors = []
                if (!this.$v.decryptionPassword.$dirty) return errors
                !this.$v.decryptionPassword.minLength && errors.push('Ошибка: Пароль должен быть больше 3 символов')
                !this.$v.decryptionPassword.maxLength && errors.push('Ошибка: Пароль должен быть меньше 30 символов')
                return errors
            },

            secondDecryptionPasswordErrors() {
                const errors = []
                if (!this.$v.secondDecryptionPassword.$dirty) return errors
                this.secondDecryptionPassword !== this.decryptionPassword && errors.push('Ошибка: пароли не совпадают')
                return errors
            }
        }
    }
</script>

<style scoped>
    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .btn-create {
        color: white;
        font-size: 14px;
        font-weight: bold;
    }

    .btn-params {
        color: black;
        font-size: 14px;
    }
</style>
