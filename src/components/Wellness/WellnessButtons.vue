<template>
  <div class="form-group">
    <input
      @click="selectedField(1)"
      type="radio"
      class="btn-check"
      :name="title"
      id="option1"
      autocomplete="off"
    />
    <label class="btn btn-secondary mr-3" for="option1">1</label>

    <input
      @click="selectedField(2)"
      type="radio"
      class="btn-check"
      :name="title"
      id="option2"
      autocomplete="off"
    />
    <label class="btn btn-secondary mr-3" for="option2">2</label>

    <input
      @click="selectedField(3)"
      type="radio"
      class="btn-check"
      :name="title"
      id="option3"
      autocomplete="off"
    />
    <label class="btn btn-secondary mr-3" for="option3">3</label>

    <input
      @click="selectedField(4)"
      type="radio"
      class="btn-check"
      :name="title"
      id="option4"
      autocomplete="off"
    />
    <label class="btn btn-secondary mr-3" for="option4">4</label>

    <input
      @click="selectedField(5)"
      type="radio"
      class="btn-check"
      :name="title"
      id="option5"
      autocomplete="off"
    />
    <label class="btn btn-secondary mr-3" for="option5">5</label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectedField(val) {
      this.$emit(this.title, val);
    },
  },
};
</script>