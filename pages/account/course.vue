<template>
    <div class="content">
        <h2>我加入的课程</h2>
        <div class="setting-container">
            <div class="list" v-if="list.length > 0">
                <a-row :gutter="[{md:30},{md:30}]">
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
import {MODULE} from "@/shared/module"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    middleware: 'auth',
    components:{
       listTwo,
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
                module: MODULE.EDU,
                isJoin:true,
            },
        }
    },
 
    mounted(){
        this.queryParam.userId = this.userInfo.userId
        this.getData()
    },

    methods:{
        async getData(){
            const res = await this.$axios.get(api.getAccountJoinEdu,{params: this.queryParam})
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
