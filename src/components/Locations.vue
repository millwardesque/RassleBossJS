<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Locations</v-toolbar-title>
                    </v-toolbar>

                    <v-tabs
                      v-model="activeRegion"
                      color="cyan"
                      dark
                      fixed-tabs
                      slider-color="yellow"
                    >
                        <v-tab
                            v-for="option in options"
                            :key="option.name"
                            ripple
                          >
                            {{ option.name }}
                        </v-tab>
                        <v-tab-item
                            v-for="option in options"
                            :key="option.name"
                          >
                            <v-card flat>
                                <v-list>
                                    <v-list-tile
                                      v-for="location in option.locationList()"
                                      :key="location.id"
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="location.label"></v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                <v-layout>
                                                    ({{ location.lat }}, {{ location.long }})
                                                </v-layout>
                                            </v-list-tile-sub-title>
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
    name: 'Locations',
    methods: {
        /**
         * Sorts the companies by descending wealth.
         */
        allLocations: function() {
            let sorted = this.sharedData.gameState.locations.slice(0);
            sorted.sort(this.nameSort);
            return sorted;
        },
        accessibleLocations: function() {
            let sorted = this.sharedData.gameState.company.accessibleLocations.slice(0);
            sorted.sort(this.nameSort);
            return sorted;
        },
    },
    data: function() {
        let options = [
            {
                name: "Accessible Locations",
                locationList: this.accessibleLocations,
            },
            {
                name: "All Locations",
                locationList: this.allLocations,
            },
        ];

        return {
            activeRegion: null,
            options: options,
        };
    },
    props: {
        sharedData: Object,
    },
    mixins: [Mixins],
}
</script>
