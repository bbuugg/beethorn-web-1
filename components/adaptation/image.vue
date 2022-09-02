<template>
    <div class="iamge">
        <div v-if="list.length == 1" class="image-one">
            <img @click="show(0)" :src="list[0]| resetImage(195,160)" alt="">
        </div>
        <div v-if="list.length == 2" class="image-two">
            <img @click="show(0)" :src="list[0] | resetImage(195,160)" alt="">
            <span class="size-box"></span>
            <img @click="show(1)" :src="list[1] | resetImage(195,160)" alt="">
        </div>
        <div v-if="list.length >= 3" class="image-three">
            <img  @click="show(0)" :src="list[0] | resetImage(195,160)" alt="">
            <span class="size-box"></span>
            <img  @click="show(1)" :src="list[1] | resetImage(195,160)" alt="">
            <span class="size-box"></span>
            <img  @click="show(2)" :src="list[2] | resetImage(195,160)" alt="">
            <span v-if="list.length > 3" class="count">{{list.length}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        list: {
            type: Array,
            required: false,
            default: []
        },
    },
    data(){
        return{
            
        }
    },
    methods:{
        show(i){
            this.$ImgPreview(this.list,i)
        },
    }
}
</script>

<style lang="less" scoped>
.iamge{
    margin-top: 10px;
    .image-one{
        width: 33.333%;
        img{
            cursor: pointer;
            width: 100%;
        }
    }
    .image-two{
        display: flex;
        .size-box{
            width: 10px;
        }
        img{
            cursor: pointer;
            border-radius: 8px;
            object-fit: cover;
            width: 200px;
            height: 200px;
        }
    }
    .image-three{
        position: relative;
        display: flex;
        .size-box{
            width: 10px;
        }
        img{
            cursor: pointer;
            border-radius: 8px;
            object-fit: cover;
            width: 200px;
            height: 200px;
        }
        .count{
            position: absolute;
            right: 10px;
            top: 10px;
            height: 24px;
            line-height: 24px;
            border-radius: 15px;
            -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
            padding: 0 8px;
            font-size: 13px;
            font-weight: 500;
            color: #fff;
            white-space: nowrap;
            background-color: rgba(26,26,26,.3);
        }
    }
    .show-box{
        padding: 10px 20px;
        background: #fafafa;
        .tools-menu{
            display: flex;
            align-items: center;
            .item{
                margin-right: 20px;
                cursor: pointer;
                user-select: none;
                display: flex;
                align-items: center;
                .text{
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
        }
        .show-image{
            margin-top: 10px;
            width: 100%;
            img{
                border-radius: 8px;
                width: 100%;
                height: 100%;
                // max-height: 400px;
                margin: auto;
            }
        }
    }
}

</style>