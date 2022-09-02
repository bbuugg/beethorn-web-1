<template>
    <div class="sidear-box">
        <h2 class="title">热门帖子</h2>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="go(item.id)">
                <div class="sidear-ask-index">
                    <span>
                        {{index + 1}}
                    </span>
                </div>
                <div class="sidear-ask-title">
                    <h2>{{item.title}}</h2>
                    <p>{{item.createTime | resetData}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.sidear-box{
    background: white;
    margin-bottom: 10px;
    .title{
        font-size: 16px;
        padding: 10px 16px 8px;
        font-weight: 600;
        line-height: 1;
    }
    ul{
        padding: 5px 16px 8px;
        li{
            display: flex;
            padding: 16px 0;
            font-size: 13px;
            border-top: 1px solid #f3f3f3;
            .sidear-ask-index{
                span{
                    display: block;
                    padding: 0;
                    font-size: 22px;
                    margin-right: 10px;
                    line-height: 1;
                    text-align: center;
                    font-family: Impact;
                    color: #eaeaea;
                }
            }
            .sidear-ask-title{
                h2{
                    line-height: 20px;
                    cursor: pointer;
                    user-select: none;
                    font-size: 13px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    max-height: 52px;
                }
                p{
                    font-size: 12px;
                    color: #bcbcbc;
                    margin-top: 5px;
                }
            }
        }   
    }
}
</style>

<script>
import api from "@/api/index"

import {MODULE} from "@/shared/module"
import {MODE} from "@/shared/mode"

export default {
    data(){
        return{
            queryParam:{
                page:1,
                limit: 5,
                mode: MODE.HOT,
                module:MODULE.TOPIC
            },
            list:[],
        }
    },
    mounted(){
        this.getData()
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
        go(e){
           this.$router.push({ path: `/feed/${e}`})
        }
    }
}
</script>
