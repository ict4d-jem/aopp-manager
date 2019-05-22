<template>
    <div v-show="isAdviceEditorOpen" id="advice-editor-container">
        <span class="close-button" v-on:click="closeAdviceEditor()">X</span>
        <h4>{{titleText}}</h4>

        <audio-recorder
                upload-url="http://127.0.0.1/uploadvoice/"
                :show-download-button="false"
                format="wav"
                :sample-rate="8000"
                :time="10"
                :bit-rate="16"
                :start-record="callback"
                :after-recording="afterRecording"
                :stop-record="callback"
                :before-upload="beforeUpload"
                :successful-upload="callback"
                :failed-upload="callback"/>
    </div>
</template>

<script>
    import store from '../store'
    import { mapGetters } from 'vuex'
    import {VueAudioRecorder} from "vue-audio-recorder";
    import api from '../utils/api'


    export default {
        name: "AdviceEditor",
        components: {
            VueAudioRecorder
        },
        methods: {
            closeAdviceEditor() {
                store.dispatch("closeAdviceEditor");
            },
            afterRecording(data) {
                console.log(data);
                api.sendRecording(data.blob, store.getters.getAdvice.targetType, store.getters.getAdvice.target);
            },
            beforeUpload(data) {
                console.log("Before upload");
                console.log(data);
                return false;
            },
            callback() {

            },
            ...mapGetters(['getUserById'])
        },
        computed: {
            titleText() {
                return 'Add a new advice for ' + store.getters.getAdviceTarget;
            },
            ...mapGetters(['isAdviceEditorOpen'])
        }
    }
</script>