<template>
    <div class="content">
        <h2>我收藏的</h2>
        <div class="setting-container">
            <ul class="menu">
                <li>
                    <button 
                        :class="queryParam.module == MODULE.ARTICLE ? 'active': ''"
                        @click="changeModule(MODULE.ARTICLE)">
                        文章
                    </button>
                </li>
                <li>
                    <button 
                        :class="queryParam.module == MODULE.VIDEO ? 'active': ''"
                        @click="changeModule(MODULE.VIDEO)">
                        视频
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
                        :class="queryParam.module == MODULE.RESOURCE ? 'active': ''"
                        @click="changeModule(MODULE.RESOURCE)">
                        资源
                    </button>
                </li>
                <li>
                    <button 
                        :class="queryParam.module == MODULE.EDU ? 'active': ''" 
                        @click="changeModule(MODULE.EDU)">
                        课程
                    </button>
                </li>
            </ul>
            <div class="list" v-if="list.length > 0">
                <ul v-if="queryParam.module == MODULE.ARTICLE">
                    <li v-for="(item,index) in list" :key="index">
                        <list-one :info="item"/>
                    </li>
                </ul>
                <a-row v-if="queryParam.module != MODULE.ARTICLE && queryParam.module != MODULE.QUESTION" :gutter="[{md:30},{md:30}]">
                    <a-col v-for="(item,index) in list" :key="index" :span="6">
                        <listTwo :info="item"/>
                    </a-col> 
                </a-row>
                <div class="pagination" >
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
            <div class="empty" v-if="list.length < 1">
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
import listTwo from "@/components/list/listTwo"
import ListOne from '@/components/list/listOne.vue'
import {MODULE} from "@/shared/module"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    middleware: 'auth',
    components:{
       listTwo,
       ListOne
    },
    data(){
        return{
            locale: zhCN,
            MODULE,
            total: 0,
            list: [],
            queryParam: {
                page: 1,
                limit: 10,
                status: 2,
                module: MODULE.ARTICLE,
                isFavorite:true,
            },
        }
    },
    head(){
        return this.$seo(`用户中心-${this.base.title}`,`用户中心`,[{
            hid:"beethorn",
            name:"description",
            content:`用户中心`
        }])
    },
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapState(["base"])
    },
    mounted(){
        this.queryParam.userId = this.userInfo.userId
        this.getData()
    },

    methods:{
        async getData(){
            const res = await this.$axios.get(api.getAccountFavorites,{params: this.queryParam})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
            }
            this.list = res.data.list || []
            this.total = res.data.total || 0
        },
        changePage(e){
            this.queryParam.limit = e.pageSize
            this.queryParam.page = e.current
            this.getData()
        },
        changeModule(e){
            this.queryParam.module = e
            this.list = []
            this.total = 0
            this.getData()
        },
    }
}
</script>

<style lang="less" scoped>
.content{
    background-color: #fff;
    padding: 20px;
    h2{
        color: #bcbcbc;
        font-size: 18px;
    }
    .setting-container{
        .menu{
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            margin-top: 20px;
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
        .list{
            margin: 20px 0;
            .pagination{
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            .ask-list-item{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .ask-rank{
                    display: flex;
                    .answere-count{
                        margin-right: 10px;
                        text-align: center;
                        line-height: 1.2;
                        display: inline-block;
                        padding-top: 3px;
                        width: 40px;
                        height: 40px;
                        -moz-border-radius: 1px;
                        -webkit-border-radius: 1px;
                        border-radius: 3px;
                        background: #0084ff;
                        border: none;
                        color: #fff;
                        small{
                            display: block;
                            font-size: 12px;
                        }
                    }
                    .ask-view{
                        margin-right: 10px;
                        text-align: center;
                        line-height: 1.2;
                        display: inline-block;
                        padding-top: 3px;
                        width: 40px;
                        height: 40px;
                        -moz-border-radius: 1px;
                        -webkit-border-radius: 1px;
                        border-radius: 3px;
                        background-color: #f3f3f3;
                        border-color: #f3f3f3;
                        color: #7b7b7b;
                        small{
                            display: block;
                            font-size: 12px;
                        }
                    }
                }
                .ask-info{
                    flex: 1;
                    .ask-author-date{
                        display: flex;
                        align-items: center;
                        
                        .user-name{
                            font-size: 14px;
                            color: #7b7b7b;
                        }
                        .date{
                            margin-left: 10px;
                            font-size: 12px;
                            color: #7b7b7b;
                        }
                    }
                    .ask-title{
                        font-size: 14px;
                    }
                }
            }
        }

    }
}
</style>
