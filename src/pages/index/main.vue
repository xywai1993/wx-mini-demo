<template>
    <div class="container">
        <h1 class="h1" :style="{ color: pageData.color }" @click="pageData.color = 'red'">{{ pageData.msg }}</h1>

        <h2>num:{{ num }} ,num2:{{ num2 }}</h2>
        <button class="mt-30" @click="handle">+1</button>

        <hello-world></hello-world>

        <button class="mt-30" @click="goTo">去原生语法页面</button>
        
    </div>
</template>
<config lang="json">
{
"backgroundColor": "#fff",
"navigationBarTitleText": "此页面展示 类vue3 语法增强",
"usingComponents": {
    "hello-world":"/components/hello-world/main"
  }
}
</config>
<script setup>
/**
 *
 */

import {pp, ppRef, pComputed, watchEffect, onPageLifetimes} from '@yiper.fan/wx-mini-runtime';

const pageData = pp({
    msg: '点我变红',
    color: '#000'
});

const num = ppRef(0);

watchEffect(()=>{
    console.log(num.value,'num变化了');
})

const num2 = pComputed(() => num.value + 100);

const handle = () => {
    num.value++;
};

onPageLifetimes('onLoad',(options)=>{
    console.log('这里是 onLoad回调')
})

onPageLifetimes('onLoad',function (options){
    console.log('这里是第二个onLoad回调',this)
})

const goTo = () => {
  wx.navigateTo({url:'/pages/index2/main'})
}

</script>

<style lang="less" scoped>
.container{
    //展示使用背景图片
    background: url("./static/souyebg@2x.png") left top no-repeat;
}
.h1 {
    margin-top: 40px;
    text-align: center;
}
</style>
