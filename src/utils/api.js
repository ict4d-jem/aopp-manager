import * as axios from "axios";

export default {
    sendRecording(wavFile, targetType, target) {
        let data = {targetType, target, wavFile};
        // axios.post("/", data)
        //     .then(function(response) {
        //         console.log(response);
        //     })
        //     .catch(function(error) {
        //         console.log("Error");
        //         console.log(error);
        //     })
    }
}
