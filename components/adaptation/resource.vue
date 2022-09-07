<template>
    <div>
        <div class="link" v-for="(item,index) in list" :key="index">
            <div class="icon">
                <a-icon type="rocket" />
            </div>
            <div class="url">
                {{item.link}}
            </div>
            <div class="pass">
                {{item.pass}}
            </div>
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
}
</script>

<style lang="less" scoped>
.link{
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 1;
    align-items: center;
    background-color: #f5f6f7;
    overflow: hidden;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    .icon{
            text-transform: uppercase;
            padding: 10px;
            background: #2DB0F9;
            color: #fff;
            position: relative;
            margin-right: 8px;
    }
    .url{
        width: 0;
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 10px;
    }
    .pass{
        margin-right: 16px;
        color: #AAAEB3;
    }
}
</style>