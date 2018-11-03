<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="primary">
                        <v-toolbar-title>Roster</v-toolbar-title>
                    </v-toolbar>

                    <v-list v-if="roster.roster.length">
                        <v-list-tile
                          v-for="talent in roster.roster"
                          :key="talent.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-text="talentLabel(talent)"></v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-layout>
                                        <v-flex xs1 class="pt-2">😄</v-flex>
                                        <v-flex xs11>
                                            <v-progress-linear v-model="talent.satisfaction * 100.0"></v-progress-linear>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon ripple @click="fire(talent)">
                                    <v-icon color="grey lighten-1">remove</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <base-well v-else>Your roster is empty! Hire more talent.</base-well>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BaseWell from './BaseWell'
import Mixins from '../Mixins'

export default {
    name: 'ViewRoster',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        company: function() {
            return this.sharedData.gameState.company;
        },
        freeAgents: function() {
            return this.sharedData.gameState.freeAgents;
        },
        roster: function() {
            return this.company.roster;
        },
    },
    methods: {
        fire: function(talent) {
            this.roster.fire(talent);
        },
        talentLabel(talent) {
            return `${talent.name} (${this.formatCurrency(talent.contract.annualSalary)} annually)`;
        },
    },
    mixins: [Mixins],
    props: {
        sharedData: Object,
    },
}
</script>
