<template>
  <div id="app" v-bind:class="{frozen: isAdviceEditorOpen}">
    <Header></Header>
    <Map></Map>
    <UserExplorer></UserExplorer>
    <AdviceEditor></AdviceEditor>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Map from './components/Map.vue'
import UserExplorer from './components/UserExplorer.vue'
import AdviceEditor from './components/AdviceEditor.vue'
import store from './store'
import { mapGetters } from 'vuex'

export default {

  name: 'app',
  components: {
      Header,
      Map,
      UserExplorer,
      AdviceEditor
  },
    computed: {
        ...mapGetters(['isAdviceEditorOpen'])
    },
    mounted() {
        store.dispatch("initializeData");
    }
}

var users = [

    //KAYES
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Yelimane",
        "cropType": "Tomatoes",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Nioro",
        "cropType": "Parsley",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Kita",
        "cropType": "Cucumber",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Kenieba",
        "cropType": "Cereals",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Kayes",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Diema",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 222,
        "region": "Kayes",
        "village": "Bafoulabe",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },

    //KOULIKORO
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Nara",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Koulikoro",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Kolokani",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Kati",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Kangaba",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Diola",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 223,
        "region": "Koulikoro",
        "village": "Banamba",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },



    //SEGOU
    {
        "callerId": 224,
        "region": "Segou",
        "village": "Tominian",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 224,
        "region": "Segou",
        "village": "Segou",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 224,
        "region": "Segou",
        "village": "San",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 224,
        "region": "Segou",
        "village": "Niono",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 224,
        "region": "Segou",
        "village": "Macina",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 224,
        "region": "Segou",
        "village": "Baroueli",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },

    //SIKASSO
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Yorosso",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Yanfolida",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Sikasso",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Koutiala",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Kolondieba",
        "cropType": "Mais",
        "cropSize": "21 to 40"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Kadiola",
        "cropType": "Mais",
        "cropSize": "1 to 20"
    },
    {
        "callerId": 225,
        "region": "Sikasso",
        "village": "Bougouni",
        "cropType": "Mais",
        "cropSize": "41 to 60"
    }
];

store.dispatch("setUsers", users);

</script>

<style lang="scss">
  @import './assets/scss/custom.scss';
</style>
