<template>
  <table class="table mt-4">
    <thead v-if="loads.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Date</th>
        <th scope="col">Week #</th>
        <th scope="col">Athlete</th>
        <th scope="col">Type</th>
        <th scope="col">Duration</th>
        <th scope="col">RPE</th>
        <th scope="col">Load</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any loads yet.</p>
    <tbody>
      <LoadItem
        v-for="(load, index) in loads"
        @load-deleted="$emit('load-deleted')"
        :key="load.id"
        :load="load"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import LoadItem from "./LoadItem";

export default {
  components: { LoadItem },
  props: {
    loads: {
      type: Array,
      required: true,
    },
  },
};
</script>