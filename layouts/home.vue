<template>
  <a-layout theme="light">
    <a-layout>

      <a-layout-header :class="!isFixed ? 'header': 'bheader'">
        <div class="header-bottom">
          <div class="header-box">
              <div class="header-bottom-logo-menu-user-search" :style="{width:design.width+300+'px'}" >
                <div class="logo-menu">
                  <div class="logo">
                    <img :src="base.logo" :alt="base.title">
                  </div>
                  <ul class="menu">
                    <li class="item">
                      <nuxt-link :class="selectedKeys[0] == '' ? 'active' : ''" class="link" :to="`/`">
                        首页
                      </nuxt-link>
                    </li>
                    <li class="item">
                      <nuxt-link :class="selectedKeys[0] == '/news' ? 'active' : ''" class="link" :to="`/news`">
                        文章
                      </nuxt-link>
                    </li>
                    <li class="item">
                      <nuxt-link :class="selectedKeys[0] == '/discover' ? 'active' : ''" class="link" :to="`/discover`">
                        资源
                      </nuxt-link>
                    </li>
                    <li class="item">
                      <nuxt-link :class="selectedKeys[0] == '/edu' ? 'active' : ''" class="link" :to="`/edu`">
                        学院
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
                <div class="user-search">
                  <a-space :size="15">
                    <a-input-search 
                      v-model="keyword"
                      placeholder="请输入搜索内容" 
                      style="width: 200px" @search="onSearch" />

                    <nuxt-link :to="`/messages/system`" v-if="token != null && system != 0 || finance != 0 || comment != 0 || answer != 0 || like != 0 || follow != 0">
                      <a-badge dot>
                        <a-icon :style="{fontSize:22+'px',color:!isFixed?'#fff':'#000'}" class="icon" type="bell" />
                      </a-badge>
                    </nuxt-link>
                    
                    <nuxt-link :to="`/messages/system`" v-if="token != null && system == 0 && finance == 0 && comment == 0 && answer == 0 && like == 0 && follow == 0">
                      <a-icon :style="{fontSize:22+'px',color:!isFixed?'#fff':'#000'}" class="icon" type="bell" />
                    </nuxt-link>

                    <div class="user">
                      <div v-if="token != null" class="main-user">
                        <a-dropdown 
                        :trigger="['click']" 
                        placement="bottomCenter" >
                          <a-avatar 
                          shape="square"
                          :src="userInfo.avatar+'@w60_h60'"
                          class="meta-avatar" 
                          :size="35" icon="user" />
                          <a-menu  slot="overlay">
                              <a-menu-item @click="goProfile" key="0">
                                  <a-icon type="user" />
                                  我的主页
                              </a-menu-item>
                              <a-menu-item key="1" @click="goSetting('/account/wallet')">
                                  <a-icon type="wallet" />
                                  我的钱包
                              </a-menu-item>
                              <a-menu-item key="3" @click="goSetting('/account/course')">
                                  <a-icon type="laptop" />
                                  我的课程
                              </a-menu-item>
                              <a-menu-item key="4" @click="goSetting('/account')">
                                  <a-icon type="setting" />
                                  <span>设置中心</span>
                              </a-menu-item>
                              <a-menu-divider />
                              <a-menu-item key="5" @click="logout">
                                  <a-icon type="logout" />
                                  退出
                              </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                      <div v-if="token == null" class="menus-meta">
                        <a-button @click="toLogin" type="dashed" class="mmenus-meta-login">登录</a-button>
                        <a-button @click="toRegister" type="primary" class="mmenus-meta-login">注册</a-button>
                      </div>
                    </div>
                  </a-space>
                  
                </div>
              </div>
          </div>
          <div class="mask"></div>
          <div v-if="!isFixed" class="cover-box" :style="{ height: `174.19px` }">
            <img class="cover" src="http://localhost:8199/public/uploads/2021-11-19/cftskpi0mwiskcldfg.jpg">
          </div>
        </div>
      </a-layout-header>

      <a-layout-content class="layout-content">
        <transition name="page-transition">
          <Nuxt />
        </transition>
      </a-layout-content>

      <a-layout-footer>
        <p-footer/>
        <!-- <MPlayer /> -->
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import PFooter from "@/components/footer/Footer"
import FIcon from "@/components/icon/FIcon"
// import MPlayer from "@/components/player/audioPlayer"
import { mapState,mapMutations } from "vuex"
import api from "@/api/index"
export default {
    components: {
      PFooter,
      FIcon
      // MPlayer
    },
    computed:{
        ...mapState(["design","base"]),
        ...mapState("user",["token","userInfo"]),
        ...mapState("notice",["system","finance","comment","answer","like","follow"])
    },
    data() {
      return {
        keyword:"",
        openKeys: [],
        selectedKeys: [],
        list:[],
        timer:null,
        isFixed:false,
      };
    },
    mounted () {
        window.addEventListener('scroll',this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
        this.getData()
        this.updateMenu()
        this.getNotice()
        this.timer = window.setInterval(() => {
            setTimeout(() => {
                this.getNotice()
            },0)
        },8000)
    },
    destroyed() {
        window.clearInterval(this.timer)
    },
    methods: {
        ...mapMutations("notice",['M_UPDATE_HAVE_NOTICE']),
        ...mapMutations("user",['M_UPDATE_TOKEN']),
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
          
            this.isFixed = scrollTop > 174 ? true : false
            // console.log(this.isFixed)
        },
        async getNotice(){
          if (this.token != null) {
            try {
              const res = await this.$axios.get(api.getNoticeCount)
              if (res.code != 1) {
                  this.$message.error(
                      res.message,
                      3
                  )
                  return
              }
              this.M_UPDATE_HAVE_NOTICE(res.data.info)
          } catch (error) {
              console.log(error)
          }
          }
          
        },
        async getData(){
          
            const queryParam = {
                page:1,
                limit: 5,
                cateId: 0,
                tagId: 0,
                mode: 1,
                module:"group"
            }
          
            const res = await this.$axios.get(api.getSystemFilter,{params:queryParam})
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
        toLogin(){
            this.$Auth("login","登录","快速登录")
        },
        async logout(){
          const res = await this.$axios.post(api.postLogout)
          if (res.code != 1) {
              this.$message.error(
                  res.message,
                  3
              )
              return
          }
          this.M_UPDATE_TOKEN(null)
          this.$cookies.remove("beethorn-token")
        },
        toRegister(){
            this.$Auth("register","用户注册","立即注册")
        },
        goSetting(path){
            this.$router.push(path)
        },
        goProfile(){
            this.$router.push(`/profile/${this.userInfo.userId}`)
        },
        goMember(){
            this.$router.push(`/member/article/list`)
        },
        goMessage(){
          // this.$setWs.initWebSocket()
          this.$router.push("/messages/system")
        },
        onSearch(){
            this.$router.push({
                path:"/search",
                query:{
                    keyword:this.keyword
                }
            })
        },
        onOpenChange (openKeys) {
        this.openKeys = openKeys
        },
        updateMenu () {
          if (this.$route.path != "/404") {
            const routes = this.$route.matched.concat()
            this.selectedKeys = [ routes.pop().path ]
          }
        }
    },
    watch: {
        '$route' (val) {
          this.updateMenu()
        }
    }
}
</script>


<style lang="less" scoped>
/deep/ .ant-layout-header{
  height: 60px;
  background:none;
}
.header{
  // position: fixed;
  z-index: 999;
  width: 100%;
  .header-bottom{
    position: relative;
    .header-box{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(204,204,204,0.21);
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
      height: 60px;
      .header-bottom-logo-menu-user-search{
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 2;
        .logo-menu{
          display: flex;
          align-items: center;
          .logo{
            height: 60px;
            width: 140px;
            background-color: rgb(140, 111, 235);
          }
          .menu{
            margin-left: 10px;
            display: flex;
            align-items: center;
            .item{
              height: 60px;
              padding: 0 1.125rem;
              a{
                color: rgb(255, 255, 255);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                font-size: .9375rem;
                font-weight: 600;
                word-spacing: 2px;
                text-transform: uppercase;
                letter-spacing: 1px;
                
              }
              .active{
                color: rgb(255, 255, 255);
                border-bottom: 2px solid rgb(255, 255, 255);
              }
            }
            .item:hover{
              .link{
                color: rgb(229, 197, 255);
                border-bottom: 2px solid rgb(229, 197, 255);
              }
            }
          }
        }

        .user-search{

          /deep/.ant-input{
              color: #000;
              fill: #000;
              background-color: #f1f2f3;
              border: 0;
          }
          /deep/ .ant-input-search-icon{
              color: #000;
          }
          .main-user{
            cursor: pointer;
          }
        }
      }
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100px;
      background: linear-gradient(rgba(0,0,0,.4),transparent);
      pointer-events: none;
    }
    .cover-box{
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 0;
      background-color: red;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.bheader{
  position: fixed;
  z-index: 999;
  width: 100%;
  .header-bottom{
    background-color: white;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-box{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
      height: 60px;
      .header-bottom-logo-menu-user-search{
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo-menu{
          display: flex;
          align-items: center;
          .logo{
            height: 62px;
            width: 140px;
            background-color: rgb(140, 111, 235);
          }
          .menu{
            margin-left: 10px;
            display: flex;
            align-items: center;
            .item{
              height: 62px;
              padding: 0 1.125rem;
              a{
                color: rgb(0, 0, 0);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 62px;
                font-size: .9375rem;
                font-weight: 600;
                word-spacing: 2px;
                text-transform: uppercase;
                letter-spacing: 1px;
                
              }
              .active{
                color: rgb(229, 197, 255);
                border-bottom: 2px solid rgb(229, 197, 255);
              }
            }
            .item:hover{
              .link{
                color: rgb(229, 197, 255);
                border-bottom: 2px solid rgb(229, 197, 255);
              }
            }
          }
        }

        .user-search{

          /deep/.ant-input{
              color: #000;
              fill: #000;
              background-color: #f1f2f3;
              border: 0;
          }
          /deep/ .ant-input-search-icon{
              color: #000;
          }
          .main-user{
            cursor: pointer;
          }
        }
      }
    }
    
    
  }

  .cover-box{
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: red;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.layout-content{
  background: white;
}
.ant-layout-header{
  padding: 0;
  line-height: 0px;
}
.ant-layout-footer{
  padding: 0;
}
</style>