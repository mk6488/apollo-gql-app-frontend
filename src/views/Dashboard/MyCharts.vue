<template>
  <div class="my-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary align-self-center">
                Athlete Charts
              </h2>
            </div>
            <hr />
            <div class="row">
              <div class="col-12">
                <AthleteButtons
                  :chosenAthlete="athleteId"
                  @selected-athlete="updateAthlete"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <!-- Chart 1 -->
                <h3 class="text-primary">Wellness</h3>
                <p>Week Number: {{ thisWeek }}</p>
                <p>Sleep: {{ average.sleep }}</p>
                <p>Stress: {{ average.stress }}</p>
                <p>Fatigue: {{ average.fatigue }}</p>
                <p>Soreness: {{ average.soreness }}</p>
                <p>Nutrition: {{ average.nutrition }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AthleteButtons from "../../components/Athletes/AthleteButtons";
import { calculateAverage, weekNumber } from "../../helpers";
import { ALL_WELLNESS_FOR_ATHLETE } from "../../gql";

export default {
  components: { AthleteButtons },
  data: () => ({
    athleteId: "",
    athlete: {},
    wellness: [],
    date: [],
    sleep: [],
    stress: [],
    fatigue: [],
    soreness: [],
    nutrition: [],
    average: {},
    thisWeek: weekNumber(new Date()) - 10,
  }),
  methods: {
    updateAthlete(id) {
      this.athleteId = id;
      this.getWellnessAvrg();
    },

    async getWellnessAvrg() {
      this.date = [];
      this.sleep = [];
      this.stress = [];
      this.fatigue = [];
      this.soreness = [];
      this.nutrition = [];
      this.average = [];
      if (this.athleteId) {
        let { data } = await this.$apollo.query({
          query: ALL_WELLNESS_FOR_ATHLETE,
          variables: { id: this.athleteId },
        });
        this.wellness = data.allWellnessForAthlete;
        this.wellness = this.$_.sortBy(this.wellness, "date");
        this.wellness = this.$_.where(this.wellness, {
          weekNumber: this.thisWeek,
        });
        this.wellness.forEach((data) => {
          this.date.push(data.date);
          this.sleep.push(data.sleep);
          this.stress.push(data.stress);
          this.fatigue.push(data.fatigue);
          this.soreness.push(data.soreness);
          this.nutrition.push(data.nutrition);
        });
        const sleepAvrg = calculateAverage(this.sleep);
        const stressAvrg = calculateAverage(this.stress);
        const fatigueAvrg = calculateAverage(this.fatigue);
        const sorenessAvrg = calculateAverage(this.soreness);
        const nutritionAvrg = calculateAverage(this.nutrition);
        this.average = {
          sleep: sleepAvrg,
          stress: stressAvrg,
          fatigue: fatigueAvrg,
          soreness: sorenessAvrg,
          nutrition: nutritionAvrg,
        };
      }
    },
  },
  watch: {
    athleteId: function () {},
  },
};
</script>