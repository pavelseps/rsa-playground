<template>
    <div>
        <vue-mathjax :formula="xString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Helpers from "@/lib/Helpers";

    @Component({})
    export default class MessageDecrypt extends Vue {
        @Prop({default: 0})
        y!: number;

        @Prop({default: 0})
        m!: number;

        @Prop({default: 0})
        j!: number;

        @Watch("x")
        onJChange() {
            this.$emit("x", this.x);
        }

        get x() {
            return Helpers.expmod(this.y, this.j, this.m);
        }

        get xString() {
            return `$$ x = y^j \\bmod m \\\\
            x = ${this.y}^{${this.j}} \\bmod ${this.m} \\\\
            \\underline{x = ${this.x}} $$`;
        }
    }
</script>

<style scoped lang="scss">

</style>