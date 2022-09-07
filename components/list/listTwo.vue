<template>
    <div class="list-box">
        <div class="list-box-cover" :style="{ paddingTop: this.height + '%' }">
            <nuxt-link :to="{path:`/${info.module}/${info.id}` }" class="cover-link">
                <img :src="info.cover | resetImage(240,170)" :alt="info.title">
            </nuxt-link>
        </div>
        <div class="list-box-info">
            <nuxt-link :to="{path:`/${info.module}/${info.id}` }" class="cover-link">
                <h2 class="list-box-info-title">{{info.title}}</h2>
            </nuxt-link>
            <nuxt-link :to="{path:`/${info.module}/${info.id}` }" class="cover-link">
                <p>{{info.description}}</p>
            </nuxt-link>
            <div class="list-box-meta">
                <div  class="list-box-cate">
                    <!-- <a-tag color="cyan">
                        cyan
                    </a-tag> -->
                    <span 
                    class="cate" 
                    v-if="info.cateInfo != null">
                    {{info.cateInfo.title}}
                    </span>
                </div>
                <div  class="list-box-like">
                    <a-space>
                        <span><a-icon type="eye" /><span class="value">{{info.views | resetNum}}</span></span>
                    </a-space>
                </div>
            </div>
            <div class="list-box-user-date">
                <nuxt-link v-if="info.userInfo != null" :to="{path:'/profile/' + info.userInfo.id }" class="item-link">
                    <Avatar 
                        class="user-avatar"
                        :margin="5"
                        :verifyBottom="4"
                        :verifySize="10"
                        :isVerify="info.userInfo.isVerify"
                        shape="circle" 
                        :src="info.userInfo.avatar+'@w60_h60'" 
                        :size="28"
                    /> 
                </nuxt-link>
                <div class="list-user-date">
                    <nuxt-link v-if="info.userInfo != null"  :to="{path:'/profile/' + info.userInfo.id }" class="item-link">   
                        <h2 class="user-name">{{info.userInfo.nickName}}</h2>
                    </nuxt-link>
                    <span>{{info.createTime | resetData}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.list-box{
    border-radius: 8px;
    background-color: #fff;
    .list-box-cover{
        position: relative;
        height: 0;
        overflow: hidden;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        .cover-link{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            img{
                object-fit: cover;
                border-top-right-radius: 8px;
                border-top-left-radius: 8px;
                display: block;
                max-width: 100%;
                max-height: 100%;
                background-color: #fff;
                width: 100%;
                height: 100%;
            }
        }

    }
    .list-box-info{
        padding: 10px;
        .list-box-info-title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            // line-height: 44px;
            font-weight: 700;
            font-size: 14px;
        }
        p{
            margin: 10px 0;
            font-size: 14px;
            color: #999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-justify: inter-ideograph;
            word-break: break-all;
        }
        .list-box-meta{
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .list-box-cate{
                .cate{
                    background: rgba(0, 176, 240, 0.14);
                    margin: 1px 5px 1px 0;
                    padding: 2px 4px;
                    color: #2997f7;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: bold;
                }
            }
            .list-box-like{
                font-size: 12px;
                .value{
                    margin-left: 5px;
                }
            }
        }
        .list-box-user-date{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .list-user-date{
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                h2{
                    font-size: 14px;
                    font-weight: 400;
                }
                span{
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }
}
.list-box:hover{
    box-shadow: 10px 10px 10px rgba(0,0,0,.03);
    transition: box-shadow .3s;
}
</style>

<script>
import Avatar from "@/components/avatar/avatar"
import {MODULE} from "@/shared/module"
export default {
    props: {
        height: {
            type: Number,
            default: 70
        },
        info:{
            type: Object,
            default: {}
        }
    },
    components:{
        Avatar
    },
    filters: {
        restModule(value) {
            switch (value) {
                case MODULE.RESOURCE:
                    return "资源"
                case MODULE.VIDEO:
                    return "视频"
                case MODULE.AUDIO:
                    return "音频"
            }
        },
    },
}
</script>