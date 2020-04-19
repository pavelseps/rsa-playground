<template>
    <div>
        <vue-mathjax :formula="mString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Helpers from "@/lib/Helpers";

    @Component({})
    export default class GetJ extends Vue {
        @Prop({default: 0})
        p!: number;

        @Prop({default: 0})
        q!: number;

        @Watch("m")
        onJChange(){
            this.$emit("m", this.m);
        }

        get mString(){
            return `$$ m = p * q \\\\
             m = ${this.p} * ${this.q} \\\\
             \\underline{m = ${this.m}} $$`;
        }

        get m(){
            return this.p * this.q;
        }
    }
</script>

<style scoped lang="scss">

</style>