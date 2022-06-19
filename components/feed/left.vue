<template>
    <div class="left">
        <ul class="menu">
            <li  @click="changeMeun(MODE.NEW)" :class="(queryParam.mode == MODE.NEW && hotGroupId == 0 && myGroupId == 0) ? 'item active': 'item'">
                <a-icon theme="filled" 
                type="compass" />
                <span class="title">发现</span>
            </li>
            <!-- <li >
                <a-icon theme="filled" 
                type="fire" />
                <span class="title">热门</span>
            </li> -->
            <li @click="changeMeun(MODE.FOLLOW)" v-if="token != null" :class="queryParam.mode == MODE.FOLLOW ? 'item active': 'item'">
                <a-icon theme="filled" 
                type="contacts" />
                <span class="title">关注</span>
            </li>
            <div class="group" v-if="token != null">
                <div :class="myGroupId != 0 ? 'group-text group-active':'group-text'">
                    <a-icon 
                        type="bulb"  
                        theme="filled" />
                    <span class="text">我的圈子</span>
                </div>
                <ul class="group-menu">
                    <li 
                    @click="changeMyGroup(item.id)"
                    v-for="(item,index) in myGroupList" 
                    :key="index" 
                    :class="myGroupId == item.id ? 'group-item active' : 'group-item'">
                        {{item.title}}
                    </li>
                </ul>
            </div>
            <div class="group">
                <div :class="hotGroupId != 0 ? 'group-text group-active':'group-text'">
                    <a-icon 
                        type="bulb"  
                        theme="filled" />
                    <span class="text">推荐圈子</span>
                </div>
                <ul class="group-menu">
                    <li 
                    @click="changeHotGroup(item.id)"
                    v-for="(item,index) in hotGroupList" 
                    :key="index" 
                    :class="hotGroupId == item.id ? 'group-item active' : 'group-item'">
                        {{item.title}}
                    </li>
                    <li @click="goMoreGroup" class="group-item">
                        更多
                    </li>
                </ul>
            </div>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex"
import {MODE} from "@/shared/mode"
export default {
    props:{
        queryParam:{
            type: Object, //指定传入的类型
            //type 也可以是一个自定义构造器函数，使用 instanceof 检测。
            default: {} //这样可以指定默认的值
        },
        myGroupList:{
            type: Array, //指定传入的类型
            //type 也可以是一个自定义构造器函数，使用 instanceof 检测。
            default: [] //这样可以指定默认的值
        },
        hotGroupList:{
            type: Array, //指定传入的类型
            //type 也可以是一个自定义构造器函数，使用 instanceof 检测。
            default: [] //这样可以指定默认的值
        },
    },
    computed:{
        ...mapState("user",["token"]),
    },
    data(){
        return{
            MODE,
            myGroupId:0,
            hotGroupId:0,
        }
    },
    methods:{
        changeMeun(e){
            this.hotGroupId = 0
            this.myGroupId = 0
            this.$emit('changeMenu',e)
        },
        changeMyGroup(e){
            this.hotGroupId = 0
            this.myGroupId = e
            this.$emit('changeMyGroup',e)
        },
        changeHotGroup(e){
            // this.myGroupId = 0
            // this.hotGroupId = e
            // this.$emit('changeHotGroup',e)
            this.$router.push(`/group/${e}`)
        },
        goMoreGroup(){
            this.$router.push(`/group`)
        }
    }
}
</script>

<style lang="less" scoped>
.left{
    top: 120px;
    position: fixed;
    width: 200px;
    .menu{
        width: 200px;
        background: white;
        padding: 8px;
        border-radius: 2px;
        .item{
            cursor: pointer;
            margin-bottom: 2px;
            display: flex;
            align-items: center;
            font-size: 22px;
            padding: 10px 5px;
            .title{
                font-size: 16px;
                margin-left: 10px;
            }
        }
        .active{
            color:#1e80ff;
            border-radius: 2px;
            background: #eaf2ff!important;
        }
        .item:hover{
            color:#1e80ff;
            border-radius: 2px;
            background: #f7f8fa!important;
        }
        .group{
            .group-text{
                cursor: pointer;
                margin-bottom: 2px;
                display: flex;
                align-items: center;
                font-size: 22px;
                padding: 10px 5px;
                .text{
                    font-size: 16px;
                    margin-left: 10px;
                }
            }
            .group-active{
                color:#1e80ff;
            }
            .group-text:hover{
                color:#1e80ff;
                border-radius: 2px;
                background: #f7f8fa!important;
            }

            .group-menu{
                .group-item{
                    cursor: pointer;
                    margin-bottom: 2px;
                    display: flex;
                    align-items: center;
                    font-size: 22px;
                    padding: 10px 5px;
                    font-size: 16px;
                    padding-left: 34px;
                }
                .active{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #eaf2ff!important;
                }
                .group-item:hover{
                    color:#1e80ff;
                    border-radius: 2px;
                    background: #f7f8fa!important;
                }
            }

        }
    }
}
</style>