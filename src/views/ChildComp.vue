<template>
    <div>

    Childgetter: {{childGetter}}
        
    </div>
</template>

<script>
export default {
computed:{
    childGetter(){
        return this.$store.getters.getCounter;
    }
}
}
</script>

<style>

</style>