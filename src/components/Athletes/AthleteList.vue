<template>
  <table class="table mt-4">
    <thead v-if="athletes.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Avatar</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Squad</th>
        <th scope="col">Weight</th>
        <th scope="col">D of E</th>
        <th scope="col">D.O.B</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any athletes yet.</p>
    <tbody>
      <AthleteItem
        v-for="(athlete, index) in athletes"
        @athlete-deleted="$emit('athlete-deleted')"
        :key="athlete.id"
        :athlete="athlete"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import AthleteItem from "./AthleteItem";

export default {
  components: { AthleteItem },
  props: {
    athletes: {
      type: Array,
      required: true,
    },
  },
};
</script>