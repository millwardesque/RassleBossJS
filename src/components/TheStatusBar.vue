<template>
    <v-container fluid accent>
        <v-layout row>
            <v-menu offset-y>
                <v-flex xs2 slot="activator">
                    <v-btn
                      color="secondary"
                    >
                        Menu
                    </v-btn>
                </v-flex>
                <v-list>
                    <v-list-tile
                      v-for="(item, index) in menuItems"
                      :key="index"
                    >
                        <v-list-tile-title>
                            <template v-if="item.to">
                                <router-link :to="item.to">{{ item.title }}</router-link>
                            </template>
                            <template v-else>
                                {{ item.title }}
                            </template>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-flex xs2 class="subheading pt-3">
                <span>{{ gameState.company.name }}</span>
            </v-flex>
            <v-flex xs2 class="subheading pt-3">
                <span>{{ formatCurrency(gameState.company.bank) }}</span>
            </v-flex>
            <v-flex xs2 class="subheading pt-3">
                <BaseRosterSummary :roster="gameState.company.roster"/>
            </v-flex>
            <v-spacer />
            <v-flex xs2 class="subheading pt-3">
                <BaseGameClock :clock="gameState.clock"/>
            </v-flex>
            <v-flex xs2>
                <v-btn @click="onPause">
                    <template v-if="paused">Unpause</template>
                    <template v-else>Pause</template>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BaseGameClock from './BaseGameClock'
import BaseRosterSummary from './BaseRosterSummary'
import InGameState from '../models/InGameState'
import Mixins from '../Mixins'

export default {
    components: {
        BaseGameClock,
        BaseRosterSummary,
    },
    data: function() {
        return {
            menuItems: [
                {
                    title: 'Hire Talent',
                    to: "/hire",
                },
                {
                    title: 'Fire Talent',
                    to: "/fire"
                },
                {
                    title: 'View Roster',
                    to: "/roster"
                },
                {
                    title: 'Company Rankings',
                    to: "/company-ranking"
                },
            ],
            paused: false,
        };
    },
    name: 'TheStatusBar',
    methods: {
        onPause() {
            this.paused ^= true;

            if (this.paused) {
                this.gameState.exit();
            }
            else {
                this.gameState.enter();
            }
        },
    },
    mixins: [Mixins],
    props: {
        gameState: InGameState,
    }
}
</script>
