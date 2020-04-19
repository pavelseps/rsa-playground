<template>
    <v-navigation-drawer
            :value="value"
            @input="$emit('input', $event)"
            app
    >
        <v-list dense>
            <v-list-item @click.prevent="pushRoute('Home')">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Domů</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click.prevent="pushRoute('Messaging')">
                <v-list-item-action>
                    <v-icon>mdi-message</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Zprávy</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class Navigation extends Vue {

        @Prop({default: false})
        value!: boolean;

        pushRoute(name: string) {
            this.$router.push({name}).catch(err => {

                console.error("Route push error", err)
            });
        }
    }
</script>

<style scoped lang="scss">

</style>