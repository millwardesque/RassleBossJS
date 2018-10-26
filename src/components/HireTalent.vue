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
                                <v-btn icon ripple @click="hire(talent)">
                                    <v-icon color="grey lighten-1">add</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <p v-else class="headline text-xs-center py-5 grey lighten-4">
                        There aren't any free agents right now.
                    </p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'HireTalent',
    computed: {
        freeAgents: function() {
            return this.sharedData.gameState.freeAgents;
        },
        roster: function() {
            return this.sharedData.gameState.roster;
        },
    },
    props: {
        sharedData: Object,
    },
    methods: {
        hire: function(talent) {
            if (this.roster.hire(talent)) {
                this.freeAgents.fire(talent);
            }
        }
    },
}
</script>
