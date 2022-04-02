<template>
    <div class="container" >

        <p>此页面展示 类vue3 语法增强</p>

        <h1 class="h1" :style="{color:pageData.color}" @click="pageData.color = 'red'">{{pageData.msg}}</h1>

        <h2>num:{{num}} ,num2:{{num2}} </h2>
        <button class="mt-30" @click="handle">+1</button>
    </div>
</template>
<config lang="json">
{
"backgroundColor": "#fff",
"navigationBarTitleText": "编辑个性标签",
"usingComponents": {}
}
</config>
<script setup>

/**
 *
 */

import {pp, ppRef,pComputed, watchEffect} from "@yiper.fan/wx-mini-runtime";

const pageData = pp({
    msg:'点我变红',
    color:'#000'
})

const num = ppRef(0);

const num2 = pComputed(()=>num.value+100);

const handle = () => {
  num.value++;
}







</script>

<style lang="less" scoped>
.h1{
    margin-top: 40px;
    text-align: center;
}
</style>
