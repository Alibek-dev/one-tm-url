import axios from 'axios'

export default {
    actions: {
        async sendMessage(ctx, noteObject) {
             await axios.post (
                "http://localhost:5000/message",
                noteObject,
            )
                 .then((res) => {
                     const message = res.data
                     console.log(message)
                     ctx.commit('updateMessage', message)
                })
                .catch((err) => {
                    console.error(err)
                })
        }

    },
    mutations: {
        updateMessage(state, message) {
            state.message = message
        }
    },
    state: {
        message: {},
    },
    getters: {
        url(state) {
            return state.message.url
        }
    },
}