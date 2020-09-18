<template>
    <v-row>
        <v-dialog
                v-model="openDialog.active"
                max-width="400px"
        >
            <v-card>
                <v-card-title> {{ openDialog.question }} </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="red darken-1"
                            text
                            @click="openDialog.active = false"
                    >Нет</v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="deleteUrl"
                    >Да</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        props: ['openDialog'],
        name: "OpenDialog",

        methods: {
            deleteUrl() {
                this.openDialog.active = false
                this.$emit('delete-message')
            }
        }
    }
</script>

<style scoped>

</style>