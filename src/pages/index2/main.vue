<template>
    <view class="container">
        <view class="h1" >{{ msg }}</view>

        <view>num:{{ num }} </view>
        <button class="mt-30" bind:tap="handle">+1</button>

        <hello-world></hello-world>
    </view>
</template>
<config lang="json">
{
"backgroundColor": "#fff",
"navigationBarTitleText": "此页面展示小程序原生语法",
"usingComponents": {
    "hello-world":"/components/hello-world/main"
  }
}
</config>
<script >
Page({
    data:{
        num:0,
        msg:'小程序语法页面'
    },
    onLoad(query) {
        console.log(this,query)
    },
    handle(){
        this.setData({num:this.data.num+1})
    }
})

</script>

<style lang="less" scoped>
.h1 {
    margin-top: 40px;
    text-align: center;
}
</style>
