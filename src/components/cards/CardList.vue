<template>
    <div class="container--template">
        <a-carousel class="tempdiv">
          
          <a-carousel-item v-for="card in cards" :key="card.id">
            <card-list-item :card="card"></card-list-item>
          </a-carousel-item>
        </a-carousel>
       <a-btn fab color='#ffffff' @click="add">+</a-btn>
    </div>
</template>
<script>
import ABtn from '@/components/ui/button/ABtn'
import ACarousel from  '@/components/ui/view/carousel/ACarousel'
import ACarouselItem from  '@/components/ui/view/carousel/ACarouselItem'
import CardListItem from './CardListItem'
export default {
  name: "CardList",
  components: {
    ACarousel,ACarouselItem,ABtn,
    CardListItem
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
.tempdiv{
  margin-left: 30%;
  height:60Vh;
  width: 60vw;
  }
</style>



