<template>
    <v-row>
        <!--        TODO popsat informace-->
<!--        TODO loadery, dodat timeout-->
        <v-col md="6" offset-md="3">
            <h1 class="display-2 mb-8">RSA crypto playground</h1>
            <v-card class="mb-8" elevation="5" shaped>
                <v-card-title>
                    <h2>Zadání prvočísel</h2>
                </v-card-title>
                <v-card-subtitle>
                    <p class="mb-0">Zadejte prvočísla p a q, na základě kterých se vygenerují veřejné a privátní
                        klíče</p>
                </v-card-subtitle>
                <v-card-text class="black--text">
                    <v-row>
                        <v-col md="6">
                            <v-text-field
                                    v-model.number="q"
                                    required
                                    outlined
                                    prefix="q = "
                                    placeholder="..."
                                    type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col md="6">
                            <v-text-field
                                    v-model.number="p"
                                    required
                                    outlined
                                    prefix="p = "
                                    placeholder="..."
                                    type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP">
                <v-card-title>
                    <h2>Modul</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <Modul
                            :p="p"
                            :q="q"
                            @m="m = $event"
                            ref="modul"
                    ></Modul>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP">
                <v-card-title>
                    <h2>Eulerova funkce</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <P1Q1
                            :p="p"
                            :q="q"
                            @P1Q1="P1Q1 = $event"
                            @phi="phi = $event"
                            ref="P1Q1"
                    ></P1Q1>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP">
                <v-card-title>
                    <h2 class="tex2jax_ignore">
                        Zvolte veřejný exponent i, třeba prvočíslo
                        <br>nevyskytující se v rozkladu (p-1)(q-1)
                    </h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row>
                        <v-col md="6">
                            <v-text-field
                                    v-model.number="i"
                                    required
                                    outlined
                                    prefix="i = "
                                    placeholder="..."
                                    type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP && hasIM">
                <v-card-title>
                    <h2>Výpočet soukromého exponentu</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <GetJ
                            :i="i"
                            :phi="phi"
                            :P1Q1="P1Q1"
                            @j="j = $event"
                            @isValid="isValidJ = $event"
                            ref="GetJ"
                    ></GetJ>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP && hasIM && isValidJ">
                <v-card-title>
                    <h2>Testovací zpráva</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row>
                        <v-col md="6">
                            <v-text-field
                                    v-model.number="x"
                                    label="Zpráva x"
                                    required
                                    outlined
                                    prefix="x = "
                                    placeholder="..."
                                    type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <template v-if="this.x >= this.m">
                        <v-sheet color="error" class="text-center white--text pa-4 mb-8">❌ Zpráva musí být menší jak m
                            ({{m}})
                        </v-sheet>
                    </template>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP && hasIM && isValidJ && hasX">
                <v-card-title>
                    <h2>Zašifrování zprávy</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <MessageEncrypt
                            :x="x"
                            :m="m"
                            :i="i"
                            @y="y = $event"
                            ref="MessageEncrypt"
                    ></MessageEncrypt>
                </v-card-text>
            </v-card>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP && hasIM && isValidJ && hasX && hasY">
                <v-card-title>
                    <h2>Ověření zprávy rozšifrováním</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <MessageDecrypt
                            :y="y"
                            :j="j"
                            :m="m"
                            @x="decryptedMessage = $event"
                            ref="MessageEncrypt"
                    ></MessageDecrypt>
                </v-card-text>
            </v-card>

            <template v-if="hasQP && hasIM && isValidJ && hasX">
                <template v-if="x === decryptedMessage">
                    <v-sheet color="success" class="text-center white--text pa-4 mb-8">✔ Testovací zpráva sedí</v-sheet>
                </template>
                <template v-else>
                    <v-sheet color="error" class="text-center white--text pa-4 mb-8">❌ Testovací zpráva není stejná
                    </v-sheet>
                </template>
            </template>

            <v-card class="mb-8" elevation="5" shaped v-if="hasQP && hasIM && isValidJ && hasX">
                <v-card-title>
                    <h2>Veřejný a privátní exponent s cvičnou šifrou</h2>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row>
                        <v-col md="6">
                            <v-btn class="mb-3" color="primary" block outlined @click="goToEncrypt()">Zašifrování zpráv</v-btn>
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">Proměná</th>
                                        <th class="text-left">Hodnota</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Veřejný exponent <i>i</i></td>
                                        <td>{{i}}</td>
                                    </tr>
                                    <tr>
                                        <td>Modul <i>m</i></td>
                                        <td>{{m}}</td>
                                    </tr>
                                    <tr>
                                        <td><i>y</i></td>
                                        <td>{{y}}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                        <v-col md="6">
                            <v-btn class="mb-3" color="primary" block outlined @click="goToDecrypt()">Přečtení zpráv</v-btn>
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">Proměná</th>
                                        <th class="text-left">Hodnota</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Privátní exponent <i>j</i></td>
                                        <td>{{j}}</td>
                                    </tr>
                                    <tr>
                                        <td>Modul <i>m</i></td>
                                        <td>{{m}}</td>
                                    </tr>
                                    <tr>
                                        <td><i>x</i></td>
                                        <td>{{x}}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import P1Q1 from "@/components/P1Q1.vue";
    import GetJ from "@/components/GetJ.vue";
    import MessageEncrypt from "@/components/MessageEncrypt.vue";
    import MessageDecrypt from "@/components/MessageDecrypt.vue";
    import Modul from "@/components/Modul.vue";

    @Component({
        components: {
            Modul,
            P1Q1,
            GetJ,
            MessageEncrypt,
            MessageDecrypt
        }
    })
    export default class Home extends Vue {
        q: number | null = null;
        p: number | null = null;

        i: number | null = null;
        x: number | null = null;

        m: number = 0;
        phi: number = 0;
        P1Q1: number = 0;
        j: number = 0;
        y: number = 0;

        decryptedMessage: number = 0;

        isValidJ: boolean = false;

        get hasQP() {
            return this.q !== null && this.p !== null;
        }

        get hasIM() {
            return this.i !== null && this.m !== null;
        }

        get hasX() {
            return this.x !== null && this.x < this.m;
        }

        get hasY() {
            return this.y !== null;
        }

        mounted() {
            /*this.q = 71;
            this.p = 61;
            this.i = 11;
            this.x = 22;*/
        }

        goToDecrypt() {
            let routeData = this.$router.resolve({
                name: 'DecryptTextMessaging',
                params: {m: this.m !== null ? this.m + "" : "", y: this.y !== null ? this.y + "" : ""}
            });
            window.open(routeData.href, '_blank');
        }

        goToEncrypt() {
            let routeData = this.$router.resolve({
                name: 'EncryptTextMessaging',
                params: {m: this.m !== null ? this.m + "" : "", i: this.i !== null ? this.i + "" : ""}
            });
            window.open(routeData.href, '_blank');
        }
    }
</script>
