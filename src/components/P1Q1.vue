<template>
    <div>
        <h2 class="tex2jax_ignore mb-4">Výpočet (p-1)(q-1)</h2>
        <vue-mathjax :formula="P1Q1formula" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>

        <v-divider class="mt-3 mb-8"></v-divider>

        <h2 class="tex2jax_ignore mb-4">Rozklad výsledku (p-1)(q-1) na prvočinitele</h2>
        <vue-mathjax :formula="factorString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>

        <v-divider class="mt-3 mb-8"></v-divider>

        <h2 class="tex2jax_ignore mb-4">Výpočet PHI((p-1)(q-1)) pomocí Eulerovy funkce</h2>
        <vue-mathjax :formula="PHIString" :options="{jax: ['input/TeX','output/HTML-CSS'], displayAlign: 'left'}"></vue-mathjax>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({})
    export default class P1Q1 extends Vue {
        factor: { [num: string]: number } = {};

        @Prop({default: 0})
        q!: number;

        @Prop({default: 0})
        p!: number;

        @Watch("p")
        onPChange() {
            this.factorUpdate();
        }

        @Watch("q")
        onQChange() {
            this.factorUpdate();
        }

        @Watch("P1Q1")
        onP1Q1Change() {
            this.$emit("P1Q1", this.P1Q1);
        }

        @Watch("phi")
        onPhiChange() {
            this.$emit("phi", this.phi);
        }

        mounted() {
            this.factorUpdate();
        }

        get P1Q1() {
            return (this.p - 1) * (this.q - 1);
        }

        get P1Q1formula() {
            return `$$(p-1)*(q-1) = (${this.p}-1)*(${this.q}-1) \\\\
             (p-1)*(q-1) = ${this.p - 1}*${this.q - 1} \\\\
             \\underline{(p-1)*(q-1) = ${this.P1Q1}}$$`;
        }

        get phi() {
            return Object.entries(this.factor)
                .map(a => (parseInt(a[0]) - 1) * Math.pow(parseInt(a[0]), a[1] - 1))
                .reduce((a, b) => a * b, 1);
        }

        get PHIString(): string {
            let result = "$$ PHI() =";

            for (let key in this.factor) {
                result += `(${parseInt(key)} - 1 * ${parseInt(key)}^{${this.factor[key]} - 1})*`
            }

            result = result.substr(0, result.length - 1);
            result += "\\\\ PHI() =";

            for (let key in this.factor) {
                result += `(${parseInt(key) - 1}* ${parseInt(key)}^{${this.factor[key] - 1}})*`
            }

            result = result.substr(0, result.length - 1);
            result += "\\\\ PHI() =";

            for (let key in this.factor) {
                result += `(${parseInt(key) - 1}* ${Math.pow(parseInt(key), this.factor[key] - 1) })*`
            }

            result = result.substr(0, result.length - 1);
            result += "\\\\ PHI() =";

            for (let key in this.factor) {
                result += `${(parseInt(key) - 1) * Math.pow(parseInt(key), this.factor[key] - 1) }*`
            }

            result = result.substr(0, result.length - 1);

            result += `\\\\ \\underline{PHI() = ${this.phi}}`;
            result += "$$";
            return result;
        }

        get factorString(): string {
            let result = `$$ ${this.P1Q1} = `;

            for (let key in this.factor) {
                result += `${key}^${this.factor[key]}*`
            }
            result = result.substr(0, result.length - 1);
            result += "$$";
            return result;
        }

        factorUpdate() {
            this.factor = this.calculateFactor(this.P1Q1);
        }

        /**
         * Inspired
         * http://www.javascripter.net/math/primes/factorization.htm
         */
        calculateFactor(n: number): { [num: number]: number } {
            if (isNaN(n) || !isFinite(n) || n % 1 != 0 || n == 0) return {[n]: 1};
            if (n < 0) return this.calculateFactor(-n);
            let minFactor = this.leastFactor(n);
            if (n == minFactor) return {[n]: 1};

            let result = this.calculateFactor(n / minFactor);

            if (result[minFactor] === undefined) {
                result[minFactor] = 1;
            } else {
                result[minFactor]++;
            }

            return result;
        }

        leastFactor(n: number) {
            if (isNaN(n) || !isFinite(n)) return NaN;
            if (n == 0) return 0;
            if (n % 1 || n * n < 2) return 1;
            if (n % 2 == 0) return 2;
            if (n % 3 == 0) return 3;
            if (n % 5 == 0) return 5;
            let m = Math.sqrt(n);
            for (let i = 7; i <= m; i += 30) {
                if (n % i == 0) return i;
                if (n % (i + 4) == 0) return i + 4;
                if (n % (i + 6) == 0) return i + 6;
                if (n % (i + 10) == 0) return i + 10;
                if (n % (i + 12) == 0) return i + 12;
                if (n % (i + 16) == 0) return i + 16;
                if (n % (i + 22) == 0) return i + 22;
                if (n % (i + 24) == 0) return i + 24;
            }
            return n;
        }
    }
</script>

<style scoped lang="scss">

</style>