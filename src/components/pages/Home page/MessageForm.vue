<template>
    <form @submit.prevent="submitHandler">
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
        >
        </v-textarea>

        <div class="params" v-if="btnShowParams.showParameters">
            <h3>Записка самоуничтожится</h3>
            <v-row>
                <v-col>
                    <v-select
                            :items="itemsWhenDestroyed"
                            v-model="model"
                            outlined
                    ></v-select>
                </v-col>
                <v-col>
                    <v-checkbox
                            v-model="checkbox"
                            label="Не спрашивать подтверждение перед тем, как показать и уничтожить записку."
                    ></v-checkbox>
                </v-col>
            </v-row>
        </div>

        <div class="buttons">
            <v-btn
                    large color="#960000"
                    class="btn-create"
                    type="submit"
            >Создать записку</v-btn>
            <v-btn
                    large color="#D5D5D5"
                    class="btn-params"
                    @click="btnClickShowParams"
            >{{ btnShowParams.showParameters ? 'Отключить параметры' : 'Показать параметры' }}</v-btn>
        </div>
    </form>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "MessageForm",
        data: () => ({
            message: '',
            itemsWhenDestroyed: ['После прочтения', 'Спустя 1 час', 'Спустя 24 часа', 'Спустя 7 дней', 'Спустя 30 дней'],
            model: 'После прочтения',
            checkbox: false,
            btnShowParams: {
                label: "Показать параметры",
                showParameters: false,
            },
        }),
        validations: {
            message: {required},
        },
        methods: {
            btnClickShowParams() {
                this.btnShowParams.showParameters = !this.btnShowParams.showParameters
                this.model = 'После прочтения'
                this.checkbox = false
            },
            submitHandler() {
                this.$v.message.$touch()
                this.messageErrors()
            }
        },
        computed: {
            messageErrors() {
                const errors = []
                if (!this.$v.message.$dirty) return errors
                !this.$v.message.required && errors.push('Ошибка: текст записки пуст')
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