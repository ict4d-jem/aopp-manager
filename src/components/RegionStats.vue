<template>
        <div style="padding-left: 50px;">
            <h4>{{title}}</h4>
            <p v-if="selectedRegion == ''">Click on a region to start...</p>
            <p v-if="selectedRegion !== ''">Crop Types distribution</p>
            <GChart
                    v-if="selectedRegion !== ''"
                    type="PieChart"
                    :data="cropTypeData"
                    :options="chartOptions"
                    ref="cropTypegChart"
            />

            <p v-if="selectedRegion !== ''">Crop Sizes distribution</p>
            <GChart
                    type="PieChart"
                    :data="cropSizeData"
                    :options="chartOptions"
                    ref="cropTypegChart"
            />
        </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    import store from '../store'
    import { GChart } from 'vue-google-charts'

    export default {
        name: "RegionStats",
        components: {
            GChart
        },
        props: {
          selectedRegion: {
              type: String
          }
        },
        data() {
            var self = this;
            return {
                chartOptions: {
                    chart: {
                        title: 'Region title',
                        subtitle: 'Farmers title',
                    }
                }
            }

        },
        methods: {
            clickHandler(data) {
                console.log(data);
            }
        },
        computed: {
            title() {
                if(this.selectedRegion !== "" && this.regionalUsers !== "")
                    return this.selectedRegion + ": " + this.regionalUsers + " farmers";
                return "";
            },
            regionalUsers() {
                if(store.getters.getRegionalStats.hasOwnProperty(this.selectedRegion))
                    return store.getters.getRegionalStats[this.selectedRegion].users;
                else
                    return "";
                return [["Region", "Farmers"]].concat(Object.keys(store.getters.getRegionalStats).map(function(region) {return [region, store.getters.getRegionalStats[region].users]}))
            },
            cropTypeData() {
                var self = this;
                if(store.getters.getRegionalStats.hasOwnProperty(self.selectedRegion))
                    return [["Region", "CropType"]].concat(Object.keys(store.getters.getRegionalStats[self.selectedRegion].cropTypes).map(function(cropType) {return [cropType, store.getters.getRegionalStats[self.selectedRegion].cropTypes[cropType]]}))
                return [["Region", "CropType"]];
            },
            cropSizeData() {
                var self = this;
                if(store.getters.getRegionalStats.hasOwnProperty(self.selectedRegion))
                    return [["Region", "CropSize"]].concat(Object.keys(store.getters.getRegionalStats[self.selectedRegion].cropSizes).map(function(cropSize) {return [cropSize, store.getters.getRegionalStats[self.selectedRegion].cropSizes[cropSize]]}))
                return [["Region", "CropType"]];
            },
            ...mapGetters(['getRegionalStats'])
        }
    }
</script>