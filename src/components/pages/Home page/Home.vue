<template>
    <div>
        <form action="">
            <h3>Новая записка</h3>
            <Textarea/>
            <div class="params">
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
                <v-btn large color="#960000" class="btn-create">Создать записку</v-btn>
                <v-btn large color="#D5D5D5" class="btn-params">Показать параметры</v-btn>
            </div>
        </form>
        <router-link to="/template">Пример</router-link>
    </div>
</template>

<script>
    import Textarea from "./Textarea";
    export default {
        name: "Home",
        data: () => ({
            itemsWhenDestroyed: ['После прочтения', 'Спустя 1 час', 'Спустя 24 часа', 'Спустя 7 дней', 'Спустя 30 дней'],
            model: 'После прочтения',
            checkbox: false,
        }),
        components: {
            Textarea
        },
    }
</script>

<style scoped>
    h3 {
        font-size: 26px;
        margin: 10px 0 10px 0;
    }

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

    .params-dest {
        display: flex;

    }
</style>