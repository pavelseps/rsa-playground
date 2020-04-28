<template>
    <v-row>
        <v-col md="6" offset-md="3">
            <v-row>
                <v-col md="6">
                    <v-text-field
                            v-model.number="m"
                            label="Modul"
                            required
                            outlined
                            prefix="m = "
                            placeholder="..."
                            type="number"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-tabs
                    v-model="tab"
                    background-color="deep-purple "
                    class="elevation-2"
                    dark
                    :centered="true"
                    :grow="true"
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab
                        href="#tab-1"
                >
                    <v-icon class="mr-5">mdi-lock</v-icon> Zašifrovat
                </v-tab>
                <v-tab
                        href="#tab-2"
                >
                    <v-icon class="mr-5">mdi-lock-open-variant</v-icon> Rozšifrovat
                </v-tab>

                <v-tab-item
                        :value="'tab-1'"
                >
                    <v-card
                            flat
                            tile
                    >
                        <v-card-text>
                            <v-row>
                                <v-col md="6">
                                    <v-text-field
                                            v-if="!isText"
                                            v-model.number="x"
                                            label="Zpráva"
                                            required
                                            outlined
                                            prefix="x = "
                                            placeholder="..."
                                            type="number"
                                    ></v-text-field>
                                    <template v-else>
                                        <v-textarea
                                                name="textarea"
                                                label="Zpráva"
                                                v-model="textX"
                                        ></v-textarea>
                                        <v-btn color="primary" @click="encryptText">Zašifruj</v-btn>
                                    </template>
                                </v-col>
                                <v-col md="6">
                                    <v-text-field
                                            v-model.number="i"
                                            label="Veřejný exponent"
                                            required
                                            outlined
                                            prefix="i = "
                                            placeholder="..."
                                            type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <template v-if="!canEncrypt && $route.meta.encrypt">
                                <v-sheet color="info" class="text-center white--text pa-4 mb-8">
                                    👆 Prosím zadejte zprávu k zašifrování
                                </v-sheet>
                            </template>

                            <template v-if="canEncrypt">
                                <MessageEncrypt
                                        v-if="!isText"
                                        :x="x"
                                        :m="m"
                                        :i="i"
                                        @y="y = $event"
                                ></MessageEncrypt>

                                <h3>Url na odeslání zprávy: <v-btn color="success" target="_blank" :href="messageUrl">Odkaz pro odeslání</v-btn></h3>
                                <h2 class="pt-5 mb-8">Zašifrovaná zpráva je: <br> <u>{{isText ? textY : y}}</u></h2>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                        :value="'tab-2'"
                >
                    <v-card
                            flat
                            tile
                    >
                        <v-card-text>
                            <v-row>
                                <v-col md="6">
                                    <v-text-field
                                            v-if="!isText"
                                            v-model.number="y"
                                            label="Šifrovaná zpráva"
                                            required
                                            outlined
                                            prefix="y = "
                                            placeholder="..."
                                            type="number"
                                    ></v-text-field>
                                    <template v-else>
                                        <v-textarea
                                                name="textarea"
                                                label="zašifrovaná zpráva"
                                                v-model="textY"
                                        ></v-textarea>
                                        <v-btn color="primary" @click="decryptText">Dešifruj</v-btn>
                                    </template>
                                </v-col>
                                <v-col md="6">
                                    <v-text-field
                                            v-model.number="j"
                                            label="Privátní exponent"
                                            required
                                            outlined
                                            prefix="j = "
                                            placeholder="..."
                                            type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <template v-if="!canDecrypt && $route.meta.decrypt">
                                <v-sheet color="info" class="text-center white--text pa-4 mb-8">
                                    Prosím zadejte privátní exponent pro rozšifrování zprávy 👆
                                </v-sheet>
                            </template>

                            <template v-if="canDecrypt">
                                <MessageDecrypt
                                        v-if="!isText"
                                        :y="y"
                                        :j="j"
                                        :m="m"
                                        @x="x = $event"
                                ></MessageDecrypt>

                                <h2 class="pa-5">Rozšifrovaná zpráva je: <br> <u>{{isText ? textX : x}}</u></h2>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MessageEncrypt from "@/components/MessageEncrypt.vue";
    import MessageDecrypt from "@/components/MessageDecrypt.vue";
    import Helpers from "@/lib/Helpers";

    @Component({
        components: {
            MessageEncrypt,
            MessageDecrypt
        }
    })
    export default class Messaging extends Vue {
        i: number | null = null;
        x: number | null = null;

        textX: string = "";

        m: number | null = null;
        j: number | null = null;
        y: number | null = null;

        textY: string  = "";

        tab : string | null = null;


        mounted(){
            if (this.$route.meta.encrypt){
                let m = parseInt(this.$route.params.m);
                let i = parseInt(this.$route.params.i);

                if (!isNaN(m)){
                    this.m = m;
                }

                if (!isNaN(i)){
                    this.i = i;
                }

                this.tab = "tab-1";
            }
            if (this.$route.meta.decrypt){
                let m = parseInt(this.$route.params.m);
                let y = parseInt(this.$route.params.y);

                if (!isNaN(m)){
                    this.m = m;
                }

                if (!isNaN(y)){
                    this.y = y;
                } else {
                    this.textY = this.$route.params.y;
                }

                this.tab = "tab-2";
            }
        }

        get canDecrypt(){
            return (this.m !== null && this.j !== null && this.y !== null) || this.isText;
        }
        get canEncrypt(){
            return (this.m !== null && this.i !== null && this.x !== null) || this.isText;
        }

        get isText(){
            return this.$route.meta.text;
        }

        get messageUrl(){
            let y = "";

            if (this.isText) {
                y = this.textY;
            } else {
                y = this.y !== null ? this.y + "" : "";
            }

            return window.location.origin + this.$router.resolve({
                name: this.isText ? 'DecryptTextMessaging' : 'DecryptMessaging',
                params: {
                    m: this.m !== null ? this.m + "" : "",
                    y
                }
            }).href;
        }

        encryptText(){
            let arr = [];

            if (this.i === null || this.m === null){
                return;
            }

            for (let c of this.textX) {
                arr.push(Helpers.expmod(c.charCodeAt(0), this.i, this.m));
            }

            this.textY = btoa(JSON.stringify(arr));
        }

        decryptText(){
            let arr = JSON.parse(atob(this.textY));

            if (this.j === null || this.m === null){
                return;
            }
            this.textX = "";

            for (let c of arr) {
                this.textX += String.fromCharCode(Helpers.expmod(c, this.j, this.m));
            }
        }
    }
</script>
