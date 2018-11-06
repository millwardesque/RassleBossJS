<style scoped>
.choice {
    cursor: pointer;
}
.selected {
    background-color: darkgrey;
    color: white;
}
.unavailable {
    color: lightgrey;
}
</style>

<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Create program</v-toolbar-title>
                    </v-toolbar>

                    <template v-if="sortedRoster.length >= 2">
                        <v-layout>
                            <v-list xs4>
                                <v-list-tile
                                  v-for="talent in sortedRoster"
                                  :key="talent.id + '-A'"
                                  class="choice"
                                  :class="(isTalentInGroupA(talent) ? 'selected' : '') + ' ' + (isTalentInGroupB(talent) ? 'unavailable' : '')"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="talentLabel(talent)" @click="onTalentAClick(talent)"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-list xs2>
                                <v-list-tile
                                  v-for="angle in sortedAngles"
                                  :key="angle.id"
                                  class="choice"
                                  :class="isSelectedAngle(angle) ? 'selected' : (selectedAngle !== null) ? 'unavailable' : ''"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="angle.name" @click="onAngleClick(angle)"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-list xs4>
                                <v-list-tile
                                  v-for="talent in sortedRoster"
                                  :key="talent.id + '-B'"
                                  class="choice"
                                  :class="(isTalentInGroupB(talent) ? 'selected' : '') + ' ' + (isTalentInGroupA(talent) ? 'unavailable' : '')"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="talentLabel(talent)" @click="onTalentBClick(talent)"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-layout>
                    </template>
                    <base-well v-else>There aren't any free agents right now.</base-well>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import BaseWell from './BaseWell'
import Mixins from '../Mixins'

export default {
    name: 'EditProgram',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        company: function() {
            return this.sharedData.gameState.company;
        },
        roster: function() {
            return this.company.roster;
        },
        sortedAngles: function() {
            return this.sharedData.gameState.availableAngles;
        },
        sortedRoster: function() {
            return this.roster.roster.slice(0).sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                else if (a.name > b.name) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
    },
    data: function() {
        return {
            selectedTalentA: [],
            selectedTalentB: [],
            selectedAngle: null,
        }
    },
    props: {
        sharedData: Object,
    },
    methods: {
        isTalentInGroupA(talent) {
            return (this.selectedTalentA.indexOf(talent) !== -1);
        },
        isTalentInGroupB(talent) {
            return (this.selectedTalentB.indexOf(talent) !== -1);
        },
        isSelectedAngle(angle) {
            return (this.selectedAngle === angle);
        },
        onTalentAClick(talent) {
            if (this.isTalentInGroupA(talent)) {
                let index = this.selectedTalentA.indexOf(talent);
                this.selectedTalentA.splice(index, 1);
            }
            else if (!this.isTalentInGroupB(talent)) {
                this.selectedTalentA.push(talent);
            }
        },
        onTalentBClick(talent) {
            if (this.isTalentInGroupB(talent)) {
                let index = this.selectedTalentB.indexOf(talent);
                this.selectedTalentB.splice(index, 1);
            }
            else if (!this.isTalentInGroupA(talent)) {
                this.selectedTalentB.push(talent);
            }
        },
        onAngleClick(angle) {
            if (!this.isSelectedAngle(angle)) {
                this.selectedAngle = angle;
            }
            else {
                this.selectedAngle = null;
            }
        },
        talentLabel(talent) {
            return `${talent.name}`;
        },
    },
    mixins: [Mixins],
}
</script>
