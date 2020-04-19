<template>
    <div>
        <vue-mathjax :formula="yString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Helpers from "@/lib/Helpers";

    @Component({})
    export default class MessageEncrypt extends Vue {
        @Prop({default: 0})
        x!: number;

        @Prop({default: 0})
        m!: number;

        @Prop({default: 0})
        i!: number;

        @Watch("y")
        onJChange() {
            this.$emit("y", this.y);
        }

        get y() {
            return Helpers.expmod(this.x, this.i, this.m);
        }

        get yString() {
            return `$$ y = x^i \\bmod m \\\\
             y = ${this.x}^{${this.i}} \\bmod ${this.m} \\\\
             \\underline{y = ${this.y}} $$`;
        }
    }
</script>

<style scoped lang="scss">

</style>