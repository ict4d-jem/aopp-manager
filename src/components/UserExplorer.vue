<template>
    <div id="user-explorer-container" class="row">
        <div class="col-md-9 offset-md-3">
            <div id="user-explorer">
                <div class="card" v-for="(villages, region, i) in getRegions">
                    <div class="card-header">
                        <b-button
                                size="sm"
                                variant="link"
                                :class="showCollapse[region] ? 'collapsed' : null"
                                :aria-expanded="showCollapse[region] ? 'true' : 'false'"
                                aria-controls="'collapse-' + region"
                                @click="showCollapse[region] = !showCollapse[region]">
                            {{region}}
                        </b-button>
                        <!--<button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse-' + region" aria-expanded="false" :aria-controls="'collapse-' + region">{{region}}</button>-->
                        <!--<button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse-' + region" :aria-expanded="i == 0 ? 'true' : 'false'" :aria-controls="'collapse-' + region">{{region}}</button>-->
                        <button v-on:click="openRegionAdviceEditor(region)" class="btn btn-primary btn-sm">Add advice</button>
                    </div>

                    <!--<div :id="'collapse-' + region" :class="{'collapse': true, 'show': i==0}" :aria-labelledby="'heading' + region" data-parent="#user-explorer-container">-->
                    <!--<div :id="'collapse-' + region" class="collapse" :aria-labelledby="'heading' + region" data-parent="#accordion">-->
                    <b-collapse :id="'collapse-' + region" v-model="showCollapse[region]" class="mt-2">
                        <div class="card-body inner-bottom-shadow">
                            <div v-for="(users, village, j) in villages">
                                <h5>{{village}}</h5>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Caller Id</th>
                                        <th>Region</th>
                                        <th>Village</th>
                                        <th>Crop type</th>
                                        <th>Crop size</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in users">
                                        <th>{{getUserById()(user).callerId}}</th>
                                        <th>{{getUserById()(user).region}}</th>
                                        <th>{{getUserById()(user).village}}</th>
                                        <th>{{getUserById()(user).cropType}}</th>
                                        <th>{{getUserById()(user).cropSize}}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-collapse>
                    <!--</div>-->
                </div>
            </div>

        </div>

    </div>
</template>


<script>

    import store from '../store'
    import { mapGetters } from 'vuex'

    export default {
        name: "UserExplorer",
        methods: {
            openRegionAdviceEditor(region) {
                console.log("In openRegionAdviceEditor. Region: " + region);
                store.dispatch("openAdviceEditor", {targetType: "region", target: region});
            },
            initializeRegionsShowCollapse() {
                console.log(store.getters.getRegionList);
                var obj = {};
                for(let i = 0; i < store.getters.getRegionList.length; i++) {
                    let region = store.getters.getRegionList[i];
                    if(i == 0)
                        obj[region] = true;
                    else
                        obj[region] = false;
                }
                return obj;
            },
            ...mapGetters(['getUserById'])
        },
        data() {
            return {
                showCollapse: this.initializeRegionsShowCollapse()
            }
        },
        computed: {
            ...mapGetters(['getRegions'])
        }
    }
</script>