<template>
  <a-layout theme="light">
    <a-layout>

      <a-layout-header class="header">
        <div class="header-top" >
          <div class="header-top-menu" :style="{width:design.width+'px'}">
            <a-input-search 
              v-model="keyword"
              placeholder="请输入搜索内容" 
              style="width: 200px" @search="onSearch" />
            <ul class="top-menu">
              <!-- <li>
                <nuxt-link :to="`/nav`">
                  导航
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/verify`">
                  实名认证
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/vip`">
                  开通会员
                </nuxt-link>
              </li> -->
              <li>
                <nuxt-link :to="`/download`">
                  下载APP
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/member`">
                  创作中心
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="header-bottom">
          <div class="header-bottom-logo-menu-user-search" :style="{width:design.width+'px'}" >
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
                    <nuxt-link :class="selectedKeys[0] == '/article' ? 'active' : ''" class="link" :to="`/article`">
                      文章
                    </nuxt-link>
                  </li>
                  <li class="item">
                    <nuxt-link :class="selectedKeys[0] == '/discover' ? 'active' : ''" class="link" :to="`/discover`">
                      发现
                    </nuxt-link>
                  </li>
                  <li class="item">
                    <nuxt-link :class="selectedKeys[0] == '/video' ? 'active' : ''" class="link" :to="`/video`">
                      视频
                    </nuxt-link>
                  </li>
                  <li class="item">
                    <nuxt-link :class="selectedKeys[0] == '/audio' ? 'active' : ''" class="link" :to="`/audio`">
                      音频
                    </nuxt-link>
                  </li>
                  <li class="item">
                    <nuxt-link :class="selectedKeys[0] == '/edu' ? 'active' : ''" class="link" :to="`/edu`">
                      学习
                    </nuxt-link>
                  </li>
                  <!-- <li class="item">
                    <nuxt-link :class="selectedKeys[0] == '/home' ? 'active' : ''" class="link" :to="`/feed`">
                      社区
                    </nuxt-link>
                  </li> -->
                </ul>
              </div>
              <div class="user-search">
                <a-space :size="15">
                  

                  <nuxt-link :to="`/notice/system`" v-if="token != null && system != 0 || finance != 0 || comment != 0 || answer != 0 || like != 0 || follow != 0">
                    <a-badge dot>
                      <a-icon :style="{fontSize:22+'px',color:'#6a6a6a'}" class="icon" type="bell" />
                    </a-badge>
                  </nuxt-link>
                  
                  <nuxt-link :to="`/notice/system`" v-if="token != null && system == 0 && finance == 0 && comment == 0 && answer == 0 && like == 0 && follow == 0">
                    <a-icon :style="{fontSize:22+'px',color:'#6a6a6a'}" class="icon" type="bell" />
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
        timer:null,
      };
    },
    mounted () {
        this.updateMenu()
        this.getNotice()
        // this.timer = window.setInterval(() => {
        //     setTimeout(() => {
        //         this.getNotice()
        //     },0)
        // },8000)
    },
    destroyed() {
        window.clearInterval(this.timer)
    },
    methods: {
        ...mapMutations("notice",['M_UPDATE_HAVE_NOTICE']),
        ...mapMutations("user",['M_UPDATE_TOKEN']),
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
          this.$cookies.remove("Bertorn-token")
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
          this.$router.push("/notice/system")
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
.header{
  position: fixed;
  z-index: 19;
  width: 100%;
  .header-top{
    background: #111;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-top-menu{
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/.ant-input{
        color: #fff;
        fill: #fff;
        background-color: rgba(204,204,204,0.21);
        border: 0;
      }
      /deep/ .ant-input-search-icon{
        color: #fff;
      }
    
      .top-menu{
        display: flex;
        li{
          a{
            color: #ffffffb3;
          }
          padding: 0 10px;
        }
      }
    }

    .menu-user{
      margin-left: 10px;
      display: flex;
      align-items: center;
      .menu{
        display: flex;
        .item{
            padding: 0 10px;
          a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 16px;
            color: #6a6a6a;
            font-weight: 700;
            font-family: "beethorn-zc";
            .icon{
              font-size: 20px;
              margin-bottom: 5px;
              line-height: 1.2;
            }
          }
        }
        .item:hover{
          a{
            color: rgb(213, 176, 255);
            .icon{
               color: rgb(213, 176, 255);
            }
          }
        }
      }
      .user{
        margin-left: 10px;
        .menu-main-right-user{
            display: flex;
            align-items: center;
            // width: 180px;
            justify-content: flex-end;      
            .meta-avatar{
              // margin: 0 15px;
              cursor: pointer;
            }
        }
        .menus-meta{
            display: flex;
            align-items: center;
            .mmenus-meta-login{
                margin-left: 10px;
                line-height: 0.2;
            }
        }
      }
    }
  }
  .header-bottom{
    background: white;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-bottom-logo-menu-user-search{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-menu{
        display: flex;
        align-items: center;
        .logo{
          height: 60px;
          // width: 140px;
        }
        .menu{
          margin-left: 10px;
          display: flex;
          align-items: center;
          .item{
            height: 60px;
            padding: 0 1.125rem;
            a{
              font-family: "beethorn-zc";
              color: #757575;
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
              color: rgb(248, 156, 64);
              // border-bottom: 2px solid rgb(238, 199, 70);
            }
          }
          .item:hover{
            .link{
              //  color: rgb(248, 156, 64);
              border-bottom: 2px solid rgb(238, 199, 70);
            }
          }
        }
      }

      .user-search{
        .main-user{
          cursor: pointer;
        }
      }
    }
    
  }
  
  
}
.layout-content{
  // height: 100vh;
  margin-top: 40px;
}
.ant-layout-header{
  padding: 0;
  line-height: 0px;
}
.ant-layout-footer{
  padding: 0;
}
.ant-layout{
  background-color: white;
  // background-color: #1c1f2b;
}
</style>