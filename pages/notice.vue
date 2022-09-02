<template>
  <div class="container">
      <div class="account-content" >
        <div class="warper" :style="{ width: design.width + 'px' }">
            <!-- <AccountHeader /> -->
            <!-- 二级路由 -->
            <div class="account-router">
                <div class="account-router-l">
                    <ul>
                        <li class="item">
                            <nuxt-link :to="{path:'/notice/system' }" class="item-link">
                                <span>账户通知</span>
                            </nuxt-link>
                        </li>
                        <li class="item">
                            <nuxt-link :to="{path:'/notice/follow' }" class="item-link">
                                <span>关注通知</span>
                            </nuxt-link>
                        </li>
                        <li class="item">
                            <nuxt-link :to="{path:'/notice/like' }" class="item-link">
                                <span>点赞通知</span>
                            </nuxt-link>
                        </li>
                        <li class="item">
                            <nuxt-link :to="{path:'/notice/comment' }" class="item-link">
                                <span>评论通知</span>
                            </nuxt-link>
                        </li>
                        <li class="item">
                            <nuxt-link :to="{path:'/notice/answer' }" class="item-link">
                                <span>回答通知</span>
                            </nuxt-link>
                        </li>
                        <!-- <li class="item">
                            <nuxt-link :to="{path:'/notice/chat' }" class="item-link">
                                <span>私信</span>
                            </nuxt-link>
                        </li> -->
                    </ul>
                </div>
                <div class="account-router-r">
                    <Nuxt />
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<style lang="less" scoped>
.container{
    margin: 80px 0;
    min-height: 550px;
    .account-content{
        display: flex;
        justify-content: center;
        .warper{
            .account-router{
                display: flex;
                .account-router-l{
                    
                    ul{
                        background: white;
                        width: 200px;
                        padding: 20px;
                        li{
                            height: 40px;
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: flex;
                            align-items: center;
                            position: relative;
                            color: #6b757b;
                            cursor: pointer;
                            span{
                                padding-left: 10px;
                                line-height: 40px;
                                flex: 1;
                                font-weight: 600;
                            }
                            a{
                               color: #6b757b;
                            }
                            .nuxt-link-exact-active{
                                color: #2faee3;
                                font-weight: 600;
                            }
                        }
                        .item::before{
                            content: "\25cf";
                            line-height: 20px;
                            width: 10px;
                            height: 20px;
                            text-align: center;
                        }
                    }
                }
                .account-router-r{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    margin-left: 10px;
                    // justify-content: center;
                    // align-items: center;
                    // margin: 20px 0;
                }
            }
        }
    }
}

// 响应式处理
@media only screen and (max-width: 768px) {
  .container{
    .account-content{
      .warper {
        width: 100% !important;
      }
    }
  }
}
</style>


<script>
import { mapState } from "vuex"
export default {
    asyncData({ redirect,route }) {
        if (route.path == "/notice") {
            redirect("/notice/system")
        }
    },
    data () {
        return {

        }
    },
    computed:{
        ...mapState(["design"])
    },
    mounted () {
        // this.updateMenu()
    },
    methods: {
       
    },
}
</script>