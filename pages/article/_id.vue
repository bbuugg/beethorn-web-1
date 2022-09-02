<template>
    <div class="article-detail">
        <div class="article-box"  :style="{ width: this.design.width+ 'px' }">
            <a-row :gutter="[{md:12}]">
                <a-col :span="18">
                    <div class="article-info">
                        <h2 class="article-info-title">{{info.title}}</h2>
                        <div class="article-info-meta">
                            <a-tag color="#f50" v-if="info.cateInfo != null">
                                {{info.cateInfo.title}}
                            </a-tag>
                            <a-tag><a-icon type="heart" theme="filled" style="margin-right: 5px;"/><b>{{info.likes | resetNum}}</b></a-tag>
                            <a-tag><a-icon type="eye" theme="filled" style="margin-right: 5px;"/><b>{{info.views | resetNum}}</b></a-tag>
                            <a-tag>{{info.createTime | resetData}}</a-tag>
                        </div>
                        <div class="entry-content" v-html="info.content" ref='imgTooles' @click="showImg($event)"></div>

    

                        <a-divider dashed />
                        <div  class="article-info-tags">
                            <div>
                                <a-tag color="blue" v-for="(item) in info.tagList" :key="item.tagId">
                                    {{item.title}}
                                </a-tag>
                            </div>
                            <a-space >
                                <a-button @click="postLike(info.id)" type="link">
                                    <a-icon :theme="info.isLike ? 'filled' : 'outlined'" type="like" />
                                    {{info.isLike ? '已赞' : '赞'}} {{info.likes == 0 ? "" : info.likes | resetNum}}
                                </a-button>
                                <a-button @click="postFavorite(info.id)" type="link">
                                    <a-icon :theme="info.isFavorite ? 'filled' : 'outlined'" type="star" />
                                    {{info.isFavorite ? '已收藏' : '收藏'}} {{info.favorites == 0 ? "" : info.favorites | resetNum}}
                                </a-button>
                                <a-button @click="share" type="link" icon="share-alt">
                                    分享
                                </a-button>
                                <a-button @click="shareFeed" type="link" icon="swap-right">
                                    转发动态
                                </a-button>
                            </a-space>
                        </div>
                    </div>
                    <div class="comment-box">
                        <CommentList  module="article" :relatedId="id"/>
                    </div>
                </a-col>
                <a-col :span="6">
                    <SidebarUserInfo :isFollow.sync="info.isFollow"  :info="info.userInfo"/>
                    <SidebarResourceList v-if="info.resourceList != null" :list="info.resourceList"/>
                  
                    <!-- <SidbarAdv /> -->
                </a-col>
            </a-row>
        </div>
    </div>
</template>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
import {MODULE} from "@/shared/module"
import CommentList from "@/components/comment/List"
import SidebarUserInfo from "@/components/sidebar/sidebarUserInfo"

import SidbarAdv from "@/components/sidebar/sidbarAdv"
import SidebarResourceList from "@/components/sidebar/sidebarResourceList"
export default {
    components:{
        // Comment,
        CommentList,
        SidebarUserInfo,
        SidebarResourceList,
        SidbarAdv,
    },
    head () {
        return {
            title: `${this.info.title} - ${this.base.title}`,
            meta: [
                { name: 'keywords', content: this.info.title },
                { name: 'description', content: this.info.description }
            ]
        }
    },
    validate({ params }) {
        if (params.id != null && params.id != undefined && params.id != NaN) {
            return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getArticle,{params:{id:id}})
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
        ...mapState("user",["token"]),
    },
    methods: {
        shareFeed(){
            this.$ShareFeed(this.info,MODULE.ARTICLE)
        },
        share(){
            this.$Share(`${this.base.url}/${MODULE.ARTICLE}/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        showImg(e){
            if (e.target.tagName == 'IMG') {
                this.$ImgPreview(e.target.src)
            }
        },

        async postFavorite(id){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.info.isFavorite = !this.info.isFavorite
            if (this.info.isFavorite) {
                this.info.favorites =  this.info.favorites + 1
            } else {
                this.info.favorites =  this.info.favorites - 1
            }
            const query = {
                id:id
            }
            const res = await this.$axios.post(api.postArticleFavorite,query)
            if (res.code != 1) {
                 this.$message.error(
                    res.message,
                    3
                )
                if (this.info.id == id) {
                this.info.isFavorite = !this.info.isFavorite
                    if (this.info.isFavorite) {
                        this.info.favorites =  this.info.favorites + 1
                    } else {
                        this.info.favorites =  this.info.favorites - 1
                    }
                }
                return
            }
        },
        async postLike(id){
          
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.info.isLike = !this.info.isLike
            if (this.info.isLike) {
                this.info.likes =  this.info.likes + 1
            } else {
                this.info.likes =  this.info.likes - 1
            }
            const query = {
                id:id
            }
            const res = await this.$axios.post(api.postArticleLike,query)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                if (this.info.id == id) {
                this.info.isLike = !this.info.isLike
                    if (this.info.isLike) {
                        this.info.likes =  this.info.likes + 1
                    } else {
                        this.info.likes =  this.info.likes - 1
                    }
                }
                return
            }
        },
    },
}
</script>

<style lang="less" scoped>
.article-detail{
    margin-top: 80px;
    display: flex;
    justify-content: center;
    .article-box{
        min-height: 550px;
        .article-info{
            background: white;
            padding: 20px;
            .article-info-title{
                font-size: 30px;
                font-weight: 400;
                line-height: 42px;
            }
            .article-info-meta{
                margin: 10px 0; 
            }
            .article-info-reward{
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
            .article-info-tags{
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
        .article-author-box{
            margin-top: 10px;
            padding: 20px;
            background: white; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e6e6e6;
            .article-author-name{
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
