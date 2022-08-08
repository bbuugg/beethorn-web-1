<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <div class="screen-top">
                <div class="screen-top-box">
                    <span>模块:</span>
                    <ul>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.RESOURCE ? 'active': ''" 
                                @click="changeModule(MODULE.RESOURCE)">
                                资源
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.AUDIO ? 'active': ''" 
                                @click="changeModule(MODULE.AUDIO)">
                                音频
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.VIDEO ? 'active': ''" 
                                @click="changeModule(MODULE.VIDEO)">
                                视频
                            </button>
                        </li>
                    </ul>
                </div>
                <div v-if="cateList.length > 0" class="screen-top-box">
                    <span>分类:</span>
                    <ul>
                        <li>
                            <button :class="queryParam.cateId == 0 ? 'active': ''"  @click="changeCate(0)">不限</button>
                        </li>
                        <li v-for="item in cateList" :key="item.cateId">
                            <button :class="queryParam.cateId == item.cateId ? 'active': ''" 
                             @click="changeCate(item.cateId)">{{item.title}}</button>
                        </li>
                    </ul>
                </div>
                <div class="screen-top-box">
                    <span>热门标签:</span>
                    <ul>
                        <li>
                            <button :class="queryParam.tagId == 0 ? 'active': ''"  @click="changeTag(0)">不限</button>
                        </li>
                        <li v-for="item in tagList" :key="item.tagId">
                            <button :class="queryParam.tagId == item.tagId ? 'active': ''"  @click="changeTag(item.tagId)">{{item.title}}</button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="screen-mode">
                <ul>
                    <li>
                        <button 
                            :class="queryParam.mode == MODE.NEWS ? 'active': ''" 
                            @click="changeMode(MODE.NEWS)">
                            最新
                        </button>
                    </li>
                    <li>
                        <button 
                            :class="queryParam.mode == MODE.HOT ? 'active': ''" 
                            @click="changeMode(MODE.HOT)">
                            热门
                        </button>
                    </li>
                </ul>
                <div class="screen-content-isDown">
                    <span>下载内容</span>
                    <ul>
                        <li>
                            <button 
                                :class="queryParam.isDown == 0 ? 'active': ''" 
                                @click="changeIsDown(0)">
                                不限
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.isDown == ISDWON.YES ? 'active': ''" 
                                @click="changeIsDown(ISDWON.YES)">
                                是
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.isDown == ISDWON.NO ? 'active': ''" 
                                @click="changeIsDown(ISDWON.NO)">
                                否
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="screen-list" v-if="list.length > 0">
                <a-row :gutter="[{md:30},{md:30}]">
                    <a-col v-for="(item,index) in list" :key="index" :span="6">
                        <listTwo :info="item"/>
                    </a-col> 
                </a-row>
                <div class="content-pagination" >
                    <a-config-provider :locale="locale">
                        <a-pagination
                            @change="changePage"
                            :pageSize="queryParam.limit"
                            :total="total"
                            show-quick-jumper
                        >
                        </a-pagination>
                    </a-config-provider>
                </div>
            </div>
            <div class="screen-empty" v-if="list.length < 1">
                <a-config-provider :locale="locale">
                    <a-empty />
                </a-config-provider>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import {MODULE} from "@/shared/module"
import listTwo from "@/components/list/listTwo"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
const MODE = {
    HOT:1,
    NEWS:2,
}
const ISDWON = {
    NO:1,
    YES:2,
}
export default {
    layout: 'muzo',
    components:{
       listTwo
    },
    head(){
        return this.$seo(`筛选-${this.base.title}`,`筛选`,[{
            hid:"beethorn",
            name:"description",
            content:`筛选`
        }])
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    async asyncData({query,$axios,store}){
   
        const queryParam = {
            page:1,
            limit: 12,
            module: MODULE.RESOURCE,
            cateId: 0,
            tagId: 0,
            mode: MODE.HOT,
            isDown: 0,
        }
        
        const res = await $axios.get(api.getSystemFilter,{params:queryParam})
        
        const cateList = await $axios.get(api.getSystemCate,{params:{module:queryParam.module}})
      
        const tagRes = await $axios.get(api.getSystemHotTag)
 
        return {
            base:store.state.base,
            queryParam,
            tagList:tagRes.data.list != null ? tagRes.data.list : [],
            cateList:cateList.data.list != null ?cateList.data.list : [],
            list: res.data.list != null ?res.data.list : [],
            total:res.data.total != 0 ?res.data.total : 0,
        }
    },
    data(){
        return{
            MODULE,
            MODE,
            ISDWON,
            locale: zhCN,
        }
    },
    mounted(){
        // console.log(this.cateList)
        // console.log(this.list)
    },
    methods:{
        async getCate(){
            const res = await this.$axios.get(api.getSystemCate,{params:{module:this.queryParam.module}})
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.cateList = res.data.list != null ? res.data.list : []
        },
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
            this.total = res.data.total != 0 ? res.data.total : 0
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        changeCate(e){
            this.queryParam.cateId = e
            this.getData()
        },
        changeModule(e){
            this.queryParam.module = e
            this.queryParam.cateId = 0
            this.getCate()
            this.getData()
        },
        changeTag(e){
            this.queryParam.tagId = e
            this.getData()
        },
        changeMode(e){
            this.queryParam.mode = e
            this.getData()
        },
        changeIsDown(e){
            this.queryParam.isDown = e
            this.getData()
        }
    }
}
</script>


<style lang="less" scoped>
.container{
    margin: 80px 0;
    min-height: 550px;
    display: flex;
    justify-content: center;
    .warper{
        .screen-top{
            background: white;
            padding: 20px;
            .screen-top-box{
                padding: 5px;
                display: flex;
                align-items: center;
                span{margin-right: 10px;}
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    flex: 1;
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
        }
        .screen-mode{
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
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
            .screen-content-isDown{
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    margin-right: 10px;
                }
            }
        }
        .screen-list{
            .content-pagination{
                margin-top: 10px;
            }
        }
    }
}
</style>
