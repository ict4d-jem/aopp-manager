<template>
    <div id="map-stats-container" class="row">

        <div class="col-md-3">
            <RegionStats :selectedRegion="selectedRegion"/>
        </div>

        <div class="col-md-9">
            <vl-map  ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                     data-projection="EPSG:4326" @click="onMapClick" :controls=false :interactions="{mouseWheelZoom:false}">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                <vl-geoloc @update:position="geolocPosition = $event">
                    <template slot-scope="geoloc">
                        <vl-feature v-if="geoloc.position" id="position-feature">
                            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                            <vl-style-box>
                                <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                            </vl-style-box>
                        </vl-feature>
                    </template>
                </vl-geoloc>

                <vl-layer-tile id="osm">
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>

                <vl-layer-vector ref="vtLayer" :declutter="true" v-for="region in this.regions" :key="region">
                    <vl-source-vector :url="'/geo_vectors/' + region + '.json'"></vl-source-vector>
                    <vl-style-func :factory="vtStyleFuncFactory"></vl-style-func>
                </vl-layer-vector>

            </vl-map>
        </div>

    </div>
</template>

<script>

    import RegionStats from './RegionStats.vue'
    import * as ol_style from 'ol/style';
    import * as ol_extent from 'ol/extent';

    export default {
        name: "Map",
        components: {
            RegionStats
        },
        data () {
            return {
                regions: ["Bamako", "Gao", "Kayes", "Kidal", "Koulikoro", "Mopti", "Segou", "Sikasso", "Timbuktu"],
                zoom: 5.5,
                center: [ -4.508272831937474, 17.841693861287126 ],
                rotation: 0,
                geolocPosition: undefined,

                selectedRegion: "",
                vtSelection: {},
                vtSelectMode: 'single',
            }
        },
        mounted () {
            this.loading = true;
        },
        methods: {
            hovering(data) {
//                console.log('hovered');
//                console.log(data);
            },
            vtStyleFuncFactory() {
                return feature => {
//                    console.log(feature);
                    let selected = !!this.vtSelection[feature["id_"]];
                    if(selected && "values_" in feature && "NAME_1" in feature["values_"]) {
                        this.selectedRegion = this.normalize(feature["values_"]["NAME_1"]);
                    }
                    return [
                        new ol_style.Style({
                            stroke: new ol_style.Stroke({
                                color: selected ? 'rgb(66, 244, 188)' : 'rgb(66, 244, 188)',
                                width: selected ? 2 : 1,
                            }),
                            fill: new ol_style.Fill({
                                color: selected ? 'rgba(200,20,20,0.2)' : 'rgb(244, 152, 65, 0.2)',
                            })
                        })
                    ]
                }
            },
            onMapClick (evt) {
                let features = this.$refs.map.$map.getFeaturesAtPixel(evt.pixel)
                if (!features) {
                    this.vtSelection = {}
                    // force redraw of layer style
                    this.$refs.vtLayer.forEach(function(layer) {layer.refresh()})
                    return
                }

                let feature = features[0]
                let fid = feature["id_"]

                if (this.vtSelectMode === 'single') {
                    this.vtSelection = {}
                }
                // add selected feature to lookup
                this.vtSelection[fid] = feature

                // force redraw of layer style
                this.$refs.vtLayer.forEach(function(layer) {layer.refresh()})
            },
            normalize(str) {
                return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            }
        }
    }
</script>