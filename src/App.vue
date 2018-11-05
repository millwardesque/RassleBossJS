<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>

        <v-content>
            <the-status-bar :game-state="sharedData.gameState" />
            <router-view></router-view>
            <base-interruption
                :active="this.interruptionQueue.isShowing"
                :interruption="this.interruptionQueue.activeInterruption"
                v-on:update:title="this.interruptionQueue.isShowing = false"
            />
        </v-content>

        <v-footer :fixed="fixed" app>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
import TheStatusBar from './components/TheStatusBar'
import InterruptionQueue from './models/InterruptionQueue'
import BaseInterruption from './components/BaseInterruption'


export default {
    name: 'App',
    components: {
        'the-status-bar': TheStatusBar,
        'base-interruption': BaseInterruption,
    },
    data: function() {
        let sharedData = this.$parent.sharedData;
        return {
            interruptionQueue: InterruptionQueue,
            sharedData: sharedData,
            fixed: false,
            title: "The 'Rassler",
        };
    },
    mounted: function() {
        this.sharedData.gameState.enter();
    },
}
</script>
