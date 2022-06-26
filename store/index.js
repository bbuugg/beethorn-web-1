import api from "@/api/index"

export const state = () => ({
    design:{
        width:1200,
        layout:"default" //home default
    },
    base:{
        title:"",
        theme:"light"
    },
    file:{},
    pay:{},
    emojiList:[]
})

export const mutations = {
    M_UPDATE_Title: (state, title) => {
        state.base.title = title
    },
    M_UPDATE_BASE: (state, base) => {
        state.base = base
    },
    M_UPDATE_FILE: (state, file) => {
        state.file = file
    },
    M_UPDATE_PAY: (state, pay) => {
        state.pay = pay
    },
    M_UPDATE_BASE_THEME: (state, theme) => {
        state.base.theme = theme
    },
    M_UPDATE_EMOJI: (state, emoji) => {
        state.emojiList = emoji
    },
}  


export const actions = {
    async  nuxtServerInit({ commit }, { app:{$cookies,$axios} }){

        const systemInfo = await $axios.get(api.getSystemInfo)
        commit("M_UPDATE_BASE",systemInfo.data.info.base)
        commit("M_UPDATE_FILE",systemInfo.data.info.file)
        commit("M_UPDATE_PAY",systemInfo.data.info.pay)
        
        // 初始化token到里面
        let token = $cookies.get("Beethorn-token") ? $cookies.get("Beethorn-token") : null

            
        commit("user/M_UPDATE_TOKEN",token)
        if (token != null) {
            const res = await $axios.get(api.getAccountInfo)
            commit("user/M_UPDATE_USER",res.data.info)
            
            //通知消息
            const noticeRes = await $axios.get(api.getNoticeCount)
            commit("notice/M_UPDATE_HAVE_NOTICE",noticeRes.data.info)
            
            // 获取表情列表
            const emojiRes = await $axios.get(api.getSystemEmoji)
            // console.log(emojiRes)
            commit("M_UPDATE_EMOJI",emojiRes.data.list)
        }
    },
    A_UPDATE_BASE_THEME({commit},theme){
        commit('M_UPDATE_BASE_THEME', theme)
    },
}