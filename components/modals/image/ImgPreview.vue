<template>
    <div @click="close"  class="img-preview-box center opacity" :class="[isTrue && 'is-back-show']">
        <div class="close" @click="close">
            <a-icon type="close" />
        </div>
        
        <div class="img-preview" ref="rotate">
            <img :src="imgSrc">
        </div>
        <div class="tools">
            <div class="menu">
                <span class="icon" @click.stop="previous()"><a-icon type="arrow-left" /></span>
                <span class="icon" @click.stop="next()"><a-icon type="arrow-right" /></span>
                <span class="icon" @click.stop="view()"><a-icon type="search" /></span>
                <span class="icon" @click.stop="rotate()"><a-icon type="retweet" /></span>
            </div>
        </div>
        <div class="list-bottom">
            <ul class="image-list">
                <li @click.stop="changeShowImage(index)" :class="index==activeIndex?'item active': 'item'" v-for="(item,index) in list" :key="index">
                    <img :src="item">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            imgSrc: null,
            activeIndex: 0,
            list: [],
            deg: 0,


            // 登录输入框
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    methods: {
        async confirm(
            list,
            activeIndex
        ) {
            this.open();
            
            this.list = list
            this.activeIndex = activeIndex
            this.imgSrc = this.list[this.activeIndex]
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare'};
                const that = this
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            if (!that.multiple) {
                                resolve(that.activeImg);
                            } else {
                                resolve(that.activeImgList);
                            }
                        } else {
                            reject(false);
                        }
                        return true
                    }
                });
                this.state = res;
            });
        },
        next(){
            if (this.deg != 0) {
                this.deg = 0
                this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`
            }

            if ((this.activeIndex + 1) == this.list.length) {
                this.activeIndex = 0
                this.imgSrc = this.list[this.activeIndex]
                return
            }
            this.activeIndex++
            this.imgSrc = this.list[this.activeIndex]
            return
        },
        previous(){
            if (this.deg != 0) {
                this.deg = 0
                this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`
            }
            if (this.activeIndex == 0) {
                this.activeIndex = this.list.length - 1
                this.imgSrc = this.list[this.activeIndex]
                return
            }
            this.activeIndex--
            this.imgSrc = this.list[this.activeIndex]
            return
        },
        view(){
            window.open(this.imgSrc,'_blank')
        },
        rotate(){
            this.deg += 90
            if (this.deg >= 360) {
                this.deg = 0
            }
            this.$refs.rotate.style.transform = `rotate(${this.deg}deg)`
        },
        changeShowImage(i){
            this.activeIndex = i
            this.imgSrc = this.list[this.activeIndex]
        },
        open() {
            this.isTrue = true;
        },
        close() {
            this.isTrue = false;
        },
        
    }
};
</script>

<style lang="less" scoped>
    .img-preview-box {
        user-select: none;
        pointer-events: none;
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transform: perspective(1px) scale(1.1);
        transition: visibility 0s linear .15s,opacity .15s 0s,transform .15s;
        .close{
            position: fixed;
            right: 0;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.37);
            cursor: pointer;
            user-select: none;
            color: rgba(255, 255, 255, 0.65);
            font-size: 26px;
            border-bottom-left-radius: 50%;
        }
        .img-preview{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            img{
                max-width: 50%;
                max-height: 100%;
            };
        } 
        .tools{
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            position: fixed;
            bottom: 70px;
            height: 60px;
            .menu{
                padding: 10px;
                border-radius: 20px;
                background: rgba(0, 0, 0, 0.37);
                .icon{
                    cursor: pointer;
                    user-select: none;
                    color: rgba(255, 255, 255, 0.65);
                    font-size: 30px;
                    padding: 20px;
                }
            }
            
        }
        .list-bottom{
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            position: fixed;
            bottom: 0;
            // height: 60px;
            background: rgba(0, 0, 0, 0.37);
            .image-list{
                width: 800px;
                display: flex;
                align-items: center;
                justify-content: center;
                .item{
                    cursor: pointer;
                    user-select: none;
                    padding: 5px;
                    height: 60px;
                    width: 60px;
                    border-radius: 8px;
                    img{
                        border-radius: 8px;
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
                .active{
                    img{
                        border: 2px solid #007aff;
                        box-shadow: 0 0 4px rgb(0 122 255 / 50%);
                        box-sizing: border-box;
                    }
                }
            }
        }
    }
    .is-back-show {
        opacity: 1 !important;
        background: rgba(42, 44, 48, 0.7);
        pointer-events: auto !important;
        visibility: visible;
        transform: perspective(1px) scale(1);
        transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
    }

    @media only screen and (max-width: 768px) {
    }
</style>