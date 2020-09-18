<template>
    <div>
        <Loader
                v-if="loading"
        />
        <div v-else-if="!isEmpty(message)">
            <h3>Содержание записки</h3>
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

            snackbar: {
                active: false,
                color: '',
                message: '',
            }
        }),

        mounted() {
            let path = location.pathname.split('/')
            const id = path[path.length - 1]
            this.loadData(id)
        },

        methods: {
            async loadData(id) {
                let result = await this.$store.dispatch('getMessage', id)

                if (result.success) {
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
            ...mapGetters(['getMessage'])
        }
    }
</script>

<style scoped>
    h3 {
        font-size: 26px;
        margin: 10px 0 10px 0;
    }
</style>