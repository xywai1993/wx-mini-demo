<template>
    <div class="item">
        <div class="mt-30">下面是组件内容</div>
        <div >{{ msg }}</div>

    </div>
</template>
<config lang="json">
{
    "component": true
}
</config>
<script>

Component({
    options: {
        styleIsolation: 'apply-shared'
    },
    data:{
        msg:'hello world'
    }
})

</script>

