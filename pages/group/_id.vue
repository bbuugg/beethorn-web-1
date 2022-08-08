<template>
    <div class="container">
        <div class="warper"  :style="{ width: design.width + 'px' }">
            <a-row :gutter="[{md:20}]">
                <a-col :span="18" class="group-c">
                    <div class="group-top">
                        <div class="group-top-l">
                            <img :src="info.cover | resetImage(140,140)" :alt="info.title">
                            <span class="group-cate" v-if="info.cateInfo != null">
                                {{info.cateInfo.title}}
                            </span>
                        </div>
                        <div class="group-top-r">
                            <div>
                                <h2>{{info.title}}</h2>
                                <p>
                                    {{info.description}}
                                </p>
                            </div>
                            <div  class="group-stat">
                                <div class="group-stat-count">
                                    <div class="group-stat-content">
                                        <span>帖子:</span>
                                        <span class="count">{{info.topics | resetNum}}</span>
                                    </div>
                                    <div>
                                        <span>成员:</span>
                                        <span class="count">{{info.joins | resetNum}}</span>
                                    </div>
                                </div>
                                <a-button  @click="joinGroup" type="primary">
                                    {{info.isJoin ? "退出" : "加入"}}
                                </a-button>
                            </div>
                        </div>
                    </div>

                                
                   
                    <div class="group-menu">
                        <ul>
                            <li>
                                <button :class="queryParam.mode == MODE.HOT ? 'active': ''"  @click="changeMeun(MODE.HOT)">热门</button>
                            </li>
                            <li>
                                <button :class="queryParam.mode == MODE.NEW ? 'active': ''" @click="changeMeun(MODE.NEW)">最新</button>
                            </li>
                        </ul>
                    </div>
                    <div v-if="info.isJoin || userInfo.userId == info.userInfo.id" class="group-content-list">
                        <ul v-if="list.length > 0 && list != undefined">
                            <li v-for="(item,index) in list" :key="index" class="item">
                                <FeedItem :info="item"/>                     
                            </li>
                        </ul>
                        <div v-if="list.length < 1 || list == undefined" class="group-content-list-emty">
                            <a-config-provider :locale="locale">
                                <a-empty />
                            </a-config-provider>
                        </div>
                    </div>
                    <div v-if="!info.isJoin && userInfo.userId != info.userInfo.id" class="group-mode">
                        <div class="group-mode-info">
                            <div class="group-mode-info-icon">
                                <a-icon type="team" />
                            </div>
                            <h2>
                                您还未加入该圈
                            </h2>
                            <p v-if="info.joinMode == 1">免费入圈，加入圈子后可阅读更多圈内话题加入圈子</p>
                            <div  class="group-mode-info-pay" v-if="info.joinMode == 2">
                                付费圈子，您需要支付<span class="">{{info.price}}</span>￥，方可入圈
                            </div>
                            <div  class="group-mode-info-role" v-if="info.joinMode == 3">
                                <p>请先在下方输入密钥后再点加入</p> 
                                <a-input v-model="secretKey" placeholder="请输入密钥" />
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="6" class="group-r">
                    <SidebarUserInfo :info="info.userInfo"/>
                </a-col>
            </a-row>
        </div>
    </div>
</template>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
import SidebarGroupLeftTop from "@/components/sidebar/sidebarGroupLeftTop"
import SidebarGroup from "@/components/sidebar/sidebarGroup"
import SidebarUserInfo from "@/components/sidebar/sidebarUserInfo"
import SidebarHotUserList from "@/components/sidebar/sidebarHotUserList"

import FeedItem from "@/components/list/feedItem"

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import {MODULE} from "@/shared/module"
import {ORDERTYPE} from "@/shared/order"
import {MODE} from "@/shared/mode"

