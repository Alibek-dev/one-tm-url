import axios from 'axios'

export default {
    actions: {
        async sendMessage(ctx, noteObject) {
            try {
                let res = await axios.post (
                    "http://188.120.245.27:8081/message",
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
                    "http://188.120.245.27:8081/message-id/" + messageId
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
                    "http://188.120.245.27:8081/message-id/" + messageId
                )
                const message = res.data
                console.log(message)
                ctx.commit('updateMessage', message)
                if (message.status === 200) {
                    return {
                        success: true
                    }
                } else {
                    return {
                        success: false
                    }
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
            return window.location.origin + '/privmess/' + state.message.messageId
        },

        getDueDate(state) {
            return state.message.dueDate
        },

        messageId(state) {
            return state.message.messageId
        },

        getStatus(state) {
            return state.message.status
        },

        getMessage(state) {
            return state.message.text
        },

        getExpired(state) {
            return state.message.expired
        },

        getNotAskConfirmation(state) {
            return state.message.notAskConfirmation
        },

        getPassword(state) {
            return state.message.password
        }
    },
}
