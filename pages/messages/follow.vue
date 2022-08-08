<template>
    <div class="content-box">
        <div class="title">
            <span>
                关注我的
            </span>
        </div>
        <div class="notice-list" v-if="list != null && list.length>0">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="notice-list-item">
                        <Avatar :src="item.detailInfo.cover+'@w60_h60'" :size="50" />
                        <div class="notice-list-item-info">
                            <div class="item-info-title">
                                <h2>{{item.detailInfo.nickName}} <span class="item-info-span">{{item.content}}</span></h2>
                            </div>
                            <p class="item-info-date">{{item.createTime | resetData}}</p>
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
                    background: #f5f5f5;
                    padding: 13px 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 10px;
                    h2{
                        font-weight: 700;
                        font-size: 16px;
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
        return this.$seo(`关注通知-${this.base.title}`,`关注通知`,[{
            hid:"beethorn",
            name:"description",
            content:`关注通知`
        }])
    },
    data(){
        return{
            locale: zhCN,
            queryParam:{
                page:1,
                limit: 12,
                type: 5,
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