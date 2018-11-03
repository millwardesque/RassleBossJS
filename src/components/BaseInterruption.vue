<template>
    <v-layout row justify-center>
        <v-dialog v-model="active" persistent>
            <v-card v-if="interruption">
                <v-card-title class="headline">{{ interruption.title }}</v-card-title>
                <v-card-text>{{ interruption.body }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="onClose">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import Interruption from '../models/Interruption'
import Mixins from '../Mixins'

export default {
    name: 'BaseInterruption',
    mixins: [Mixins],
    methods: {
        onClose: function() {
            this.interruption.onClose();
            this.$emit('update:active', false);
        }
    },
    props: {
        interruption: Interruption,
        active: Boolean
    },
}
</script>
