<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width+ 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="18">
                    <div class="box">
                        <h2>我的圈子</h2>
                        <a-row v-if="token != null" :gutter="[{md:20},{md:20}]">
                            <a-col v-for="(item,index) in myGroupList" :key="index" class="item" :span="6">
                                <div class="group-cover">
                                    <div class="cover-wrap"></div>
                                    <img :src="item.cover" :alt="item.title">
                                </div>
                                <div class="group-info">
                                    <div class="group-title">
                                        <nuxt-link :to="`/group/${item.id}`">
                                            {{item.title}}
                                        </nuxt-link>
                                    </div>
                                    <p>{{item.description}}</p>
                                    <div class="statistics">话题 {{item.contents |resetNum}} · 成员 {{item.joins |resetNum}}</div>
                                </div>
                            </a-col>
                        </a-row>
                        <a-result v-if="token == null" sub-title="立即登录，查看我的圈子">
                            <template #icon>
                                <svg t="1635421646363" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2589" width="120" height="120"><path d="M320 725.333333h384l42.666667 234.666667H277.333333z" fill="#333549" p-id="2590"></path><path d="M337.813333 746.666667l-34.922666 192h418.218666l-34.922666-192z" fill="#B9BECA" p-id="2591"></path><path d="M106.666667 85.333333h810.666666a64 64 0 0 1 64 64v618.666667a64 64 0 0 1-64 64H106.666667a64 64 0 0 1-64-64V149.333333a64 64 0 0 1 64-64z" fill="#333549" p-id="2592"></path><path d="M106.666667 106.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v618.666667a42.666667 42.666667 0 0 0 42.666667 42.666667h810.666666a42.666667 42.666667 0 0 0 42.666667-42.666667V149.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H106.666667z" fill="#B9BECA" p-id="2593"></path><path d="M480 725.333333h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64z" fill="#333549" p-id="2594"></path><path d="M480 746.666667a10.666667 10.666667 0 1 0 0 21.333333h64a10.666667 10.666667 0 1 0 0-21.333333h-64z" fill="#FFEEB4" p-id="2595"></path><path d="M213.333333 896h597.333334a42.666667 42.666667 0 1 1 0 85.333333H213.333333a42.666667 42.666667 0 1 1 0-85.333333z" fill="#333549" p-id="2596"></path><path d="M213.333333 917.333333a21.333333 21.333333 0 0 0 0 42.666667h597.333334a21.333333 21.333333 0 0 0 0-42.666667H213.333333z" fill="#B9BECA" p-id="2597"></path><path d="M128 128h768a42.666667 42.666667 0 0 1 42.666667 42.666667v490.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#333549" p-id="2598"></path><path d="M128 149.333333a21.333333 21.333333 0 0 0-21.333333 21.333334v490.666666a21.333333 21.333333 0 0 0 21.333333 21.333334h768a21.333333 21.333333 0 0 0 21.333333-21.333334V170.666667a21.333333 21.333333 0 0 0-21.333333-21.333334H128z" fill="#FFFFFF" p-id="2599"></path><path d="M213.333333 213.333333h597.333334a42.666667 42.666667 0 0 1 42.666666 42.666667v320a42.666667 42.666667 0 0 1-42.666666 42.666667H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V256a42.666667 42.666667 0 0 1 42.666666-42.666667z" fill="#333549" p-id="2600"></path><path d="M213.333333 234.666667a21.333333 21.333333 0 0 0-21.333333 21.333333v320a21.333333 21.333333 0 0 0 21.333333 21.333333h597.333334a21.333333 21.333333 0 0 0 21.333333-21.333333V256a21.333333 21.333333 0 0 0-21.333333-21.333333H213.333333z" fill="#7DACFF" p-id="2601"></path><path d="M554.666667 469.333333h192a42.666667 42.666667 0 1 1 0 85.333334h-192a42.666667 42.666667 0 1 1 0-85.333334z" fill="#333549" p-id="2602"></path><path d="M554.666667 490.666667a21.333333 21.333333 0 0 0 0 42.666666h192a21.333333 21.333333 0 0 0 0-42.666666h-192z" fill="#FFFFFF" p-id="2603"></path><path d="M213.333333 213.333333h256v405.333334H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V256a42.666667 42.666667 0 0 1 42.666666-42.666667z" fill="#333549" p-id="2604"></path><path d="M448 234.666667H213.333333a21.333333 21.333333 0 0 0-21.333333 21.333333v320a21.333333 21.333333 0 0 0 21.333333 21.333333h234.666667V234.666667z" fill="#FFEEB4" p-id="2605"></path><path d="M193.962667 251.477333l256 362.666667a10.666667 10.666667 0 1 0 17.408-12.288l-256-362.666667a10.666667 10.666667 0 0 0-17.408 12.288z" fill="#333549" p-id="2606"></path><path d="M211.370667 592.810667l256-362.666667a10.666667 10.666667 0 1 0-17.408-12.288l-256 362.666667a10.666667 10.666667 0 1 0 17.408 12.288zM533.333333 394.666667h234.666667a10.666667 10.666667 0 1 0 0-21.333334H533.333333a10.666667 10.666667 0 1 0 0 21.333334zM533.333333 330.666667h234.666667a10.666667 10.666667 0 1 0 0-21.333334H533.333333a10.666667 10.666667 0 1 0 0 21.333334z" fill="#333549" p-id="2607"></path></svg>
                            </template>
                            <template #extra>
                                <a-button @click="postLogin" type="primary">
                                    立即登录
                                </a-button>
                            </template>
                        </a-result>
                    </div>
                    <div class="box group-list">
                        <h2>圈子广场</h2>
                        <a-tabs :default-active-key="0" @change="callback">
                            <a-tab-pane :key="0" tab="热门圈子">
                                <a-row :gutter="[{md:20},{md:20}]">
                                    <a-col v-for="(item,index) in list" :key="index" class="item" :span="6">
                                        <div class="group-cover">
                                            <div class="cover-wrap"></div>
                                            <img :src="item.cover" :alt="item.title">
                                        </div>
                                        <div class="group-info">
                                            <div class="group-title">
                                                <nuxt-link :to="`/group/${item.id}`">
                                                    {{item.title}}
                                                </nuxt-link>
                                            </div>
                                            <p>{{item.description}}</p>
                                            <div class="statistics">话题 {{item.contents |resetNum}} · 成员 {{item.joins |resetNum}}</div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane v-for="(citem) in cateList" :key="citem.cateId" :tab="citem.title">
                                <a-row :gutter="[{md:20},{md:20}]">
                                    <a-col v-for="(item,index) in list" :key="index" class="item" :span="6">
                                        <div class="group-cover">
                                            <div class="cover-wrap"></div>
                                            <img :src="item.cover" :alt="item.title">
                                        </div>
                                        <div class="group-info">
                                            <div class="group-title">
                                                <nuxt-link :to="`/group/${item.id}`">
                                                    {{item.title}}
                                                </nuxt-link>
                                            </div>
                                            <p>{{item.description}}</p>
                                            <div class="statistics">话题 {{item.contents |resetNum}} · 成员 {{item.joins |resetNum}}</div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </a-col>
                <a-col :span="6">
                    <SidebarGroupPost />
                    <SidbarAdv />
                </a-col>
            </a-row>
        </div>
    </div>
