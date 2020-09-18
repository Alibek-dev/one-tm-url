import axios from 'axios'

export default {
    actions: {
        async sendMessage(ctx, noteObject) {
            try {
                let res = await axios.post (
                    "http://localhost:5000/message",
                    noteObject,
                )
                const message = res.data
                ctx.commit('updateMessage', message)
                return {
                    success: true,
                }

            } catch (err) {
                console.error(err)
                console.log(err.response)
                return {
                    success: false,
                    errorMessage: 'Не удалось соединиться с сервером'
                }
            }
        },

        async deleteMessage(ctx, messageId) {
            try {
                let res = await axios.delete (
                    "http://localhost:5000/message-id/" + messageId
                )
                ctx.commit('clearState')
                return {
                    success: true,
                    responseMessage: res.data
                }
            } catch (err) {
                console.error(err)
                return {
                    success: false,
                    responseMessage: err.response.data
                }
            }
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
        },

        getStatus(state) {
            return state.message.status
        }
    },
}