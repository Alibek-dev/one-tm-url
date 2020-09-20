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
                return {
                    success: false,
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
        },

        async getMessage(ctx, messageId) {
            try {
                let res = await axios.get (
                    "http://localhost:5000/message-id/" + messageId
                )
                const message = res.data
                ctx.commit('updateMessage', message)
                return {
                    success: true
                }
            } catch (err) {
                console.error(err)
                return {
                    success: false
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
            return window.location.href + '/' + state.message.messageId
        },

        messageId(state) {
            return state.message.messageId
        },

        getStatus(state) {
            return state.message.status
        },

        getMessage(state) {
            return state.message
        },

        getExpired(state) {
            return state.message.expired
        },

        getNotAskConfirmation(state) {
            return state.message.notAskConfirmation
        }
    },
}