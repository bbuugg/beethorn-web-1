<template>
    <div class="video-detail">
        <div class="video-top">
            <div class="video-wap">
                <div class="video-player">
                    <div class="video-player-bg">
                        <div class="video-box-player">
                            <div id="player" ref="player" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="video-body" >
            <a-row :gutter="[{md:20}]" :style="{ width: design.width+ 'px' }">
                <a-col :md="18" >
                    <div class="video-info">
                        <h2 class="video-info-title">{{info.title}}</h2>
                        <div class="video-info-meta">
                            <div>
                                <a-tag color="#f50" v-if="info.cateInfo != null">
                                    {{info.cateInfo.title}}
                                </a-tag>
                                <a-tag><a-icon type="heart" theme="filled" style="margin-right: 5px;"/><b>{{info.likes | resetNum}}</b></a-tag>
                                <a-tag><a-icon type="eye" theme="filled" style="margin-right: 5px;"/><b>{{info.views | resetNum}}</b></a-tag>
                            </div>
                            <div>{{info.createTime | resetData}}</div>
                        </div>
                        
                        <a-divider />
                        <div class="video-info-desc">
                            <p>{{info.description}}</p>
                        </div>
                        <a-divider  />
                        
                        <div class="video-info-share">
                            <a-space >
                                <a-tag color="#2db7f5" v-for="(item) in info.groupList" :key="item.groupId">
                                    {{item.title}}
                                </a-tag>
                                <a-tag color="blue" v-for="(item) in info.tagList" :key="item.tagId">
                                    {{item.title}}
                                </a-tag>
                            </a-space>
                            
                            <a-space >
                               <a-button @click="postLike(info.id)" type="link">
                                    <a-icon :theme="info.isLike ? 'filled' : 'outlined'" type="like" />
                                    {{info.isLike ? '??????' : '???'}} {{info.likes == 0 ? "" : info.likes | resetNum}}
                                </a-button>
                                <a-button @click="postFavorite(info.id)" type="link">
                                    <a-icon :theme="info.isFavorite ? 'filled' : 'outlined'" type="star" />
                                    {{info.isFavorite ? '?????????' : '??????'}} {{info.favorites == 0 ? "" : info.favorites | resetNum}}
                                </a-button>
                                <a-button @click="share" type="link" icon="share-alt">
                                    ??????
                                </a-button>
                                <a-button @click="shareFeed" type="link" icon="swap-right">
                                    ????????????
                                </a-button>
                            </a-space>
                        </div>
                    </div>
                    <div class="comment-box">
                        <Comment @upadteView="upadteView" 
                        :isView="info.isView" 
                        module="video" :relatedId="id"/>
                    </div>
                </a-col>
                <a-col :md="6">
                    <SidebarUserInfo :isFollow.sync="info.isFollow"  :info="info.userInfo"/>
                    <SidebarResourceList v-if="info.resourceList != null" :list="info.resourceList"/>
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
import SidebarResourceList from "@/components/sidebar/sidebarResourceList"

let Player = null
if (process.client) {
    Player = require('xgplayer')
}
export default {
    components:{
        SidebarResource,
        SidebarUserInfo,
        SidebarResourceList,
        Comment,
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
            return true // ??????????????????
        }
        return false // ???????????????Nuxt.js ?????????????????????????????????????????????
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getVideo,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }
        
        return {
            base:store.state.base,
            id:id,
            info:res.data.info,
            playLink:res.data.info.link,
            playKey:0
        }
    },
    data(){
        return{
            player:null,
            // dplayer:null,
        }
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","userInfo"]),
    },
    mounted(){
        if (process.client) {
            this.player = new Player({
                id:'player',
                playbackRates: [0.7, 1.0, 1.5, 2.0], //????????????
                autoplay: false, //??????true,????????????????????????????????????
                muted: false, // ??????????????????????????????????????????
                loop: false, // ???????????????????????????????????????
                preload: 'auto', // ??????????????????<video>??????????????????????????????????????????????????????auto???????????????????????????,???????????????????????????????????????????????????
                language: 'zh-CN',
                aspectRatio: '16:9', // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? - ???????????????????????????????????????"16:9"???"4:3"???
                fluid: true, // ???true??????Video.js player?????????????????????????????????????????????????????????????????????????????????
                url: this.playLink
            });
        }
    },
    methods: {
        shareFeed(){
            this.$ShareFeed(this.info,MODULE.VIDEO)
        },
        share(){
            this.$Share(`${this.base.url}/${MODULE.VIDEO}/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },
        // ??????
        postLogin(){
            this.$Auth("login","??????","????????????")
        },
        postComment(){
            if (this.token == null) {
                this.$Auth("login","??????","????????????")
            }
        },
        async upadteView(){
            const res = await this.$axios.get(api.getVideo,{params:{id:this.id}})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }

            this.info = res.data.info
            
        },

        async postFavorite(id){
            if (this.token == null) {
                this.$Auth("login","??????","????????????")
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
            const res = await this.$axios.post(api.postVideoFavorite,query)
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
                this.$Auth("login","??????","????????????")
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
            const res = await this.$axios.post(api.postVideoLike,query)
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
            this.$Report(id,"video")
        },
    },
}
</script>
<style lang="less" scoped>
.video-detail{
    margin-top: 65px;
    // min-height: 550px;
    .video-top{
        background-color: black;
        .video-wap{
            width: 960px;
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            .video-player{
                flex: 1;
                width: 0;
                position: relative;
                .video-player-bg{
                    position: relative;
                    height: 0;
                    padding-top: 56.39925%;
                    background-color: #262626;
                    .video-box-player{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                    }
                }
            }
        }
        
    }
 
    .video-body{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        .video-info{
            background-color: white;
            padding: 20px;
            .video-info-title{
                font-size: 26px;
                font-weight: 600;
            }
            .video-info-meta{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .video-info-share{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                /deep/ .ant-btn-link{
                    color: #8590a6;
                    padding: 0 5px;
                }
            }
            .video-info-desc{
                p{
                    font-size: 14px;
                    color: #333333;
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
    }

    
}
</style>

