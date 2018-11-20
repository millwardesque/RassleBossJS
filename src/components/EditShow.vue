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
            <v-flex xs12 sm10 offset-sm1>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{ title }}</v-toolbar-title>
                        <v-spacer />
                        <v-btn ripple to='/shows/list'>
                            List
                        </v-btn>
                    </v-toolbar>

                    <h2>Locations</h2>
                    <v-list>
                        <v-list-tile
                          v-for="location in accessibleLocations"
                          :key="location.id"
                          class="choice"
                          :class="isSelectedLocation(location) ? 'selected' : (selectedLocation !== null) ? 'unavailable' : ''"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-text="`${location.name} (${location.lat}, ${location.long})`" @click="onLocationClick(location)"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                    <template v-if="selectedLocation">
                        <h2>Venues</h2>
                        <v-list>
                            <v-list-tile
                              v-for="venue in accessibleVenues"
                              :key="venue.id"
                              class="choice"
                              :class="isSelectedVenue(venue) ? 'selected' : (selectedVenue !== null) ? 'unavailable' : ''"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="`${venue.name} (${formatCurrency(venue.eventCost)})`" @click="onVenueClick(venue)"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </template>

                    <template v-if="selectedVenue">
                        <h2>Programs</h2>
                        <v-list>
                            <v-list-tile
                              v-for="(program, index) in sortedPrograms"
                              :key="index"
                              class="choice"
                              :class="isSelectedProgram(program) ? 'selected' : ''"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="`${program.label}`" @click="onProgramClick(program)"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </template>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import Mixins from '../Mixins'
import Show from '../models/Show'

export default {
    name: 'edit-show',
    components: {
    },
    computed: {
        accessibleLocations: function() {
            let sorted = this.sharedData.gameState.company.accessibleLocations.slice(0);
            sorted.sort(this.nameSort);
            return sorted;
        },
        accessibleVenues: function() {
            let venues = [];
            for (let venue of this.sharedData.gameState.venues) {
                if (venue.location == this.selectedLocation) {
                    venues.push(venue);
                }
            }
            venues.sort(this.nameSort);
            return venues;
        },
        isExistingShow: function() {
            return (this.existingShow !== null && this.existingShow !== undefined);
        },
        sortedPrograms: function() {
            let sortedPrograms = this.sharedData.gameState.programs.slice(0);
            sortedPrograms.sort((a, b) => {
                if (a.label < b.label) {
                    return -1;
                }
                else if (a.label > b.label) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            return sortedPrograms;
        },
        title: function() {
            return `${this.isExistingShow ? 'Edit' : 'Create'} show`;
        },
    },
    data: function() {
        return {
            selectedLocation: null,
            selectedVenue: null,
            selectedPrograms: [],
        };
    },
    props: {
        sharedData: Object,
        existingShow: Show,
    },
    methods: {
        isSelectedLocation(location) {
            return (this.selectedLocation === location);
        },
        isSelectedProgram(program) {
            return (this.selectedPrograms.indexOf(program) !== -1);
        },
        isSelectedVenue(venue) {
            return (this.selectedVenue === venue);
        },
        onLocationClick(location) {
            if (!this.isSelectedLocation(location)) {
                this.selectedLocation = location;
            }
            else {
                this.selectedLocation = null;
            }
        },
        onProgramClick(program) {
            if (!this.isSelectedProgram(program)) {
                this.selectedPrograms.push(program);
            }
            else {
                let index = this.selectedPrograms.indexOf(program);
                this.selectedPrograms.splice(index, 1);
            }
        },
        onVenueClick(venue) {
            if (!this.isSelectedVenue(venue)) {
                this.selectedVenue = venue;
            }
            else {
                this.selectedVenue = null;
            }
        },
    },
    mixins: [Mixins],
}
</script>
