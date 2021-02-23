<template>
  <div>
    <div v-if="wellness.length > 0" class="d-flex">
      <chart
        style="max-height: 200px"
        v-for="data in dataArray"
        :key="data.name"
        :options="getOptions(data.name, data.val)"
      ></chart>
    </div>
    <div v-else>
      <p>No wellness data collected for this week</p>
    </div>
  </div>
</template>

<script>
import { ALL_WELLNESS_FOR_ATHLETE } from "../../gql";
import { calculateAverage, weekNumber } from "../../helpers";

export default {
  props: ["athleteId"],
  data() {
    return {
      thisWeek: weekNumber(new Date()),
      wellness: [],
      sleep: [],
      stress: [],
      fatigue: [],
      soreness: [],
      nutrition: [],
      dataArray: [],
    };
  },
  methods: {
    async getWellness() {
      let { data } = await this.$apollo.query({
        query: ALL_WELLNESS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      this.wellness = data.allWellnessForAthlete;
      this.wellness = this.$_.sortBy(this.wellness, "date");
      this.wellness = this.$_.where(this.wellness, {
        weekNumber: this.thisWeek,
      });
      this.wellness.forEach((d) => {
        this.sleep.push(d.sleep);
        this.stress.push(d.stress);
        this.fatigue.push(d.fatigue);
        this.soreness.push(d.soreness);
        this.nutrition.push(d.nutrition);
      });
      this.dataArray.push({ name: "Sleep", val: this.averageOf(this.sleep) });
      this.dataArray.push({ name: "Stress", val: this.averageOf(this.stress) });
      this.dataArray.push({
        name: "Fatigue",
        val: this.averageOf(this.fatigue),
      });
      this.dataArray.push({
        name: "Soreness",
        val: this.averageOf(this.soreness),
      });
      this.dataArray.push({
        name: "Nutrition",
        val: this.averageOf(this.nutrition),
      });
    },
    averageOf(array) {
      return calculateAverage(array);
    },
    getOptions(name, val) {
      const options = {
        series: [
          {
            autoresize: true,
            type: "gauge",
            radius: "70%",
            center: ["50%", "50%"],
            startAngle: 180,
            endAngle: 0,
            min: 1,
            max: 5,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 2,
                color: [
                  [0.25, "#93CE07"],
                  [0.5, "#58D9F9"],
                  [0.75, "#FDDD60"],
                  [1, "#FF6E76"],
                ],
              },
            },
            pointer: {
              icon: "arrow",
              offsetCenter: [0, "-30%"],
              width: 8,
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              lineStyle: {
                color: "auto",
              },
            },
            axisLabel: {
              fontSize: 8,
            },
            splitLine: {
              lineStyle: {
                color: "auto",
              },
            },
            data: [
              {
                name: name,
                value: val,
                detail: {
                  fontSize: 15,
                },
              },
            ],
          },
        ],
      };
      return options;
    },
  },
  created() {
    this.getWellness();
  },
};
</script>