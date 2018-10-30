<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="primary">
                        <v-toolbar-title>Hire Talent</v-toolbar-title>
                    </v-toolbar>

                    <v-list v-if="freeAgents.roster.length">
                        <v-list-tile
                          v-for="talent in freeAgents.roster"
                          :key="talent.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-text="talent.name"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon ripple @click="hire(talent)" :disabled="!company.canHire(talent)">
                                    <v-icon color="grey lighten-1">add</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <base-well v-else>There aren't any free agents right now.</base-well>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import BaseWell from './BaseWell'

export default {
    name: 'HireTalent',
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
    props: {
        sharedData: Object,
    },
    methods: {
        hire: function(talent) {
            if (this.company.hire(talent)) {
                this.freeAgents.fire(talent);
            }
        }
    },
}
</script>
