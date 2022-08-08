<template>
    <div class="video-detail">
        <div class="video-top">
            <div class="video-wap" :style="{ width: `${design.width}px` }">
                <div class="video-player" >
                    <div class="video-player-bg">
                        <div class="video-box-player">
                            <div  id="player" ref="player"></div>
                        </div>
                    </div>
                </div>
                <div  class="video-count">
                    <div class="video-count-des">
                        <h2>课程章节</h2>
                        <span>共<b>{{info.section.length}}</b>节</span>
                    </div>
                    <ul>
                        <li  
                            v-for="(item,index) in info.section"
                            :key="index"
                            :class="playSectionKey == item.title ? 'picked': ''" >
                            <div class="video-count-title-r">
                                <!-- <a-icon v-if="playKey == index" type="caret-right" /> -->
                                <a-icon type="caret-right" />
                                <span>{{item.title}}</span>
                            </div>
                            <ul>
                                <li 
                                    v-for="(jitem,jindex) in item.children"
                                    :key="jindex"
                                    @click="play(jitem)"
                                    :class="playClassKey == jitem.title ? 'picked': ''">
                                    <div class="video-count-title-r">
                                        <!-- <a-icon v-if="playKey == index" type="caret-right" /> -->
                                        <a-icon type="play-circle" />
                                        <span class="video-count-title-r">
                                            {{jitem.title}}
                                        </span>
                                        <a-tag v-if="jitem.isWatch" color="#f50">
                                            试听
                                        </a-tag>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="video-body" >
            <div class="video-info-box">
                <div class="video-info" :style="{ width: `${design.width}px` }">
                    <div class="video-info-cate">
                        <a-space >
                            <a-tag color="#f50" v-if="info.cateInfo != null">
                                {{info.cateInfo.title}}
                            </a-tag>
                            <a-tag color="#2db7f5" v-for="(item) in info.groupList" :key="item.groupId">
                                {{item.title}}
                            </a-tag>
                            <a-tag color="blue" v-for="(item) in info.tagList" :key="item.tagId">
                                {{item.title}}
                            </a-tag>
                        </a-space>
                        <a-space >
                            <a-tag><a-icon type="team" style="margin-right: 5px;"/><b>报名人数： {{info.max}}</b></a-tag>
                            <a-tag><a-icon type="team" style="margin-right: 5px;"/><b>已报名： {{info.joins | resetNum}}</b></a-tag>
                            <a-tag><a-icon type="clock-circle" theme="filled" style="margin-right: 5px;"/><b>{{info.createTime | resetData}}</b></a-tag>
                            <a-tag><a-icon type="eye" theme="filled" style="margin-right: 5px;"/><b>{{info.views | resetNum}}</b></a-tag>
                            <a-tag color="#108ee9">
                                {{info.type == 1 ? '线下' : '线上'}}
                            </a-tag>
                        </a-space>
                    </div>
                    <h2 class="video-info-title">
                        {{info.title}}
                    </h2>
                    <div class="video-bm">
                        <div class="video-bm-l">
                            <a-space>
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
                        
                        <a-button class="video-bm-r" v-if="!info.isJoin" @click="join(info.id)" size="large"  type="primary">
                            报名加入
                        </a-button>
                    </div>
                    <ul class="video-info-menu">
                        <li @click="changeKey(1)" :class="menuKey == 1 ? 'picked':''">课程介绍</li>
                        <li @click="changeKey(2)" :class="menuKey == 2 ? 'picked':''">交流讨论</li>
                    </ul>
                </div>
            </div>
            <div class="video-content" >
                <div :style="{ width: design.width+ 'px' }">
                    <a-row :gutter="[{md:20}]">
                        <a-col :md="18" >
                            <div v-if="menuKey == 1" class="video-content-box">
                                <div v-html="info.content"></div>
                            </div>
                            <div v-if="menuKey == 2" class="video-content-box">
                                <Comment   module="edu" :relatedId="id"/>
                            </div>
                        </a-col>
                        <a-col :md="6">
                            <SidebarUserInfo :isFollow.sync="info.isFollow"  :info="info.userInfo"/>
                            <SidebarHotEdu/>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
import SidebarUserInfo from "@/components/sidebar/sidebarUserInfo"
import SidebarHotEdu from "@/components/sidebar/sidebarHotEdu"
import Comment from "@/components/comment/List"

import {MODULE} from "@/shared/module"
import {ORDERTYPE} from "@/shared/order"


let Player = null
if (process.client) {
    Player = require('xgplayer')
}

