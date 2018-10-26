<template>
    <ul>
        <li v-for="talent in roster.roster" :key="talent.id">
            {{ talent.name }}
        </li>
    </ul>
</template>

<script>
import Roster from '../models/Roster'

export default {
  name: 'BaseRoster',
  props: {
    roster: Roster,
  }
}
</script>
