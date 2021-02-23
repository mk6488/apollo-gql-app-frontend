<template>
  <table class="table mt-4">
    <thead v-if="tests.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Date</th>
        <th scope="col">Week #</th>
        <th scope="col">Athlete</th>
        <th scope="col">Test</th>
        <th scope="col">Result</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any tests yet.</p>
    <tbody>
      <TestItem
        v-for="(test, index) in tests"
        @test-deleted="$emit('test-deleted')"
        :key="test.id"
        :test="test"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import TestItem from "./TestItem";

export default {
  components: { TestItem },
  props: {
    tests: {
      type: Array,
      required: true,
    },
  },
};
</script>