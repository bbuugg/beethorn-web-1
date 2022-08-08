<template>
    <div class="detail">
        <div class="detail-box"  :style="{ width: design.width + 'px' }">
            <div  class="detail-box-down">
                <div class="detail-down-l">
                    <img :src="info.cover" :alt="info.title">
                </div>
                <div class="detail-down-r">
                    <h2 class="detail-title">
                    {{info.title}}
                    </h2>
                    <div class="detail-meta">
                        <div class="detail-group-box">
                            <a-tag color="#2db7f5" v-for="(item) in info.groupList" :key="item.groupId">
                                {{item.title}}
                            </a-tag>
                            <a-tag color="blue" v-for="(item) in info.tagList" :key="item.tagId">
                                {{item.title}}
                            </a-tag>
                        </div>
                        <div class="detail-date">
                            <a-tag color="#f50" v-if="info.cateInfo != null">
                                {{info.cateInfo.title}}
                            </a-tag>
                            <a-tag><a-icon type="heart" theme="filled" style="margin-right: 5px;"/><b>{{info.likes | resetNum}}</b></a-tag>
                            <a-tag><a-icon type="eye" theme="filled" style="margin-right: 5px;"/><b>{{info.views | resetNum}}</b></a-tag>
                            <a-tag>{{info.createTime | resetData}}</a-tag>
                        </div>
                    </div>
                    <ul v-if="info.attribute.length > 0" class="detail-down-att">
                        <li v-for="(item,index) in info.attribute" :key="index">
                            <span>{{item.key}}</span>
                            <span>{{item.val}}</span>
                        </li>
                    </ul>
                    <div class="detail-down-buttom">
                        
                        <div class="detail-down-buttom-shar">
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
                </div>
            </div>
            <a-row :gutter="[{md:12}]">
                <a-col :xl="18">
                    <div class="detail-info">
                        <h2 class="detail-info-desc">详细介绍</h2>
                        <div class="entry-content" v-html="info.content" ref='imgTooles' @click="showImg($event)"></div>
                    </div>
                    <div class="comment-box">
                        <Comment @upadteView="upadteView" :isView="info.isView"  module="resource" :relatedId="id"/>
                    </div>
                </a-col>
                <a-col :xl="6">
                    <SidebarUserInfo :isFollow.sync="info.isFollow"  :info="info.userInfo"/>
                    <SidebarResource module="resource" v-if="info.hasDown == 2" :info="info"/>
                   
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import api from "@/api/index"

import {MODULE} from "@/shared/module"
import Comment from "@/components/comment/List"
import SidebarResource from "@/components/sidebar/sidebarResource"
import SidebarUserInfo from "@/components/sidebar/sidebarUserInfo"
export default {
    components:{
        Comment,
        SidebarResource,
        SidebarUserInfo,
    },
    head(){
        return this.$seo(`${this.info.title}-${this.base.title}`,`${this.info.title}`,[{
            hid:"beethorn-desc",
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
        const res = await $axios.get(api.getResource,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }

        if (res.data.info.purpose != "") {
            res.data.info.purpose = JSON.parse(res.data.info.purpose)
        }
        
        if (res.data.info.attribute != "") {
            res.data.info.attribute = JSON.parse(res.data.info.attribute)
        }

        if (res.data.info.downUrl != "") {
            res.data.info.downUrl = JSON.parse(res.data.info.downUrl)
        }

       
        // this.list = [...this.list,...res.data.list]
        return {
            base:store.state.base,
            id:id,
            info:res.data.info,
        }
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    mounted(){
    },
    methods: {
        shareFeed(){
            this.$ShareFeed(this.info,MODULE.REPORT)
        },
        share(){
            this.$Share(`${this.base.url}/${MODULE.REPORT}/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        async upadteView(){
            const res = await this.$axios.get(api.getResource,{params:{id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }

            if (res.data.info.purpose != "") {
                res.data.info.purpose = JSON.parse(res.data.info.purpose)
            }
            
            if (res.data.info.attribute != "") {
                res.data.info.attribute = JSON.parse(res.data.info.attribute)
            }

            if (res.data.info.downUrl != "") {
                res.data.info.downUrl = JSON.parse(res.data.info.downUrl)
            }
            this.info = res.data.info
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
            const res = await this.$axios.post(api.postResourceFavorite,query)
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
            const res = await this.$axios.post(api.postResourceLike,query)
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
        report(id){
            this.$Report(id,"resource")
        },
    },
    
}
</script>
<style lang="less" scoped>
.detail{
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-box{
        min-height: 550px;
        .detail-box-down{
            background: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .detail-down-l{
                width: 400px;
                height: 100%;
                margin-right: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .detail-down-r{
                flex: 1;
                .detail-title{
                    font-size: 24px;
                    font-weight: 800;
                }

                .detail-meta{
                    margin-top: 10px;
                    padding: 10px;
                    background: #f9f9f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h2{
                        font-size: 14px;
                    }
                }
                .detail-down-att{
                    margin-top: 10px;
                    padding: 10px;
                    background-color: #f3f7ff;
                    border-radius: 4px;
                    li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #8c8c8c;
                        font-size: 13px;
                        line-height: 20px;
                        padding: 5px 0;
                        list-style: none;
                    }
                }
                .detail-down-buttom{
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    /deep/ .ant-btn-link{
                        color: #8590a6;
                        padding: 0 5px;
                    }
                }
            }
        }
        .detail-info{
            background: white;
            padding: 20px;
            .detail-info-desc{
                padding-bottom: 10px;
                font-size: 18px;
                font-weight: bold;
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
        .detail-sidebar{
            margin-top: 10px;
        }
    }
}
</style>

<style>
@import "~static/tinymce/skins/content/default/content.css";
</style>
