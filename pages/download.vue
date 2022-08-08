<template>
    <div class="page-detail">
        <div class="page-box"  :style="{ width: design.width -300+ 'px' }">
            <div class="image-app">
                <img src="https://www.zealer.com/dist/images/download-phone.jpg?3d9005478201f0ae0099f455f47503fe">
            </div>
            <div class="desc">
                <div class="loge-childTitle">
                    <div class="logo">
                        <img :src="base.logo" >
                    </div>
                    <div class="childTitle">
                        {{base.childTitle}}
                    </div>
                </div>
                <div class="description">
                    {{base.description}}
                </div>
                <div class="down-btn-qrcode">
                    <div class="qrcode">
                        <img src="https://www.zealer.com/dist/images/qrcode-app.png?3d9005478201f0ae0099f455f47503fe">
                        <div class="ss">
                            扫码下载
                        </div>
                    </div>
                    <div class="btn">
                        <div class="android">
                            <img src="/img/down/android.png">
                        </div>
                        <div class="ios">
                            <img src="/img/down/ios.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from "vuex"
import api from "@/api/index"
export default {
     head(){
        return this.$seo(`下载app-${this.base.title}`,`${this.base.childTitle}`,[{
            hid:"beethorn-desc",
            name:"description",
            content:`${this.base.description}`
        }])
    },
    async asyncData({params,$axios,redirect,store}){
    
        // const id = parseInt(params.id)
        // const res = await $axios.get(api.getPageInfo,{params:{id:id}})
        // if (res.code != 1) {
        //     redirect("/404")
        // }

        return {
            base:store.state.base,
        }
    },
    computed:{
        ...mapState(["design"]),
    },
}
</script>

<style lang="less" scoped>
.page-detail{
    margin: 100px 0;
    display: flex;
    justify-content: center;
    .page-box{
        margin: 20px;
        min-height: 550px;
        display: flex;
        .image-app{
            width: 340px;
            height: 600px;
            img{
                width: 100%;
                height: 600px;
            }
        }
        .desc{
            margin-left: 50px;
            flex: 1;
            .loge-childTitle{
                display: flex;
                align-items: center;
                .logo{
                    margin-right: 10px;
                    width: 180px;
                    height: 64px;
                }
                .childTitle{
                    color: #575757;
                    font-size: 18px;
                    font-weight: 700;
                }
            }
            .description{
                margin-top: 30px;
                color: #adadad;
                font-size: 14px;
                line-height: 30px;
            }
            .down-btn-qrcode{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 30px;
                .qrcode{
                    padding: 13px 11px 0;
                    background: #3d3d3d;
                    border-radius: 4px;
                    width: 180px;
                    height: 230px;
                    img{
                        width: 100%;
                    }
                    .ss{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 20px 0;
                        color: #fff;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
                .btn{
                    height: 230px;
                    margin-left: 30px;
                    flex-direction: column;
                    display: flex;
                    justify-content: space-between;
                    img{
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>

