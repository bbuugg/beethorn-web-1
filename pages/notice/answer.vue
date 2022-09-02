<template>
    <div class="content-box">
        <div class="title">
            <span>
                回答我的
            </span>
        </div>
        <div class="notice-list" v-if="list != null && list.length>0">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="notice-list-item">
                        <Avatar :src="item.detailInfo.fromUser.avatar+'@w60_h60'" :size="62" />
                        <div class="notice-list-item-info">
                            <div class="item-info-title">
                                <h2>{{item.detailInfo.fromUser.nickName}}</h2>
                                <p class="item-info-date">{{item.createTime | resetData}}</p>
                            </div>
                            <div class="item-info-content" @click="go(item.detailInfo.detail.id)">
                                <h2 class="content">在《{{item.detailInfo.detail.title}}》的帖子内回答：{{item.content}}</h2>
                                <span>前往</span>
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
            cursor: pointer;
            margin-bottom: 10px;
            background: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .notice-list-item-avatar{
                margin-right: 10px;
            }
            .notice-list-item-info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                .item-info-title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h2{
                        font-weight: 700;
                        font-size: 16px;
                        .item-info-span{
                            font-weight: 400;
                            font-size: 14px;
                            color: #b5b5b5;
                            margin-left: 15px;
                        }
                    }
                }
                .item-info-date{
                    color: #b5b5b5;
                    font-size: 14px;
                }
                .item-info-content{
                    color: #8590a6;
                    background: #f5f5f5;
                    margin-top: 5px;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .content{
                        flex: 1;
                        font-size: 14px;
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
import {MODULE} from "@/shared/module"
import api from "@/api/index"
import { mapState } from "vuex"
import Avatar from "@/components/avatar/avatar"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
    middleware: ['auth'],
    components:{
        Avatar
    },
    head(){
        return this.$seo(`回答通知-${this.base.title}`,`回答通知`,[{
            hid:"beethorn",
            name:"description",
            content:`回答通知`
        }])
    },
    data(){
        return{
            MODULE,
            locale: zhCN,
            queryParam:{
                page:1,
                limit: 12,
                type: 3,
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
        go(e){
            this.$router.push(`/feed/${e}`)
        },
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