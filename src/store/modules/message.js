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
        },

        async deleteMessage(ctx, messageId) {
            await axios.delete (
                "http://localhost:5000/message-id/" + messageId
            )
                .then((res) => {
                    console.log(res.data)
                    ctx.commit('clearState')
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    },
    mutations: {
        clearState(state) {
            state.message = {}
        },

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
        },

        messageId(state) {
            return state.message.messageId
        }
    },
}