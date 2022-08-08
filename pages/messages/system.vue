<template>
    <div class="content-box">
        <div class="title">
            <span>
                系统通知
            </span>
        </div>
        <div class="notice-list" v-if="list != null && list.length>0">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="notice-list-item">
                        <Avatar :size="40" />
                        <div class="notice-list-item-info">
                            <div class="item-info-title">
                                <h2>{{item.systemType | sysTemTypeTitle}}</h2>
                                <p class="item-info-date">{{item.createTime | resetData}}</p>
                            </div>
                            
                            <div class="item-info-content">
                                <span class="content">{{item.content}}</span>
                                <span v-if="(item.systemType == SystmeType.NoticeUserTips || item.systemType == SystmeType.NoticeUserBuyContent) && item.detailInfo != null" class="money">+{{item.detailInfo.money}}{{base.currencySymbol}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="content-pagination" v-if="list != null && list.length>0">
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
        <div class="content-info" v-if="list == null || list.length == 0">
            <a-config-provider :locale="locale">
               <a-empty />
            </a-config-provider>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content-box{
    margin-bottom:20px ;
    .title{
        padding: 10px;
        background: white;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .notice-list{
        min-height: 500px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .notice-list-item{
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .notice-list-item-avatar{
                margin-right: 10px;
            }
            .notice-list-item-info{
                flex: 1;
                .item-info-title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h2{
                        font-weight: 700;
                        font-size: 13px;
                        .item-info-span{
                            font-weight: 400;
                            font-size: 14px;
                            color: #b5b5b5;
                            margin-left: 15px;
                        }
                    }
                }
                .item-info-date{
                    color: #8590a6;
                    font-size: 14px;
                }
                .item-info-content{
                    margin-top: 5px;
                    font-size: 12px;
                    color: #8590a6;
                    background: #f5f5f5;
                    margin-bottom: 8px;
                    padding: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .content{
                        flex:1;
                    }
                    .money{
                        color: red;
                    }
                }
            }
        }
        .content-pagination{
            padding: 10px;
        }
    }
    .content-info{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        background-color: white;
    }
}
</style>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
import {SystmeType} from "@/shared/notice"

import Avatar from "@/components/avatar/avatar"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    middleware: ['auth'],
    components:{
        Avatar
    },
    filters: {
        sysTemTypeTitle(value) {
            switch (value) {
                case SystmeType.NoticeSysTemRegister:
                    return "用户注册通知"
                case SystmeType.NoticeSysTemDeleteContent:
                    return "内容删除通知"
                case SystmeType.NoticeUserTips:
                    return "用户打赏通知"
                case SystmeType.NoticeUserBuyContent:
                    return "用户购买内容通知"
                case SystmeType.NoticeUserJoin:
                    return "用户加入通知"
            }
        },
    },
    head(){
        return this.$seo(`系统通知-${this.base.title}`,`系统通知`,[{
            hid:"beethorn",
            name:"description",
            content:`系统通知`
        }])
    },
    data(){
        return{
            SystmeType,
            locale: zhCN,
            queryParam:{
                page:1,
                limit: 12,
                type: 1,
            },
            total:0,
            list:[]
        }
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["token"]),
    },
    mounted(){
        this.getData()
    },
    methods:{
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        async getData(){
            const res = await this.$axios.get(api.getNoticeList,{params:this.queryParam})
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list != null ? res.data.list : []
            this.total = res.data.total != 0 ? res.data.total : 0
        }
    },
}
</script>