<template>
  <div class="video-segment">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container">
      <!-- SEGMENT FORM -->
        <div class="row">
            <div class="col-md-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h1 class="text-left py-3">Segment Video</h1>
                        <!--Body-->
                        <div class="md-form">
                            <input type="text" id="video-link" class="form-control video-link" placeholder="Video Link" v-model="vLink">
                        </div>
                        <div class="md-form">
                            <select name="segment-settings" id="segment-setting" class="form-control segment-setting only-border-bottom" v-model="segmentSetting">
                            <option value="">Select Segment Setting</option>
                            <option value="Interval Duration">Interval Duration</option>
                            </select>
                        </div>
                        <div class="md-form" v-if="segmentOption">
                            <input type="number" id="interval-seconds" class="form-control interval-duration" placeholder="Interval Duration" v-model="interval">
                        </div>
                        <div class="">
                            <button class="btn btn-default btn-pink process-video" @click="segmentVideo()" :disabled="disabledSegmentButton">Segment Video</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- DISPLay VIDEO Section -->
        <div class="row" v-if="renderVideo">
          <div class="col-md-6 mb-4" v-for="(item, index) in segmentVideoJson" :key="item.video_url">
               <video width="320" height="240" :class="getSegmentClass('segmented-video-', index)" controls>
                <source v-bind:src="item.video_url" :class="getSegmentSourceClass('segmented-video-source-', index)" type="video/mp4">
                </video> 
          </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
export default {
  name: 'VideoSegment',
  data() {
      return {
          vLink: '',
          message: '',
          segmentSetting: '',
          interval: 0,
          disabledSegmentButton: true,
          segmentOption: false,
          segmentVideoJson: [],
          renderVideo: true
      }
  },
  watch: {
      vLink: function() {
           // CHECK ALL INPUTS
           if("" !== this.vLink && "" !== this.segmentSetting && 0 < this.interval) {
                this.disabledSegmentButton = false;
            } else {
                this.disabledSegmentButton = true;
            }
      },
      segmentSetting: function() {
          if(this.segmentSetting == "Interval Duration") {
              this.segmentOption = true;
          } else {
              this.segmentOption = false;
          }
          // CHECK ALL INPUTS
          if("" !== this.vLink && "" !== this.segmentSetting && 0 < this.interval) {
              this.disabledSegmentButton = false;
          } else {
                this.disabledSegmentButton = true;
          }
      },
      interval: function() {
           // CHECK ALL INPUTS
           if("" !== this.vLink && "" !== this.segmentSetting && 0 < this.interval) {
              this.disabledSegmentButton = false;
           }  else {
                this.disabledSegmentButton = true;
           }
      }
    //   segmentVideoJson: function() {
    //       console.log("Updated Table");
    //   }
  },
  methods: {
      segmentVideo() {
          // GET THE DATA
          var options = {
              "video_link": this.vLink, 
              "interval_duration": this.interval
          };
          // POST REQUEST
            axios.post('/api/process-interval', options)
            .then(response => {
                this.segmentVideoJson = response.data.interval_videos;
                // this.$set(this.segmentVideoOutputJson, response.data.interval_videos);
                console.log(response.data.interval_videos);
            })
            .catch((error) => {
                console.log(error);
            });   
      },
      getSegmentClass: function(val, index) {
          index++;
          return val+index;
      },
      getSegmentSourceClass: function(val, index) {
          index++;
          return val+index;
      }
  }
}
</script>

<style scoped>

.btn-pink {
  background: #EA4463;
}

.text-left {
    text-align: left;
}

.process-video {
    float:left;
}

.only-border-bottom {
  border:none;
  border-bottom: 1px solid #AAA;
}

</style>
