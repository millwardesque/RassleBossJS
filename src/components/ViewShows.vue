<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Shows</v-toolbar-title>
                        <v-spacer />
                        <v-btn icon ripple :to="{ name: 'edit-show', params: { sharedData: sharedData, existingShow: null, } }">
                            <v-icon color="grey lighten-1">add</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card flat>
                        <v-list v-if="sortedShows.length">
                            <v-list-tile
                              v-for="(show, index) in sortedShows"
                              :key="index"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="show.label"></v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-layout>
                                            {{ show.programs.length }} matches
                                        </v-layout>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn ripple :to="{ name: 'edit-show', params: { sharedData: sharedData, existingShow: show, } }">
                                        <v-icon color="grey lighten-1">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                    <v-btn icon ripple @click="cancelShow(show)">
                                        <v-icon color="grey lighten-1">remove</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <base-well v-else>There aren't any shows right now.</base-well>
                    </v-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Mixins from '../Mixins'
import BaseWell from './BaseWell'

export default {
    name: 'ViewShows',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        sortedShows: function() {
            let sorted = this.sharedData.gameState.shows.slice(0);
            sorted.sort((a, b) => {
                return a.date.compare(b.date);
            })

            return sorted;
        },
    },
    methods: {
        cancelShow(show) {
            this.sharedData.gameState.cancelShow(show);
        },
    },
    mixins: [Mixins],
    props: {
        sharedData: Object,
    },
}
</script>
