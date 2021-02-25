<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>
      <img
        :src="session.image"
        :style="{ height: '50px' }"
        class="img-fluid img-thumbnail"
        :alt="session.type"
      />
    </td>
    <td :class="session.cancelled ? 'text-danger' : ''">
      {{ session.type }}
    </td>
    <td :class="session.cancelled ? 'text-danger' : ''">
      {{ session.date | dateTimeFilter }}
    </td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/session/${session.id}`)"
      >
        View
      </button>
      <button
        :disabled="session.cancelled"
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-session?edit=${session.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteSession">
        Delete
      </button>
    </td>
    <td>
      <div
        class="custom-control custom-switch d-flex align-items-start flex-column"
      >
        <input
          @change="updateSession"
          type="checkbox"
          class="custom-control-input"
          :id="session.id"
          v-model="session.cancelled"
        />
        <label
          v-if="session.cancelled"
          class="custom-control-label text-danger font-weight-bold"
          :for="session.id"
        ></label>
        <label
          v-else
          class="custom-control-label text-secondary font-weight-bold"
          :for="session.id"
        ></label>
      </div>
    </td>
  </tr>
</template>

<script>
import { DELETE_SESSION, TOGGLE_CANCELLED } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    session: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async deleteSession() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_SESSION,
        variables: { id: this.session.id },
      });
      toast("success", data.deleteSession.message);
      this.$emit("refresh");
    },
    async updateSession() {
      await this.$apollo.mutate({
        mutation: TOGGLE_CANCELLED,
        variables: { id: this.session.id, cancelled: this.session.cancelled },
      });
      this.$emit("refresh");
    },
  },
};
</script>