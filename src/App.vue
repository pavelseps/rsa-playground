<template>
    <v-app id="inspire">
        <Navigation
                v-model="drawer"
        ></Navigation>

        <v-app-bar
                app
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>RSA crypto playground</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                    class="fill-height align-baseline"
                    fluid
            >
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer
                app
                dark
        >
        </v-footer>

    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Navigation from './components/Navigation.vue';


    let drawerStorage = sessionStorage.getItem("drawer");
    @Component({
        components: {
            Navigation,
        },
    })
    export default class App extends Vue {
        drawer = false;
    }
</script>

<style lang="scss">
    @import "~vuetify/dist/vuetify.css";
</style>

<style scoped lang="scss">
    .loader {
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
    }
</style>
