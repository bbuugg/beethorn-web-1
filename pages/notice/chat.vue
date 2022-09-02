<template>
    <div class="content-box">
        <div class="title">
            <span>
                我的消息
            </span>
        </div>
        <div class="notice-list">
            <ul>
                <li>
                    <div class="notice-list-item">
                        <Avatar :size="50" />
                        <div class="notice-list-item-info">
                            <div class="item-info-title">
                                <h2>欢迎加入PianKR <span class="item-info-span">与你的私信</span></h2>
                                <a-tag color="#f50">
                                    未读
                                </a-tag>
                            </div>
                            <p class="item-info-date">一个月前</p>
                            <div class="item-info-commnet">
                                asdasdasdasdfsdfsdfsdf
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
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
        .notice-list-item{
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
            }
        }
        
    }
}
</style>


<script>
import { mapState } from "vuex"
import Avatar from "@/components/avatar/avatar"
export default {
    middleware: ['auth'],
    components:{
        Avatar
    },
    data(){
        return{
            id:null,
            
        }
    },
    computed:{
        ...mapState(["allWidth"]),
        
    },
    mounted(){
        // this.echartsInit()
    },
    methods:{
        
    },
}
</script>