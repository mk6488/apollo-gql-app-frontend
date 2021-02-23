<template>
  <table class="table mt-4">
    <thead v-if="wellness.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Date</th>
        <th scope="col">Week #</th>
        <th scope="col">Athlete</th>
        <th scope="col">S</th>
        <th scope="col">S</th>
        <th scope="col">F</th>
        <th scope="col">S</th>
        <th scope="col">N</th>
        <th scope="col">Average</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any wellness yet.</p>
    <tbody>
      <WellnessItem
        v-for="(wellness, index) in wellness"
        @wellness-deleted="$emit('wellness-deleted')"
        :key="wellness.id"
        :wellness="wellness"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import WellnessItem from "./WellnessItem";

export default {
  components: { WellnessItem },
  props: {
    wellness: {
      type: Array,
      required: true,
    },
  },
};
</script>