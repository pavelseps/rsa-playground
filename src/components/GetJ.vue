<template>
    <div>
        <h2 class="tex2jax_ignore mb-8">Výpočet soukromého exponentu j</h2>
        <vue-mathjax :formula="jString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>

        <v-divider class="mt-3 mb-8"></v-divider>

        <h2 class="tex2jax_ignore mb-8">Ověření, že platí  (i * j) mod (p-1)(q-1) = 1</h2>
        <vue-mathjax :formula="testJString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>

        <template v-if="isValid">
            <v-sheet color="success" class="text-center white--text pa-4 mt-6">✔ Ověření platí</v-sheet>
        </template>
        <template v-else>
            <v-sheet color="error" class="text-center white--text pa-4 mt-6">❌ Ověření neplatí, použijte jiné prvočíslo i</v-sheet>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Helpers from "@/lib/Helpers";

    @Component({})
    export default class GetJ extends Vue {
        @Prop({default: 0})
        phi!: number;

        @Prop({default: 0})
        i!: number;

        @Prop({default: 0})
        P1Q1!: number;

        @Watch("phi")
        onPhiChange(val: number){
            this.$emit("j", this.j);
            this.$emit("isValid", this.isValid);
        }
        @Watch("i")
        onIChange(val: number){
            this.$emit("j", this.j);
            this.$emit("isValid", this.isValid);
        }
        @Watch("P1Q1")
        onP1Q1Change(val: number){
            this.$emit("j", this.j);
            this.$emit("isValid", this.isValid);
        }

        get isValid(){
            return this.testJ === 1;
        }

        get jString(){
            return `$$ j = i^{PHI() - 1} \\bmod (p-1)*(q-1) \\\\
             j = ${this.i}^{${this.phi} - 1} \\bmod ${this.P1Q1} \\\\
             j = ${this.i}^{${this.phi - 1}} \\bmod ${this.P1Q1} \\\\
             \\underline{j = ${this.j}} $$`;
        }

        get j(){
            return Helpers.expmod(this.i, this.phi - 1, this.P1Q1);
        }

        get testJString(){
            return `$$ 1 = (i * j) \\bmod (p-1)*(q-1) \\\\
              1 = (${this.i} * ${this.j}) \\bmod ${this.P1Q1} \\\\
              \\underline{1 = ${this.testJ}} $$`;
        }

        get testJ(){
            return (this.i * this.j) % this.P1Q1;
        }
    }
</script>

<style scoped lang="scss">

</style>