export default {
    name:"groupInfo",
    components:{
        FeedItem,
        SidebarGroupLeftTop,
        SidebarUserInfo,
        SidebarHotUserList,
        SidebarGroup,
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token","userInfo"]),
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
        const res = await $axios.get(api.getGroupInfo,{params:{id:id}})
        if (res.code != 1) {
            redirect("/404")
        }

        const queryParam = {
            page: 1,
            limit: 2,
            mode:MODE.HOT,
            groupId:id,
            module:MODULE.TOPIC,
            isJoin:res.data.info.isJoin,
        }
       
        let list = []
        if (res.data.info.isJoin) {
            const listData = await $axios.get(api.getGroupPosts,{params:queryParam})
            list = listData.data.list != null ? listData.data.list : []

            if (queryParam.module == MODULE.TOPIC) {
                list =  list.map((item)=>{
                    if (item.type == 1 && item.images != "") {
                        item.images = JSON.parse(item.images)
                    }
                    return item
                })
            }
        }
        return {
            base:store.state.base,
            id:id,
            info:res.data.info,
            queryParam,
            list: list,
            isShow: list != [] ? false :true,
        }
    },
    data(){
        return{
            locale: zh_CN,
            MODE,
            MODULE,
            secretKey:undefined
        }
    },
    mounted(){
        window.addEventListener('scroll', this.scrollList)
    },
    destroyed () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods:{
        scrollList(){
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = document.documentElement.clientHeight
            const scrollHeight = document.documentElement.scrollHeight
            if (scrollTop + clientHeight >= scrollHeight) {
                if (!this.isShow) {
                    this.queryParam.page += 1
                    this.getList()
                }
                return
            }
           
        },
        async getList(){
            if (this.info.isJoin || this.userInfo.userId == this.info.userInfo.id) {
                const res = await this.$axios.get(api.getGroupPosts,{params: this.queryParam}) 
                if (res.code != 1) {
                    // this.$router.push(`/404`)
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }

                if (this.queryParam.module == MODULE.TOPIC) {
                    res.data.list = res.data.list == null ? [] : res.data.list.map((item)=>{
                        if (item.type == 1 && item.images != "") {
                            item.images = JSON.parse(item.images)
                        }
                        return item
                    })
                }
                
                this.list = [...this.list,...res.data.list]
            }
        },
        changeMeun(e){
            this.queryParam.mode = e
            this.list = []
            this.queryParam.page = 1
            this.getList()
        },
        changeModule(e){
            this.queryParam.module = e
            this.list = []
            this.queryParam.page = 1
            this.queryParam.limit = 10
            if (this.queryParam.module == MODULE.ALL) {
                this.queryParam.limit = 2
            }
            this.getList()
        },
        async joinGroup(){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }

            if (this.info.isJoin) {
                this.$confirm({
                    okText:"确定",
                    cancelText:"取消",
                    title: '退圈',
                    content: '你确定要退出这个圈子吗？',
                    onOk:async () => {
                        this.info.isJoin = !this.info.isJoin
                        if (this.info.isJoin) {
                            this.info.joins = this.info.joins + 1
                        } else {
                            this.info.joins = this.info.joins - 1
                        }

                        const query = {
                            id:this.id
                        }
                        const res = await this.$axios.post(api.PostGroupJoin,query)
                        if (res.code != 1) {
                            this.$message.error(
                                res.message,
                                3
                            )
                            this.info.isJoin = !this.info.isJoin
                            if (this.info.isJoin) {
                                this.info.joins = this.info.joins + 1
                            } else {
                                this.info.joins = this.info.joins - 1
                            }
                            return
                        }
                        this.list = []
                        this.queryParam.isJoin = this.info.isJoin
                        this.getList()
                    },
                    onCancel() {},
                });

                return
            }

            if (this.info.joinMode == 2) {
                const product = {
                    authorId:this.info.userInfo.id,
                    detailId:this.id,
                    detailModule:MODULE.GROUP,
                    orderMoney:this.info.price,
                    orderType: ORDERTYPE.JOINGROUP,
                }
                this.$Pay("加入付费圈子",product).then(async (res)=>{
                    if (res != false) {
                       this.info.isJoin = !this.info.isJoin
                        if (this.info.isJoin) {
                            this.info.joins = this.info.joins + 1
                        } else {
                            this.info.joins = this.info.joins - 1
                        }

                        const query = {
                            id:this.id
                        }
                        const res = await this.$axios.post(api.PostGroupJoin,query)
                        if (res.code != 1) {
                            this.$message.error(
                                res.message,
                                3
                            )
                            this.info.isJoin = !this.info.isJoin
                            if (this.info.isJoin) {
                                this.info.joins = this.info.joins + 1
                            } else {
                                this.info.joins = this.info.joins - 1
                            }
                            return
                        }
                        this.list = []
                        this.queryParam.isJoin = this.info.isJoin
                        this.getList()
                    }
                }).catch((err)=>{
                    console.log(err)
                    // this.createForm.cover = undefined
                })
                
                return
            }

            if (this.info.joinMode == 3) {
                if (this.secretKey == undefined || this.secretKey == null || this.secretKey == "") {
                    this.$message.error(
                        "请设置密钥",
                        3
                    )
                    return
                }
                
                this.info.isJoin = !this.info.isJoin
                if (this.info.isJoin) {
                    this.info.joins = this.info.joins + 1
                } else {
                    this.info.joins = this.info.joins - 1
                }

                const query = {
                    id:this.id,
                    secretKey:this.secretKey
                }
                const res = await this.$axios.post(api.PostGroupJoin,query)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    this.info.isJoin = !this.info.isJoin
                    if (this.info.isJoin) {
                        this.info.joins = this.info.joins + 1
                    } else {
                        this.info.joins = this.info.joins - 1
                    }
                    return
                }
                this.list = []
                this.queryParam.isJoin = this.info.isJoin
                this.getList()
                return
            }

            this.info.isJoin = !this.info.isJoin
            if (this.info.isJoin) {
                this.info.joins = this.info.joins + 1
            } else {
                 this.info.joins = this.info.joins - 1
            }

            const query = {
                id:this.id
            }
            const res = await this.$axios.post(api.PostGroupJoin,query)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                this.info.isJoin = !this.info.isJoin
                if (this.info.isJoin) {
                    this.info.joins = this.info.joins + 1
                } else {
                    this.info.joins = this.info.joins - 1
                }
                return
            }
            this.list = []
            this.queryParam.isJoin = this.info.isJoin
            this.getList()
        },
    }
}
</script>


