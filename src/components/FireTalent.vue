<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="primary">
                        <v-toolbar-title>Fire Talent</v-toolbar-title>
                    </v-toolbar>

                    <v-list v-if="roster.roster.length">
                        <v-list-tile
                          v-for="talent in roster.roster"
                          :key="talent.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-text="talent.name"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon ripple @click="fire(talent)">
                                    <v-icon color="grey lighten-1">remove</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <base-well v-else>
                        You don't have any talent in your roster.
                    </base-well>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BaseWell from './BaseWell'
export default {
    name: 'FireTalent',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        freeAgents: function() {
            return this.sharedData.gameState.freeAgents;
        },
        roster: function() {
            return this.sharedData.gameState.company.roster;
        },
    },
    props: {
        sharedData: Object,
    },
    methods: {
        fire: function(talent) {
            if (this.freeAgents.hire(talent)) {
                this.roster.fire(talent);
            }
        }
    },
}
</script>
