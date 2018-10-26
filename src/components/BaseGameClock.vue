<template>
    <div>
        <span class="year">Y: {{ clock.year }} </span>
        <span class="month">M: {{ clock.month }} </span>
        <span class="week">W: {{ clock.week }}</span>
    </div>
</template>

<script>
import GameClock from '../models/GameClock'

export default {
  name: 'BaseGameClock',
  props: {
    clock: GameClock,
  }
}
</script>