<style lang="less" scoped>
.container{
    min-height: 550px;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    .warper{
       
        .group-c{
            .group-top{
                background-color: white;
                padding: 20px;
                display: flex;
                // justify-content: space-between;
                // align-items: center;
                .group-top-l{
                    width: 140px;
                    height: 140px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .group-cate{
                        display: inline-block;
                        width: 80px;
                        padding: 5px;
                        position: absolute;
                        top: 15px;
                        left: -15px;
                        background-color: #59B6D7;
                        color: white;
                        width: 80px;
                        padding-left: 20px;
                        border-radius: 0 15px 15px 0;
                    }
                }
                .group-top-r{
                    flex:1;
                    margin-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    h2{
                        font-size: 20px;
                        font-weight: 700;
                    }
                    p{
                        height: 52px;
                        line-height: 26px;
                        color: #777;
                        font-size: 13px
                    }
                    .group-stat{
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                        .group-stat-count{
                            display: flex;
                            .group-stat-content{
                                margin-right: 10px;
                            }
                            .count{
                                color: #59B6D7;
                            }
                        }
                    }

                }
            }
            .group-menu{
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 0;
                position: relative;
                background: white;
                margin-top: 10px;
                ul{
                    display: flex;
                    li{
                        font-size: 14px;
                        margin-right: 8px;
                        button{
                            cursor: pointer;
                            background: 0 0;
                            border: 0;
                            color: initial;
                            padding: 5px 10px;
                            border-radius: 2px;
                            -webkit-appearance: none;
                            outline: none;
                            -webkit-tap-highlight-color: rgba(0,0,0,0);
                            font-family: font-regular,'Helvetica Neue',sans-serif;
                            // border: 1px solid #ccc;
                            box-sizing: border-box;
                            user-select: none;
                        }
                        .active{
                            background-color: #4560c9;
                            color: #fff;
                        }
                    }
                }
            }
            .group-content-list{
                margin-top: 10px;
                .item{
                    background: white;
                    padding: 10px;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                .group-content-list-emty{
                    background: white;
                    padding: 20px;
                }
            }
            .group-mode{
                margin-top: 10px;
                background: white;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                .group-mode-info{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    
                    .group-mode-info-icon{
                        color: #3860f4!important;
                        font-size: 40px;
                        margin-bottom: 5px;
                    }
                    h2{
                        margin-bottom: 10px;
                    }
                    .group-mode-info-role{
                        p{
                            margin-bottom: 10px;
                        }
                    }
                    .group-mode-info-pay{
                        span{
                            color: red;
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>