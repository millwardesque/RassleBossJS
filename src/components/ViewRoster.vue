<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Roster</v-toolbar-title>
                    </v-toolbar>

                    <v-tabs
                      v-model="activeCompany"
                      color="cyan"
                      dark
                      fixed-tabs
                      slider-color="yellow"
                    >
                        <v-tab
                            v-for="company in sortedCompanies"
                            :key="company.id"
                            ripple
                          >
                            {{ company.name }}
                        </v-tab>
                        <v-tab-item
                            v-for="company in sortedCompanies"
                            :key="company.id"
                          >
                            <v-card flat>
                                <v-list v-if="company.roster.roster.length">
                                    <v-list-tile
                                      v-for="talent in company.roster.roster"
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

                                        <v-list-tile-action v-if="isPlayerCompany(company)">
                                            <v-btn icon ripple @click="fire(talent, company)">
                                                <v-icon color="grey lighten-1">remove</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                                <base-well v-else>This company has an empty roster.</base-well>
                            </v-card>
                          </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Mixins from '../Mixins'
import BaseWell from './BaseWell'

export default {
    name: 'ViewRoster',
    components: {
        'base-well': BaseWell,
    },
    computed: {
        sortedCompanies: function() {
            let sorted = this.sharedData.gameState.allCompanies.slice(0);
            sorted.sort((a, b) => {
                if (this.isPlayerCompany(a)) {
                    return -1;
                }
                else if (this.isPlayerCompany(b)) {
                    return 1;
                }
                else if (a.name < b.name) {
                    return -1;
                }
                else if (a.name > b.name) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            return sorted;
        },
    },
    data: function() {
        return {
            activeCompany: null,
        };
    },
    methods: {
        fire: function(talent, company) {
            company.roster.fire(talent);
        },
        isPlayerCompany(company) {
            return company == this.sharedData.gameState.company;
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
