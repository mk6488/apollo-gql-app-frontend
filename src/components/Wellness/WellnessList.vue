<template>
  <table class="table mt-4">
    <thead v-if="wellness.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Name</th>
        <th scope="col">Squad</th>
        <th scope="col">Weight</th>
        <th scope="col">Current</th>
        <th scope="col">D of E</th>
        <th scope="col">D.O.B</th>
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