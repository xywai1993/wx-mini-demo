<template></template>
<script>
//app.js

App({
    onLaunch: function () {
        this.globalData = {};
    },
});
</script>
<style lang="less">
@import url("@yiper.fan/wx-mini-utils/style/layout.less");

// 全局样式写在这
::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

</style>