</template>



<script>
import api from "@/api/index"
import { mapState } from "vuex"
import {MODULE} from "@/shared/module"
import {MODE} from "@/shared/mode"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import SidbarAdv from "@/components/sidebar/sidbarAdv"
import SidebarGroupPost from "@/components/sidebar/sidebarGroupPost"
export default {
    components:{
        SidbarAdv,
        SidebarGroupPost
    },
    head(){
        return this.$seo(`圈子广场-${this.base.title}`,`圈子广场`,[{
            hid:"beethorn",
            name:"description",
            content:`圈子广场`
        }])
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    async asyncData({$axios,redirect,store}){
   
        let queryParam = {
            page:1,
            limit: 0,
            cateId: 0,
            mode: MODE.HOT,
            module:MODULE.GROUP
        }
        
       
        const res = await $axios.get(api.getSystemFilter,{params:queryParam})
        
        const cateList = await $axios.get(api.getSystemCate,{params:{module:queryParam.module}})

        let myGroupList = []
        if (store.state.user.token != null) {
            const myjoinQueryParam = {
                page:1,
                limit: 0,
                module: MODULE.GROUP,
                mode: MODE.HOT,
                isJoin: true,
                userId:store.state.user.userInfo.userId
            }
            const myGroupRes = await $axios.get(api.getSystemFilter,{params: myjoinQueryParam}) 
            if (res.code != 1) {
                redirect("/404")
            }
            myGroupList = myGroupRes.data.list != null ? myGroupRes.data.list : []
        }
        
        return {
            base:store.state.base,
            queryParam,
            cateList:cateList.data.list != null ?cateList.data.list : [],
            list: res.data.list != null ? res.data.list : [],
            myGroupList: myGroupList
        }
    },
    data(){
        return{
            MODULE,
            MODE,
            locale: zhCN,
            loading: false,
        }
    },
    methods:{
        async getData(){
            const res = await this.$axios.get(api.getSystemFilter,{params:this.queryParam})
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list != null ? res.data.list : []
        },
        callback(key) {
            this.queryParam.cateId = key
            this.getData()
        },
        // 登录
        postLogin(){
            this.$Auth("login","登录","快速登录")
        },
    }
}
</script>
<style lang="less" scoped>
.container{
    margin-top: 80px;
    min-height: 550px;
    display: flex;
    justify-content: center;
    .warper{
        .box{
            background: white;
            padding: 20px;
            h2{
                margin-bottom: 10px;
            }
            .item{
                display: flex;
                padding-bottom: 5px;
                margin-bottom: 5px;
                .group-cover{
                    width: 60px;
                    height: 60px;
                    position: relative;
                    .cover-wrap{
                        position: absolute;
                        z-index: 2;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.03);
                        border-radius: 5px;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                        object-fit: cover;
                    }
                }
                .group-info{
                    width: calc(100% - 60px);
                    padding-left: 10px;
                    .group-title{
                        font-weight: 500;
                        direction: ltr;
                        unicode-bidi: isolate;
                        font-size: 16px;
                        line-height: 20px;
                        padding: 0 0 6px 0;
                        height: 26px;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        a{
                        color: #333;
                        position: relative;
                        background: 0 0;
                        text-decoration: none;
                        outline: 0;
                        cursor: pointer;
                        transition: color .2s ease;
                        }
                        a:hover{
                        outline: 0;
                        text-decoration: none;
                        }
                        a:hover::before{
                        visibility: visible;
                        transform: scaleX(1);
                        }
                        a::before{
                        position: absolute;
                        bottom: -5px;
                        left: 0;
                        visibility: hidden;
                        width: 100%;
                        height: 1px;
                        background-color: #000;
                        content: "";
                        transition-delay: 0s;
                        transition-timing-function: ease-in-out;
                        transition-duration: .2s;
                        transform: scaleX(0);
                        }
                    }
                    p{
                        color: #999;
                        font-size: 12px;
                        line-height: 1rem;
                        height: 1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                    .statistics{
                        color: #657786;
                        font-size: 12px;
                    }
                }
                
            }
        }
        .group-list{
            margin-top: 20px;
        }
    }
}
</style>