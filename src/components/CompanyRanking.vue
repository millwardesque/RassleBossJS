<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Company rankings</v-toolbar-title>
                    </v-toolbar>

                    <v-tabs
                      v-model="activeSort"
                      color="cyan"
                      dark
                      fixed-tabs
                      slider-color="yellow"
                    >
                        <v-tab
                            v-for="option in sortOptions"
                            :key="option.name"
                            ripple
                          >
                            {{ option.name }}
                        </v-tab>
                        <v-tab-item
                            v-for="option in sortOptions"
                            :key="option.name"
                          >
                            <v-card flat>
                                <v-list>
                                    <v-list-tile
                                      v-for="(company, index) in option.sorted()"
                                      :key="company.id"
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="`${index + 1}. ${company.name} - ${option.metric(company)}`"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
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

export default {
    name: 'CompanyRanking',
    methods: {
        /**
         * Sorts the companies by descending wealth.
         */
        companiesByWealth: function() {
            let sorted = this.sharedData.gameState.allCompanies.slice(0);
            sorted.sort((a, b) => {
                if (a.bank < b.bank) {
                    return 1;
                }
                else if (a.bank > b.bank) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            return sorted;
        },
        companiesBySatisfaction: function() {
            let sorted = this.sharedData.gameState.allCompanies.slice(0);
            sorted.sort((a, b) => {

                if (a.satisfaction < b.satisfaction) {
                    return 1;
                }
                else if (a.satisfaction > b.satisfaction) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            return sorted;
        }
    },
    data: function() {
        let self = this;
        let sortOptions = [
            {
                name: "By Wealth",
                sorted: this.companiesByWealth,
                metric: function(company) {
                    return self.formatCurrency(company.bank);
                },
            },
            {
                name: "By Satisfaction",
                sorted: this.companiesBySatisfaction,
                metric: function(company) {
                    return self.formatPercent(company.satisfaction);
                },
            },
        ];

        return {
            activeSort: null,
            sortOptions: sortOptions,
        };
    },
    props: {
        sharedData: Object,
    },
    mixins: [Mixins],
}
</script>
