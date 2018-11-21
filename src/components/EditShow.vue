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

                    <v-container fluid grid-list-xs>
                        <v-layout>
                            <v-card>
                                <v-toolbar color="secondary" dark>
                                    <v-toolbar-title>Show Date</v-toolbar-title>
                                </v-toolbar>

                                <v-container fluid grid-list-xs>
                                    <v-layout>
                                        <v-flex xs3>
                                            <v-select
                                              :items="accessibleYears"
                                              label="Year"
                                              v-model="selectedYear"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-select
                                              :items="accessibleMonths"
                                              label="Month"
                                              v-model="selectedMonth"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-select
                                              :items="accessibleWeeks"
                                              label="Week"
                                              v-model="selectedWeek"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-select
                                              :items="accessibleDays"
                                              label="Day"
                                              v-model="selectedDay"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-layout>
                    </v-container>

                    <v-container fluid grid-list-xs>
                        <v-layout>
                            <v-flex xs12>
                                <v-card>
                                    <v-toolbar color="secondary" dark>
                                        <v-toolbar-title>Locations</v-toolbar-title>
                                    </v-toolbar>

                                    <v-list>
                                        <v-list-tile
                                          v-for="location in accessibleLocations"
                                          :key="location.id"
                                          class="choice"
                                          :class="isSelectedLocation(location) ? 'selected' : (selectedLocation !== null) ? 'unavailable' : ''"
                                        >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-text="location.label" @click="onLocationClick(location)"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <template v-if="selectedLocation">
                        <v-container fluid grid-list-xs>
                            <v-layout>
                                <v-flex xs12>
                                    <v-card>
                                        <v-toolbar color="secondary" dark>
                                            <v-toolbar-title>Venues</v-toolbar-title>
                                        </v-toolbar>

                                        <v-list>
                                            <v-list-tile
                                              v-for="venue in accessibleVenues"
                                              :key="venue.id"
                                              class="choice"
                                              :class="isSelectedVenue(venue) ? 'selected' : (selectedVenue !== null) ? 'unavailable' : ''"
                                            >
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-text="`${venue.label} (${formatCurrency(venue.eventCost)})`" @click="onVenueClick(venue)"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </template>

                    <v-container fluid grid-list-xs>
                        <v-layout>
                            <v-flex xs12>
                                <v-card>
                                    <v-toolbar color="secondary" dark>
                                        <v-toolbar-title>Programs</v-toolbar-title>
                                    </v-toolbar>

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
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-layout row wrap justify-end>
                        <v-btn
                            color="primary"
                            :disabled="selectedDate === null || selectedVenue === null || selectedPrograms.length === 0"
                            @click="saveShow"
                        >
                            Save
                        </v-btn>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import Mixins from '../Mixins'
import GameDate from '../models/GameDate'
import Show from '../models/Show'

export default {
    name: 'edit-show',
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
        accessibleYears: function() {
            let years = [];
            years.push(this.sharedData.gameState.clock.gameDate.year);
            years.push(this.sharedData.gameState.clock.gameDate.year + 1);
            return years;
        },
        accessibleMonths: function() {
            let months = [];
            for (let i = 1; i <= 12; i++) {
                months.push(i);
            }
            return months;
        },
        accessibleWeeks: function() {
            let weeks = [];
            for (let i = 1; i <= 4; i++) {
                weeks.push(i);
            }
            return weeks;
        },
        accessibleDays: function() {
            let days = [];
            for (let i = 1; i <= 7; i++) {
                days.push(i);
            }
            return days;
        },
        isExistingShow: function() {
            return (this.existingShow !== null && this.existingShow !== undefined);
        },
        selectedDate: function() {
            if (this.selectedYear !== null && this.selectedMonth !== null && this.selectedWeek !== null && this.selectedDay !== null) {
                return new GameDate(this.selectedYear, this.selectedMonth, this.selectedWeek, this.selectedDay);
            }
            else {
                return null;
            }
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
        let currentDate = this.sharedData.gameState.clock.gameDate;
        return {
            selectedYear: this.existingShow ? this.existingShow.date.year : currentDate.year,
            selectedMonth: this.existingShow ? this.existingShow.date.month : currentDate.month + 1,
            selectedWeek: this.existingShow ? this.existingShow.date.week : currentDate.week,
            selectedDay: this.existingShow ? this.existingShow.date.day : currentDate.day,
            selectedLocation: this.existingShow ? this.existingShow.venue.location : null,
            selectedVenue: this.existingShow ? this.existingShow.venue : null,
            selectedPrograms: this.existingShow ? this.existingShow.programs : [],
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
        saveShow() {
            if (this.isExistingShow) {
                this.existingShow.date = this.selectedDate;
                this.existingShow.venue = this.selectedVenue;
                this.existingShow.programs = this.selectedPrograms;
            }
            else {
                // Save the show
                let show = new Show(this.selectedDate, this.selectedVenue, this.selectedPrograms);
                this.sharedData.gameState.shows.push(show);
            }

            // Go to list page
            this.$router.push('/show/list');
        },
    },
    mixins: [Mixins],
}
</script>
