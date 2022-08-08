<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <div class="left">
                <div class="filter">
                    <p>筛选</p>
                    <ul class="hot-tag">
                        <li>
                            <button 
                                :class="queryParam.mode == MODE.NEW ? 'active':''" 
                                @click="changeOrder(MODE.NEW)">
                                最新
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.mode == MODE.HOT ? 'active':''" 
                                @click="changeOrder(MODE.HOT)">
                                热门
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="filter">
                    <p>分类</p>
                    <a-tree
                        :auto-expand-parent="false"
                        :tree-data="cateList"
                        @select="changeCate"
                    />
                </div>
                <div class="filter">
                    <p>热门标签</p>
                    <ul class="hot-tag">
                        <li>
                            <button :class="queryParam.tagId == 0 ? 'active': ''"  @click="changeTag(0)">不限</button>
                        </li>
                        <li v-for="item in tagList" :key="item.tagId">
                            <button :class="queryParam.tagId == item.tagId ? 'active': ''"  @click="changeTag(item.tagId)">{{item.title}}</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="center">
                <div class="module">
                    <h2 class="module-title">所有模块</h2>
                    <ul class="hot-tag">
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.ARTICLE ? 'active' : ''" 
                                @click="changeModule(MODULE.ARTICLE)">
                                文章
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.AUDIO ? 'active' : ''" 
                                @click="changeModule(MODULE.AUDIO)">
                                音频
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.VIDEO ? 'active' : ''" 
                                @click="changeModule(MODULE.VIDEO)">
                                视频
                            </button>
                        </li>
                        <li>
                            <button 
                                :class="queryParam.module == MODULE.EDU ? 'active' : ''" 
                                @click="changeModule(MODULE.EDU)">
                                课程
                            </button>
                        </li>
                    </ul>
                </div>
                <div  v-if="!loading">
                    <a-row v-if="list.length > 0" :gutter="[{md:20},{md:20}]">
                        <a-col v-for="(item,index) in list" :key="index" :span="6">
                            <listTwo :info="item"/>
                        </a-col>
                    </a-row>

                    <div class="screen-empty" v-if="list.length < 1">
                        <a-config-provider :locale="locale">
                            <a-empty />
                        </a-config-provider>
                    </div>

                    <div v-if="list.length > 0" class="pagination" >
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
                <ul v-if="loading">
                    <li class="loading">
                        <a-skeleton avatar :paragraph="{ rows: 4 }" />
                    </li>
                    <li class="loading">
                        <a-skeleton avatar :paragraph="{ rows: 4 }" />
                    </li>
                    <li class="loading">
                        <a-skeleton avatar :paragraph="{ rows: 4 }" />
                    </li>
                    <li class="loading">
                        <a-skeleton avatar :paragraph="{ rows: 4 }" />
                    </li>
                </ul>
            </div>
            <div class="right">
                <SidebarUploadArticle/>
                <SidbarAdv />
                <SidebarHotList :module="queryParam.module"/>
                <SidebarComment :module="queryParam.module"/>
            </div>
        </div>
    </div>
</template>

<script>
import ListTow from "@/components/list/listTwo"
import SidebarHotList from "@/components/sidebar/sidebarHotList"
import SidebarComment from "@/components/sidebar/sidebarComment"
import SidebarUploadArticle from "@/components/sidebar/sidebarUploadArticle"
import SidbarAdv from "@/components/sidebar/sidbarAdv"

import api from "@/api/index"
import { mapState } from "vuex"
import {MODULE} from "@/shared/module"
import {MODE} from "@/shared/mode"
// import listTwo from "@/components/list/listTwo"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    components:{
        ListTow,
        SidebarHotList,
        SidebarComment,
        SidebarUploadArticle,
        SidbarAdv
    },
    head(){
        return this.$seo(`发现-${this.base.title}`,`${this.base.childTitle}`,[{
            hid:"beethorn-desc",
            name:"description",
            content:`${this.base.description}`
        }])
    },
    data(){
        return{
            MODULE,
            MODE,
            locale: zhCN,
            queryParam: {
                page:1,
                limit: 12,
                module: MODULE.ARTICLE,
                cateId: 0,
                tagId: 0,
                mode: MODE.NEW,
            },
            list:[],
            total: 0,
            loading: false,
            cateList:[],
            tagList:[],
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        }
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token"]),
    },
    mounted(){
        this.getData()
        this.getCate()
        this.getTag()
    },
    methods: {
        async getData(){
            this.loading = true
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
            this.loading = false
        },
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
            const catelits =  this.$handertree(res.data.list || [],"cateId","parentId")
            this.cateList = this.$loopCate(catelits)
        },
        async getTag(){
            const res = await this.$axios.get(api.getSystemHotTag)
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            
            this.tagList = res.data.list != null ? res.data.list : []
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        changeOrder(e){
            this.queryParam.mode = e
            this.getData()
        },
        changeTag(e){
            this.queryParam.tagId = e
            this.getData()
        },
        changeModule(e){
            this.queryParam.module = e  
            this.queryParam.cateId = 0 
            this.queryParam.tagId = 0
            this.queryParam.mode = MODE.NEW 
            this.getCate()
            this.getData()
        },
        changeCate(selectedKeys, info) {
            this.queryParam.cateId = selectedKeys[0];
            this.getData()
        },
    },
}
</script>

<style lang="less" scoped>
.container{
    margin: 80px 0;
    min-height: 550px;
    display: flex;
    justify-content: center;
    .warper{
        display: flex;
        .left{
            width: 140px;
           .filter{
               margin-bottom: 10px;
                p{
                   font-size: 14px;
                   color: #8f8f8f;
                }
                .hot-tag{
                    margin: 10px 5px;
                    // display: flex;
                    li{
                        font-size: 14px;
                        margin-bottom: 5px;
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
        .center{
            margin: 0 20px;
            flex: 1;
            .module{
                display: flex;
                align-items: center;
                padding:0 20px;
                background-color: white;
                margin-bottom: 10px;
                .module-title{
                    color: #3c4248;
                    margin-right: 10px;
                }
                .hot-tag{
                    margin: 10px 5px;
                    display: flex;
                    li{
                        font-size: 14px;
                        margin-left: 5px;
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
            .loading{
                padding: 10px;
                background-color: white;
            }
            .screen-empty{
                margin-top: 20px;
            }
            .pagination{
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
        }
        .right{
            width: 240px;
        }
    }
}
</style>