export default {
    filters: {

    },
    components:{
        SidebarUserInfo,
        SidebarHotEdu,
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
            return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    async asyncData({params,$axios,redirect,store}){
    
        const id = parseInt(params.id)
        const res = await $axios.get(api.getEdu,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }

        if (res.data.info.section != "") {
            res.data.info.section = JSON.parse(res.data.info.section)
            res.data.info.section = res.data.info.section.reverse()
        }
        return {
            base:store.state.base,
            id:id,
            info:res.data.info,
            playLink:null,
            playClassKey:null,
            playSectionKey:null
        }
    },
    data(){
        return{
            ORDERTYPE,
            MODULE,
            player:null,
            menuKey:1,
        }
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    mounted(){
        if (process.client) {
            this.player = new Player({
                id:'player',
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                url: "",
                height:600,
                width: this.design.width - 300,
            });
        }
    },
    methods: {
        shareFeed(){
            this.$ShareFeed(this.info,MODULE.EDU)
        },
        share(){
            this.$Share(`${this.base.url}/course/${this.info.id}`,this.info.title,this.info.description,this.info.cover)
        },

        changeKey(e){
            this.menuKey = e
        },

        play(i){
            // console.log(this.info.type)
            if (!i.isWatch && !this.info.isJoin) {
                this.$message.error(
                    "请先报名加入",
                    3
                )
                return
            }

            if (i.link != "" && i.link != null) {
                this.playClassKey = i.title
                this.playLink = i.link
                this.player.start(this.playLink)
                this.player.play()
            }
        },
        // 登录
        async getContentData(){
            const res = await this.$axios.get(api.getEdu,{params: {id:this.id}}) 
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }

            if (res.data.info.section != "") {
                res.data.info.section = JSON.parse(res.data.info.section)
                res.data.info.section = res.data.info.section.reverse()
            }
            
            this.info = res.data.info
        },
        async join(id){
            

            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            
            if (this.info.isJoin) {
                this.$message.error(
                    "你已经报名加入该课程了",
                    3
                )
                return
            }

            if (!this.info.isPay && this.info.joinMode == 2) {
                const product = {
                    authorId:this.info.userInfo.id,
                    detailId:this.id,
                    detailModule:MODULE.EDU,
                    orderMoney:this.info.price,
                    orderType: ORDERTYPE.JOINCOURSE,
                    orderMode: 1,
                }
                this.$Pay("加入付费课程",product).then(async (res)=>{
                    if (res) {
                        this.$JoinEdu(this.id).then((res)=>{
                            if (res) {
                                    this.info.isJoin = !this.info.isJoin
                                if (this.info.isJoin) {
                                    this.info.joins = this.info.joins + 1
                                } else {
                                    this.info.joins = this.info.joins - 1
                                }
                            }
                        }).catch((err)=>{
                            console.log(err,"err")
                        })
                        this.getContentData()
                    }
                }).catch((err)=>{
                    console.log(err)
                })

                return
            }


            this.$JoinEdu(this.id).then((res)=>{
                if (res) {
                        this.info.isJoin = !this.info.isJoin
                    if (this.info.isJoin) {
                        this.info.joins = this.info.joins + 1
                    } else {
                        this.info.joins = this.info.joins - 1
                    }
                }
            }).catch((err)=>{
                console.log(err,"err")
            })
            this.getContentData()
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
            const res = await this.$axios.post(api.postEduFavorite,query)
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
            const res = await this.$axios.post(api.postEduLike,query)
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
            this.$Report(id,"edu")
        },
    },
}
</script>

<style lang="less" scoped>
.video-detail{
    margin-top: 65px;
    min-height: 550px;
    .video-top{
        display: flex;
        justify-content: center;
        align-content: center;
        background-color: black;
       
        .video-wap{
            display: flex;
            .video-player{
                flex: 1;
                .video-player-bg{
                    background-color: #262626;
                    .video-box-player{
                        width: 100%;
                        // max-height: 450px;
                    }
                }
            }
            .video-count{
                // max-height: 450px;
                width: 300px;
                margin-left: 20px;
                margin-bottom: 20px;
                .video-count-des{
                    color: #fff;
                    display: flex;
                    align-items: center;
                    padding: 20px 0 10px 5px;
                    h2{
                        font-size: 16px;
                        color: #fff;
                    }
                    span{
                        font-size: 12px;
                        margin-left: 10px;
                        color: #999;
                    }
                }
                ul{
                    color: #fff;
                    padding: 10px;
                    overflow-y: auto;
                    height: calc(100% - 52px);
                    background-color: #282828;
                    li{
                        padding: 5px;
                        .video-count-title-r{
                            margin-right: 10px;
                        }
                        cursor: pointer;
                    }
                    .picked{
                        background-color: #3c3c3c;
                    }
                }    
            }
        }
        
    }
 
    .video-body{
        .video-info-box{
            display: flex;
            justify-content: center;
            background: white;
            padding: 20px 0;
            .video-info{
                .video-info-cate{
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .video-info-title{
                    font-size: 24px;
                    margin-bottom: 10px;
                } 
                .video-bm{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                    .video-bm-l{
                        /deep/ .ant-btn-link{
                            color: #8590a6;
                            padding: 0 5px;
                        }
                    }
                    .video-bm-r{
                        /deep/ .ant-btn{
                            color: #623A0C!important;
                            text-align: center;
                            background-image: linear-gradient(
                            -135deg
                            , #FBE8A8 0%, #F8E7AC 15%, #E2C078 100%);
                            border: 0;
                            transition: none!important;
                            height: 37px;
                            border-radius: 3px;
                            display: block;
                        }
                    }

                    
                }
                .video-info-menu{
                    margin-top: 10px;
                    display: flex;
                    li{
                        font-size: 18px;
                        margin-right: 40px;
                        color: #666;
                        cursor: pointer;
                    }
                    .picked{
                        color: #8224e3!important;
                        font-weight: 700;
                    }
                }
            }
        }
        .video-content{
            display: flex;
            justify-content: center;
            margin: 20px;
            .video-content-box{
                padding: 20px;
                background: white;
            }
        }
       
    }

    
}
</style>


<style>
@import "~static/tinymce/skins/content/default/content.css";
</style>
