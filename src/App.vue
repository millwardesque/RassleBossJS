<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>

        <v-content>
            <the-status-bar :game-state="sharedData.gameState" />
            <router-view></router-view>
        </v-content>

        <v-footer :fixed="fixed" app>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
import TheStatusBar from './components/TheStatusBar'

export default {
    name: 'App',
    components: {
        'the-status-bar': TheStatusBar,
    },
    data: function() {
        return {
            sharedData: this.$parent.sharedData,
            fixed: false,
            title: "The 'Rassler",
        };
    },
    mounted: function() {
        this.sharedData.gameState.enter();
    },
}
</script>
