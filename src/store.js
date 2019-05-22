import Vue from 'vue'
import Vuex from 'vuex'

import api from './utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [{

        }],
        regions: {

        },
        regionalStats: {

        },
        idToUser: {

        },
        advices: {
            adviceEditor: {
                open: false,
                targetTyoe: "",
                target: ""
            },
            data: {

            }
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setRegions(state, regions) {
            state.regions = regions;
        },
        setIdToUser(state, idToUserObj) {
            state.idToUser = idToUserObj;
        },
        setRegionalStats(state, stats) {
            console.log(stats);
            state.regionalStats = stats;
        },
        openAdviceEditor(state, {targetType, target}) {
            state.advices.adviceEditor.open = true;
            state.advices.adviceEditor.targetTyoe = targetType;
            state.advices.adviceEditor.target = target;

        },
        closeAdviceEditor(state) {
            state.advices.adviceEditor.open = false;
        }
    },
    actions: {
        initializeData({commit, state}) {

        },
        setUsers({commit, state}, users) {

            function randomUsers(users, amount) {
                regions = [];
                let villages = [];
                let cropTypes = [];
                let cropSizes = [];
                for(let i = 0; i < users.length; i++){
                    let user = users[i];
                    if(!regions.includes(user.region))
                        regions.push(user.region);
                    if(!villages.includes(user.village))
                        villages.push(user.village);
                    if(!cropTypes.includes(user.cropType))
                        cropTypes.push(user.cropType);
                    if(!cropSizes.includes(user.cropSize))
                        cropSizes.push(user.cropSize);

                }

                var randomUsers = [];
                for(let i = 0; i < amount; i++) {
                       randomUsers.push({
                           callerId: Math.floor(Math.random() * 1000),
                           region: regions[Math.floor(Math.random() * regions.length)],
                           village: villages[Math.floor(Math.random() * villages.length)],
                           cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
                           cropSize: cropSizes[Math.floor(Math.random() * cropSizes.length)]
                       });
                }
                return randomUsers;
            }

            users = users.concat(randomUsers(users, 100));

            var regions = {};
            var regionalStats = {};
            var idToUser = {};
            if(users && users.length > 0) {
                for(var i = 0; i < users.length; i++) {
                    let user = users[i];
                    if(!regions.hasOwnProperty(user["region"])) {
                        regions[user["region"]] = {};

                        regionalStats[user["region"]] = {};
                        regionalStats[user["region"]]["users"] = 0;
                        regionalStats[user["region"]]["cropTypes"] = {};
                        regionalStats[user["region"]]["cropSizes"] = {};
                    }
                    if(!regions[user["region"]].hasOwnProperty(user["village"]))
                        regions[user["region"]][user["village"]] = [];
                    regions[user["region"]][user["village"]].push(user["callerId"]);
                    idToUser[user.callerId] = user;


                    regionalStats[user["region"]]["users"] ++;
                    if(!regionalStats[user["region"]]["cropSizes"].hasOwnProperty(user["cropSize"]))
                        regionalStats[user["region"]]["cropSizes"][user["cropSize"]] = 0;
                    if(!regionalStats[user["region"]]["cropTypes"].hasOwnProperty(user["cropType"]))
                        regionalStats[user["region"]]["cropTypes"][user["cropType"]] = 0;

                    regionalStats[user["region"]]["cropSizes"][user["cropSize"]] ++;
                    regionalStats[user["region"]]["cropTypes"][user["cropType"]] ++;

                }
            }




            commit("setUsers", users);
            commit("setRegions", regions);
            commit("setIdToUser", idToUser);
            commit("setRegionalStats", regionalStats);

        },
        openAdviceEditor({commit, state}, targetType, target) {
            commit("openAdviceEditor", targetType, target);
        },
        closeAdviceEditor({commit, state}) {
            commit("closeAdviceEditor");
        },

    },
    getters: {
        getRegions(state) {
            return state.regions;
        },
        getRegionList(state) {
          return Object.keys(state.regions);
        },
        getUserById: (state) => (id) => {
            return state.idToUser[id];
        },
        getRegionalStats(state) {
            return state.regionalStats;
        },
        isAdviceEditorOpen(state) {
            return state.advices.adviceEditor.open;
        },
        getAdvice(state) {
            return state.advices.adviceEditor;
        },
        getAdviceTarget(state) {
            return state.advices.adviceEditor.target;
        }
    }
})
