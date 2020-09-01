<template>
    <div class="textarea">
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
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "Textarea",
        data: () => ({
            message: '',
        }),
        validations: {
            message: {required},
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
</style>