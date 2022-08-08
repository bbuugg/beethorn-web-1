<template>
  <div class="container">
      <div class="account-content">
        <div class="warper" :style="{ width: this.design.width + 'px' }">
            <!-- <AccountHeader /> -->

            <!-- 二级路由 -->
            <a-row class="account-router" :gutter="[{md:12}]">
                <a-col :span="24" :md="6">
                    <!-- <Author /> -->
                    <a-menu
                        mode="inline"
                        :selectedKeys="selectedKeys"
                        type="inner"
                        @openChange="onOpenChange"
                        >
                        <a-menu-item-group key="user">
                            <template slot="title"><span>社区中心</span> </template>
                            <a-menu-item key="/account/favorite">
                                <nuxt-link :to="{ name: 'account-favorite' }">
                                    我的收藏
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/course">
                                <nuxt-link :to="{ name: 'account-course' }">
                                    报名的课程
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/resource">
                                <nuxt-link :to="{ name: 'account-resource' }">
                                    购买的内容
                                </nuxt-link>
                            </a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group key="account">
                            <template slot="title"><span>账户中心</span> </template>
                            <a-menu-item key="/account/base">
                                <nuxt-link :to="{ name: 'account-base' }">
                                    基本设置
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/bind">
                                <nuxt-link :to="{ name: 'account-bind' }">
                                    账户绑定
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/wallet">
                                <nuxt-link :to="{ name: 'account-wallet' }">
                                    我的钱包
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/vip">
                                <nuxt-link :to="{ name: 'account-vip' }">
                                    会员中心
                                </nuxt-link>
                            </a-menu-item>

                            <a-menu-item key="/account/verify">
                                <nuxt-link :to="{ name: 'account-verify' }">
                                    认证服务
                                </nuxt-link>
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-menu>
                </a-col>
                <a-col :span="24" :md="18">
                    <Nuxt />
                </a-col>
            </a-row>
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
            width: 100%;
            .account-router{
                margin: 10px 0;
            }
        }
    }
}

// 响应式处理
// @media only screen and (max-width: 768px) {
//   .container{
//     .account-content{
//       .warper {
//         width: 100% !important;
//       }
//     }
//   }
// }
</style>


<script>
import { mapState } from "vuex"
export default {
    asyncData({ redirect,route }) {
        if (route.path == "/account" || route.path == "/account/") {
            redirect("/account/base")
        }
    },
    data () {
        return {
        // horizontal  inline
        //   mode: 'inline',
        openKeys: [],
        selectedKeys: [],
        }
    },
    head(){
        return this.$seo(`用户中心-${this.base.title}`,`用户中心`,[{
            hid:"beethorn",
            name:"description",
            content:`用户中心`
        }])
    },
    computed:{
        ...mapState(["design","base"])
    },
    mounted () {
        this.updateMenu()
    },
    methods: {
        onOpenChange (openKeys) {
        this.openKeys = openKeys
        },
        updateMenu () {
            const routes = this.$route.matched.concat()
            this.selectedKeys = [ routes.pop().path ]
        }
    },
    watch: {
        '$route' (val) {
            this.updateMenu()
        }
    }
}
</script>