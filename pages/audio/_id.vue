<template>
    <div class="audio-detail">
        <div class="audio-info" :style="{ width: design.width + 'px' }">
            <div class="audio-top">
                <div class="audio-head">
                    <h2>{{info.title}}</h2>
                    <div class="audio-cate">
                        <a-space>
                            <a-tag color="#2db7f5" v-for="(item) in info.groupList" :key="item.groupId">
                                {{item.title}}
                            </a-tag>
                            <a-tag color="blue" v-for="(item) in info.tagList" :key="item.tagId">
                                {{item.title}}
                            </a-tag>
                            <a-tag v-if="info.cateInfo != null" color="#f50">
                                {{info.cateInfo.title}}
                            </a-tag>
                        </a-space>
                    </div>
                </div>
                <a-row type="flex" align="middle" class="audio-body" :gutter="[{md:50}]" >
                    <a-col :span="5">
                        <div class="audio-cover" :style="{backgroundImage: 'url('+info.cover+')'}"></div>
                        <div class="audio-meta">
                             <span><a-icon type="star" /><span class="value">{{info.favorites | resetNum}}</span></span>
                            <span><a-icon type="eye" /><span class="value">{{info.views | resetNum}}</span></span>
                            <span><a-icon type="like" /><span class="value">{{info.likes | resetNum}}</span></span>
                        </div>
                    </a-col>
                    <a-col :span="19">
                        <div class="audio-wave">
                            <client-only>
                            <!-- <wave-surfer link="/audio/toymachine.mp3"/> -->
                            <wave-surfer :link="info.link"/>
                            </client-only>
                        </div>
                        <div class="audio-play">
                            <a-space >
                                <a-button @click="postLike(info.id)" type="link">
                                    <a-icon :theme="info.isLike ? 'filled' : 'outlined'" type="like" />
                                    {{info.isLike ? '已赞' : '赞'}} {{info.likes == 0 ? "" : info.likes | resetNum}}
                                </a-button>
                                <a-button @click="postFavorite(info.id)" type="link">
                                    <a-icon :theme="info.isFavorite ? 'filled' : 'outlined'" type="star" />
                                    {{info.isFavorite ? '已收藏' : '收藏'}} {{info.favorite == 0 ? "" : info.favorites | resetNum}}
                                </a-button>
                                <a-button @click="share" type="link" icon="share-alt">
                                    分享
                                </a-button>
                                <a-button @click="shareFeed" type="link" icon="swap-right">
                                    转发动态
                                </a-button>
                            </a-space>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="audio-bottom" >
                <a-row :gutter="[{md:20}]" >
                    <a-col :md="18" >
                       <div class="audio-comment">
                            <Comment module="audio" :relatedId="id"/>
                       </div>
                    </a-col>
                    <a-col :md="6">
                        <SidebarUserInfo :isFollow.sync="info.isFollow"  :info="info.userInfo"/>
                        <SidebarResourceList v-if="info.resourceList != null" :list="info.resourceList"/>
                    </a-col>
                </a-row>
            </div>
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
import SidebarResourceList from "@/components/sidebar/sidebarResourceList"
import WaveSurfer from '@/components/player/wavesurfer'
export default {
    components:{
        SidebarResource,
        SidebarUserInfo,
        SidebarResourceList,
        Comment,
        WaveSurfer
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
        const res = await $axios.get(api.getAudio,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }

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
    methods: {
        shareFeed(){
            this.$ShareFeed(this.info,MODULE.AUDIO)
        },
        share(){
            this.$Share(`${this.base.url}/${MODULE.AUDIO}/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        async upadteView(){
            const res = await this.$axios.get(api.getAudio,{params:{id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
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
            const res = await this.$axios.post(api.postAudioFavorite,query)
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
            const res = await this.$axios.post(api.postAudioLike,query)
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
            this.$Report(id,"audio")
        },
    },
}
</script>

<style lang="less" scoped>
.audio-detail{
    margin-top: 80px;
    display: flex;
    justify-content: center;
    min-height: 550px;
    .audio-info{
        .audio-top{
            background-color: white;
            padding: 20px;
            .audio-head{
                margin-bottom: 20px;
                .audio-user{
                    display: flex;
                    align-items: center;
                    h2{
                        font-size: 16px;
                        font-weight: 600;
                    }
                }
                h2{
                    display: flex;
                    font-size: 35px;
                    font-family: 'Muli', sans-serif;
                    font-weight: 600;
                    margin: 5px 0;
                }
                .audio-user-follow{
                   .follow{
                       cursor: pointer;
                       color: #1890ff;
                   }
                }
            }
            .audio-body{
                margin-bottom: -165px;
                .audio-cover{
                    
                    width: 100%;
                    padding-bottom: 100%;
                    background-position: center center;
                    background-size: cover;
                    border-radius: 5px;
                    margin-right: 20px;
                    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 15px 0px;
                }
                .audio-meta{
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .value{
                        margin-left: 5px;
                    }
                }
                .audio-play{
                    margin-top: 20px;
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
        .audio-bottom{
            margin-top: 160px;
            margin-bottom: 10px;
            .audio-comment{
                padding: 20px;
                background-color: white;
            }
        }
    }
    
}
</style>


