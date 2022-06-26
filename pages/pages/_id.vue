<template>
    <div class="page-detail">
        <div class="page-box"  :style="{ width: design.width - 300 + 'px' }">
            <div class="page-info">
                <h2 class="page-info-title">{{info.title}}</h2>
                <div class="entry-content" v-html="info.content" ref='imgTooles'></div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    head(){
        return this.$seo(`${this.info.title}-${this.base.title}`,`${this.info.title}`,[{
            hid:"fiber-desc",
            name:"description",
            content:`${this.info.description}`
        }])
    },
    validate({ params }) {
        if (params.id != null && params.id != undefined && params.id != NaN) {
            return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getPageInfo,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }

        return {
            base:store.state.base,
            id:id,
            info:res.data.info,
        }
    },
    computed:{
        ...mapState(["design"]),
    },
}
</script>

<style lang="less" scoped>
.page-detail{
    margin: 80px 0;
    display: flex;
    justify-content: center;
    .page-box{
        min-height: 550px;
        .page-info{
            background: white;
            padding: 20px;
            .page-info-title{
                font-size: 30px;
                font-weight: 400;
                line-height: 42px;
                margin-bottom: 20px;
            }
        }
    }
}
</style>

<style>
@import "~static/tinymce/skins/content/default/content.css";
</style>
