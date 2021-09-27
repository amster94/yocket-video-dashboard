<template>
  <div class="video-compilation">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-4">
        <div class="card">
            <div class="card-body">
              <h1 class="text-left py-3">Combine Video</h1>
              <button class="btn btn-default btn-pink add-video" @click="addVideo()">Add Video</button>
              <table class="table">
                <thead>
                  <th style="width: 50%;"></th>
                  <th style="width: 15%;"></th>
                  <th style="width: 15%;"></th>
                  <th style="width: 20%;"></th>
                </thead>
                <tbody>
                <tr v-for="(item,index) in videoCompilationDataJson" :key="item.video_url" ref="items">
                  <td><input type="text" :id="referenceId('video-link-',index)" :class="combineVideoClass('form-control only-border-bottom combine-video-', index)" placeholder="Video Link"  v-model="videoCompilationDataJson[index].video_url"></td>
                  <td><input type="number" :id="referenceId('start-',index)" :class="combineVideoDurationStartClass('form-control only-border-bottom combine-video-range-duration-start-', index)" placeholder="Start"  v-model="videoCompilationDataJson[index].start"></td>
                  <td><input type="number" :id="referenceId('end-',index)" :class="combineVideoDurationEndClass('form-control only-border-bottom combine-video-range-duration-end-', index)" placeholder="End" v-model="videoCompilationDataJson[index].end"></td>
                  <td><button :class="combineVideoDurationEndClass('btn btn-default btn-pink delete-button delete-combine-video-range-duration-', index)" @click="deleteVideo(index)">DELETE</button></td>
                </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="col-md-2">
                  <input type="number" id="height" class="form-control only-border-bottom video-height" placeholder="Video Height" v-model="height">
                </div>
                <div class="col-md-2">
                  <input type="number" id="width" class="form-control only-border-bottom video-width" placeholder="Video Width" v-model="width">
                </div>
              </div>
              <div class="">
                  <button class="btn btn-default btn-pink waves-effect waves-light combine-video" @click="combineVideos()" :disabled="disabledCombineButton">Combine Videos</button>
              </div>
            </div>
        </div>
      </div>
      <div class="col-md-12 mb-4">
        <div class="col-md-6 mb-4">
               <video width="320" height="240" class="combined-video" controls>
                <source v-bind:src="this.video_url" class="combined-video-source" type="video/mp4">
                </video> 
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'VideoCompilation',
  data() {
    return {
      videoCompilationDataJson: [],
      videoCompilationData: {},
      current_index: 0,
      height: 0,
      width: 0,
      combineVideoJson: [],
      video_url : '',
      disabledCombineButton: true,
      checkCondition: 0
    }
  },
  watch: {
    videoCompilationDataJson: function() {
      
    },
    height: function() {
      if(this.height == 0 || this.width == 0) {
        this.disabledCombineButton = true;
      } else {
        this.disabledCombineButton = false;
      }
    },
    width: function() {
      if(this.height == 0 || this.width == 0) {
        this.disabledCombineButton = true;
      } else {
        this.disabledCombineButton = false;
      }
    },
  },
  methods: {
    addVideo() {
     this.videoCompilationDataJson.push({
       "video_url": "",
       "start": 0,
       "end": 0
     });
     //console.log(this.$refs.items[this.current_index]);
     this.current_index++;
    },
    deleteVideo(x) {
      this.videoCompilationDataJson.splice(x,1);
    },
    combineVideos() {
      this.videoCompilationData.segments = this.videoCompilationDataJson;
      this.videoCompilationData.height = this.height;
       this.videoCompilationData.width = this.width;

       var options = this.videoCompilationData;

       // RUN THE POST REQUEST
       axios.post('/api/combine-video', options)
        .then(response => {
            this.video_url = response.data.video_url;
            console.log(this.video_url);
        })
        .catch((error) => {
            console.log(error);
        });

    },
    referenceId: function(val, index) {
          index++;
          return val+index;
    },
    combineVideoClass: function(val, index) {
          index++;
          return val+index;
    },
    combineVideoDurationStartClass: function(val, index) {
          index++;
          return val+index;
    },
    combineVideoDurationEndClass: function(val, index) {
          index++;
          return val+index;
    },
    combineVideoDurationDeleteButtonClass: function(val, index) {
          index++;
          return val+index;
    },
    getCombinedVideoClass: function(val, index) {
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
.combine-video,.add-video {
  float:left;
}

.only-border-bottom {
  border:none;
  border-bottom: 2px solid #333;
}

tr td {
  border: 0;
}

</style>