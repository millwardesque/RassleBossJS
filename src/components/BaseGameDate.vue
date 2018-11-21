<template>
    <div>
        <span class="year">Y: {{ date.year }} </span>
        <span class="month">M: {{ date.month }} </span>
        <span class="week">W: {{ date.week }} </span>
        <span class="day">D: {{ date.day }} </span>
    </div>
</template>

<script>
import GameDate from '../models/GameDate'

export default {
  name: 'BaseGameDate',
  props: {
    date: GameDate,
  }
}
</script>
