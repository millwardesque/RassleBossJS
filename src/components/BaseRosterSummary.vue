<template>
    <div>
        Roster: {{ roster.roster.length }} / {{ roster.maxSize }}
    </div>
</template>

<script>
import Roster from '../models/Roster'

export default {
  name: 'baseRosterSummary',
  props: {
    roster: Roster,
  }
}
</script>
