<template>
    <div class="page-detail">
        <div class="page-box"  :style="{ width: this.design.width+ 'px' }">
            <div class="page-info">
                <h2 class="page-info-title">{{info.title}}</h2>
                <div class="page-info-meta">
                    <!-- <a-tag>{{info.createTime | resetData}}</a-tag> -->
                </div>
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
        console.log(res)
        // if (res.code != 1) {
        //     redirect("/404")
        // }

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
    margin-top: 80px;
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
            }
            .page-info-meta{
                margin: 10px 0; 
            }
            .page-info-reward{
                margin-top: 20px;
                padding: 20px;
                border-radius: 3px;
                position: relative;
                border: 1px solid #f3f3f3;
                background: #fffcf7;
                p{
                    font-size: 20px;
                    i{
                        margin-right: 10px;
                    }
                }
            }
            .page-info-tags{
                display: flex;
                justify-content: space-between;
                align-items: center;
                /deep/ .ant-btn-link{
                    color: #8590a6;
                    padding: 0 5px;
                }
            }
        }
        .comment-box{
            margin: 20px 0;
            padding: 20px;
            background: white; 
            ul{
                li{
                    margin-bottom: 10px;
                }
            }
        }
        .page-author-box{
            margin-top: 10px;
            padding: 20px;
            background: white; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e6e6e6;
            .page-author-name{
                font-size: 15px;
                font-weight: 700;
            }
            
        }
    }
}
</style>

<style>
@import "~static/tinymce/skins/content/default/content.css";
</style>
