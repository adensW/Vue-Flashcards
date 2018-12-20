<template>
    <div class="container--template">
       <div v-if="loading">
           loading
       </div>
       <div v-if="error">
           error
       </div>
        <div v-if="cards" class='layout__viewport anim__container'
             v-finger:swipe="swipe"
        >
           <div class="anim__slider layout__container" 
           v-bind:class="{'anim__slider--active':isSlider,'anim__silder--reverse':!isSlider}"
           >
            <card-list-item class="layout__item"
            v-for="card in cards" :key="card.id"
            v-bind:card="card"
            >
            </card-list-item>
           </div>
        </div>
        <div>
            <button v-on:click="slider(-1)">left</button>
            <button v-on:click="slider(1)">right</button>
        </div>
       <i><v-btn float fab color='#1f7cda' v-on:click="add"><v-icon dark>add</v-icon></v-btn></i>
    </div>
</template>
<script>
import CardListItem from "./CardListItem";
import { VueAnime } from "vue-anime";

export default {
  name: "CardList",
  components: {
    CardListItem,
    VueAnime
  },
  data() {
    return {
      loading: true,
      error: false,
      offset: 0,
      isSlider: false,
      cards: [],
      threshold: 90,
      index: 0
    };
  },

  created() {
    // this.init();
  },
  mounted() {
    this.init();
  },
  watch: {
    $route: "init"
  },
  methods: {
    add:function(){
      let item = {
        id:this.$uuid.v1(),
        back:"",
        front:"",
        comment:"",
        setId:this.$route.params.id
      }
      // this.cards.push(item);
      this.$store.dispatch('addCard',item);
    },
    rotate: function(evt) {
      // console.log(evt);
    },
    pressMove: function(evt) {
      if (Math.abs(this.offset) < this.threshold) {
        this.offset += evt.deltaX;
        let elem = document.getElementsByClassName("anim__slider");
        let moveoffset =
          this.offset * (21 / this.threshold) +
          (this.offset / Math.abs(this.offset)) * 21 * this.index;
        let cssstyle = elem.item(0).style;
        cssstyle.transform = "translateX(" + moveoffset + "rem)";
        // console.log(moveoffset);
      } else {
        this.isSlider = !this.isSlider;
        if (this.offset > 0) {
          this.index -= 1;
        } else {
          this.index += 1;
        }
        this.offset = 0;
      }
    },
    swipe: function(evt) {
      switch (evt.direction) {
        case "Left":
          if (this.currentCardId >= this.cards.length - 1) {
            this.currentCtiardId = this.cards.length;
          } else {
            this.isSlider = true;
            let elem = document.getElementsByClassName("anim__slider");

            let cssstyle = elem.item(0).style;
            this.offset = this.offset + -21;
            cssstyle.transform = "translateX(" + this.offset + "rem)";
          }

          break;
        case "Right":
          if (this.currentCardId <= 0) {
            this.currentCardId = 0 * 1;
          } else {
            this.isSlider = false;
            let elem = document.getElementsByClassName("anim__slider");
            let cssstyle = elem.item(0).style;
            this.offset = this.offset + 21;
            cssstyle.transform = "translateX(" + this.offset + "rem)";
          }

          break;
        case "Up":
          break;
        case "Down":
          break;
      }
    },
    init: function() {
      let setId = this.$route.params.id;
      this.$aidb
        .open("DB_Vue_FlashCard")
        .getQuery("Cards",{ setId: setId })
        .then(data => {
          this.$store.commit("initCards", data);
          this.cards = this.$store.getters.AllCards;
          this.loading = false;
        });
     
    },
    slider: function(dir) {
      if (typeof dir != "undefined") {
        if (dir === -1) {
          this.isSlider = true;
          let elem = document.getElementsByClassName("anim__slider");
          let cssstyle = elem.item(0).style;
          this.offset = this.offset + -21;
          cssstyle.transform = "translateX(" + this.offset + "rem)";
        } else {
          this.isSlider = false;
          let elem = document.getElementsByClassName("anim__slider");
          let cssstyle = elem.item(0).style;
          this.offset = this.offset + 21;
          cssstyle.transform = "translateX(" + this.offset + "rem)";
        }
      }
    }
  }
};
</script>
<style scoped>
.container--template {
  display: block;
  height: 24rem;
}
.layout__container {
  width: 100%; /* card width */
  height: 24rem;
  display: flex;
}
.layout__viewport {
  width: 100%;
  height: 2rem;
  overflow: hidden;
}
.layout__item {
  margin-right: 2rem;
  /* transform: translate(-50%,0); */
  /* position: absolute; */
}
.layout__item:first-child {
  margin-left: 8rem;
}
.anim__container {
  height: 100%;
  margin-bottom: 4rem;
}
.anim__slider {
  transition: all 0.5s;
  position: absolute;
}
.anim__slider--active {
  transform: translateX(0);
}
.anim__slider--reverse {
  transform: translateX(0);
}
</style>



