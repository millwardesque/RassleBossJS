<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Programs</v-toolbar-title>
                        <v-spacer />
                        <v-btn icon ripple :to="{ name: 'edit-program', params: { sharedData: sharedData, existingProgram: null, } }">
                            <v-icon color="grey lighten-1">add</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card flat>
                        <v-list v-if="sortedPrograms.length">
                            <v-list-tile
                              v-for="(program, index) in sortedPrograms"
                              :key="index"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="program.label"></v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-layout>
                                            {{ program.angle.name }}
                                        </v-layout>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn ripple :to="{ name: 'edit-program', params: { sharedData: sharedData, existingProgram: program, } }">
                                        <v-icon color="grey lighten-1">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                    <v-btn icon ripple @click="cancelProgram(program)">
                                        <v-icon color="grey lighten-1">remove</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <base-well v-else>There aren't any programs right now.</base-well>
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
    name: 'ViewPrograms',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        sortedPrograms: function() {
            let sorted = this.sharedData.gameState.programs.slice(0);

            // @TODO Figure out how to sort these

            return sorted;
        },
    },
    methods: {
        cancelProgram(program) {
            this.sharedData.gameState.cancelProgram(program);
        },
    },
    mixins: [Mixins],
    props: {
        sharedData: Object,
    },
}
</script>
