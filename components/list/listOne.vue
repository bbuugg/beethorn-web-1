<template>
    <div class="article_item">
        <div class="article_show"></div>
        <div class="article_item_img">
            <nuxt-link :to="{path:`/article/${info.id}` }" class="cover-link">
                <img :src="info.cover | resetImage(240,170)" :alt="info.title">
            </nuxt-link>
        </div>
        <div class="article_item_content">
            <!-- 标题 -->
            <div class="item_content_title">
                <h1 class="item_title">
                    <a-tag v-if="isMember && info.status == 3" color="#f50">
                        未通过
                    </a-tag >
                    <a-tag v-if="isMember  && info.status == 1" color="#2db7f5">
                        待审核
                    </a-tag>
                    <a-tag v-if="isMember  && info.status == 2" color="#87d068">
                        已通过
                    </a-tag>
                    <a-tag v-if="isMember  && info.status == 4" >草稿</a-tag>
                    <nuxt-link :to="{path:`/article/${info.id}` }" class="cover-link">
                        <span class="title">{{info.title}}</span>
                    </nuxt-link>

                </h1>
                <!-- <div class="item_date">
                    <span class="icon"><a-icon type="clock-circle" /></span>
                    <span class="date">{{info.createTime | resetData}}</span>
                </div> -->
            </div>
            <!-- 简介 -->
            <nuxt-link :to="{path:`/article/${info.id}` }" class="cover-link">
                <p>{{info.description}}</p>
            </nuxt-link>
            <!-- meta信息 -->
            <div class="item_content_meta" v-if="!isMember">
                <div class="item_content_avatar">
                    <nuxt-link v-if="info.userInfo != null"  :to="{path:'/profile/' + info.userInfo.id }" class="item-link">  
                    <Avatar 
                        class="user-avatar"
                        :verifyRight="-2"
                        :verifyBottom="2"
                        :verifySize="10"
                        :isVerify="info.userInfo.isVerify"
                        shape="circle" 
                        :src="info.userInfo.avatar+'@w60_h60'" 
                        :size="28"
                    /> 
                    </nuxt-link>
                    <nuxt-link v-if="info.userInfo != null"  :to="{path:'/profile/' + info.userInfo.id }" class="item-link">   
                        <span class="item_name">{{info.userInfo.nickName}}</span>
                    </nuxt-link>
                </div>
                <div class="item_content_like">
                    <ul class="meta_info">
                        <li v-if="!isMember && info.cateInfo != null"><span class="cate">{{info.cateInfo.title}}</span></li>
                        <li><span><a-icon type="eye"  theme="filled"/> {{info.views | resetNum}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="item_content_btn" v-if="isMember">
                <a-space size="large">
                    <a-button @click="edit(info.id)" type="dashed">
                        修改
                    </a-button>
                    <a-button @click="remove(info.id)" type="danger">
                        删除
                    </a-button>
                </a-space>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isMember: {
            type: Boolean,
            default: false
        },
        info:{
            type: Object,
            default: {}
        }
    },
    methods:{
        edit(id){
            this.$emit('edit',id);
        },
        remove(id){
            this.$emit('remove',id);
        },
    }
}
</script>

<style lang="less" scoped>

.article_item{
        padding: 20px;
        border-bottom: 1px solid #e0e7eb;
        position: relative;
        width: 100%;
        background-color: white;
        display: flex;
        .article_item_img{
            width: 160px;
            height: 120px;
            cursor: pointer;
            z-index: 5;
            border-radius: 8px;
            img{
                object-fit: cover;
                border-radius: 8px;
                width: 100%;
                height: 100%;
                transform: scale(1);
                transition: transform 0.3s;
            }
        }
        .article_item_content{
            flex:1;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .item_content_title{
                display: flex;
                justify-content: space-between;
                width: 100%;
                .item_title{
                    flex:1;
                    margin: 2px 0;
                    cursor: pointer;
                    z-index: 5;
                    .title{
                        color: rgb(7, 7, 7);
                        font-size: 18px;
                        font-weight: bold;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        text-justify: inter-ideograph;
                        word-break: break-all;
                    }
                }
                .item_date{
                   
                    color: #bdbdbd;
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon{
                        margin-right: 10px;
                    }
                }
            }
            p{

                font-size: 14px;
                color: #999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-justify: inter-ideograph;
                word-break: break-all;
                margin-top: 5px;
                
            }
            .item_content_meta{
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .item_content_avatar{
                    a{
                        color:#99a2aa;
                    }
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .item_name{
                        margin-left: 10px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
                .meta_info{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    li{
                        padding-right: 8px;
                        .cate{
                            background: #3d7eff;
                            margin: 1px 5px 1px 0;
                            padding: 4px 10px;
                            color: #fff;
                            border-radius: 2px;
                            font-size: 12px;
                            font-weight: bold;
                        }
                        span{
                                font-size: 13px;
                                color: #bdbdbd;
                        }
                    }
                }
            }
            .item_content_btn{
                display: flex;
                z-index: 5;
                justify-content: flex-end;
            }
        }
        .article_show{
            opacity: 0;
            filter: alpha(opacity=0);
            // position: absolute;
            z-index: 1;
            top: 0px;
            right: 0px;
            bottom: 0;
            left: 0px;
            background-color: #fff;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
            transition: all .2s;
        }
        .article_show::after{
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            border: 3px solid #3d7eff;
        }
}
.article_item:hover{
    // border: 3px solid #3d7eff;
    .article_show{
        opacity: 1;
        transition: all .2s;
    }
    .title{
        color: #3d7eff;
    }
    .article_item_img{
        img{
            transform: scale(1.05);
        }
    }

}

@media only screen and (max-width: 768px) {
    .article_item{
        .article_item_content{
            .item_content_title{
                display: flex;
                flex-direction: column;
                width: 100%;
                .item_title{
                    margin: 2px 0;
                    .cate{
                        background: #3d7eff;
                        margin: 1px 5px 1px 0;
                        padding: 4px 10px;
                        color: #fff;
                        border-radius: 2px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .title{
                        font-size: 18px;
                        font-weight: bold;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        text-justify: inter-ideograph;
                        word-break: break-all;
                    }
                }
                .item_date{
                    color: #bdbdbd;
                    font-size: 14px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .icon{
                        margin-right: 10px;
                    }
                }
            }
            p{
                display: none;
            }
            .item_content_meta{
                display: none;
            }
        }
        .article_item_img{
            width: 160px;
            height: 90px;
            img{
                width: 100%;
                height: 100%;
                transform: scale(1);
                transition: transform 0.3s;
            }
        }
    }
    

}
</style>