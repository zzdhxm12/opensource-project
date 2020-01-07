<template>
  <header>
    <h1>TODO it!</h1>
    <div id="current">
      <b-button id="day" v-bind:variant="reversethema">Today is.. {{ printDate() }} <br><br>
        <span id="logout">
          <i id="weatherInfo" v-if="weather.name">
            <img v-bind:src="imageUrl"/>
            {{ weather.name }}
            {{(weather.main.temp - 273.15).toFixed(2)}}°C
            {{ weather.weather[0].main }}
          </i>
        </span>
        </b-button>
    </div><br><br><br><br>
    <p align="right">
      <i class="fas fa-hand-point-right"></i>
      Email : <a class="js-emaillink" href="mailto:authname">{{ authname }}</a>
      <i class="far fa-copy" id="js-emailcopybtn" @click="copyemail"></i>
      <i class="fas fa-hand-point-left"></i>
      <span  id="logout">
        <b-badge pill @click="logout" v-bind:variant="thema">Log Out</b-badge>
      </span>
    </p>
        <p align="right">
          <b-badge pill v-bind:variant="thema">
          <i class="fas fa-cog"></i>
          <b-badge pill @click="startFull" id="startFull">Full</b-badge>
          <b-badge pill id="exit">UnFull</b-badge>
          <b-badge pill @click="lockscreen" id="lock">Lock</b-badge>
          <b-badge pill id="unlock">UnLock</b-badge>
          <b-badge pill @click="battery" id="battery">Battery</b-badge>
          <b-badge pill @click="status" id="status">State/Network/Memory</b-badge>
          <b-badge pill @click="getLocation">Weather</b-badge>
          </b-badge>
        </p>
        <div id="device"></div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data(){
    return{
      weather: {name:'', main:{temp:''}, weather:[{main:'', description:''}]},
      imageUrl: '',
      geoLocation:{lat:0, lng:0},
    }
  },
  methods:{
    copyemail:function(){
      function performCopyEmail() {
        var selection = window.getSelection();
        var emailLink = document.querySelector('.js-emaillink');
        navigator.clipboard.writeText(emailLink.textContent)
          .then(() => alert("copy to email"))
          .catch(err => alert("fail copy"))
      }
      var copyEmailBtn = document.querySelector('#js-emailcopybtn');
      copyEmailBtn.addEventListener('click', performCopyEmail);
    },
    lockscreen:function(){
      alert("잠금기능은 모바일에서만 가능!");
      var $ = document.getElementById.bind(document);
      var orientKey = 'orientation';
      if ('mozOrientation' in screen) {
      orientKey = 'mozOrientation';
      } else if ('msOrientation' in screen) {
      orientKey = 'msOrientation';
      }
      var device = $('device');
      if (screen[orientKey]) {
      function update() {
        var type = screen[orientKey].type || screen[orientKey];
        //orientationTypeLabel.innerHTML = type;
        var landscape = type.indexOf('landscape') !== -1;
        if (landscape) {
          device.style.width = '180px';
          device.style.height = '100px';
        } else {
          device.style.width = '100px';
          device.style.height = '180px';
        }
        var rotate = type.indexOf('secondary') === -1 ? 0 : 180;
        var rotateStr = 'rotate(' + rotate + 'deg)';
        device.style.webkitTransform = rotateStr;
        device.style.MozTransform = rotateStr;
        device.style.transform = rotateStr;
      }
      update();
      var onOrientationChange = null;
      if ('onchange' in screen[orientKey]) { // newer API
        onOrientationChange = function () {
          update();
        };
        screen[orientKey].addEventListener('change', onOrientationChange);
      } else if ('onorientationchange' in screen) { // older API
        onOrientationChange = function () {
          update();
        };
        screen.addEventListener('orientationchange', onOrientationChange);
      }
      // browsers require full screen mode in order to obtain the orientation lock
      var goFullScreen = null;
      var exitFullScreen = null;
      if ('requestFullscreen' in document.documentElement) {
        goFullScreen = 'requestFullscreen';
        exitFullScreen = 'exitFullscreen';
      } else if ('mozRequestFullScreen' in document.documentElement) {
        goFullScreen = 'mozRequestFullScreen';
        exitFullScreen = 'mozCancelFullScreen';
      } else if ('webkitRequestFullscreen' in document.documentElement) {
        goFullScreen = 'webkitRequestFullscreen';
        exitFullScreen = 'webkitExitFullscreen';
      } else if ('msRequestFullscreen') {
        goFullScreen = 'msRequestFullscreen';
        exitFullScreen = 'msExitFullscreen';
      }
      //lock
      $('lock').addEventListener('click', function () {
        document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();
        var promise = null;
        if (screen[orientKey].lock) {
          promise = screen[orientKey].lock(screen[orientKey].type);
        } else {
          promise = screen.orientationLock(screen[orientKey]);
        }
        promise
          .then(function(){
            $('unlock').style.display = 'inline-block';
            $('lock').style.display = 'none';
          })
          .catch(function (err){
            document.documentElement[exitFullScreen] && document.documentElement[exitFullScreen]();
          });
      });
      //unlock
      $('unlock').addEventListener('click', function () {
        document.documentElement[exitFullScreen] && document.documentElement[exitFullScreen]();
        if (screen[orientKey].unlock) {
          screen[orientKey].unlock();
        } else {
          screen.orientationUnlock();
        }
        $('unlock').style.display = 'none';
        $('lock').style.display = 'inline-block';
      });
      }
    },
    status:function(){
      alert("Online state : "+navigator.onLine? 'online':'offline');
      alert("Network Status: "+navigator.connection.effectiveType + "\n" +"Device Memory: "+navigator.deviceMemory+"GiB.");
    },
    battery:function(){
        let batteryPromise = navigator.getBattery();
        batteryPromise.then(battery => {
          navigator.vibrate(200);
          alert("Battery Status: " + battery.level*100+ "\n" + "Battery Charging: " + battery.charging);
        });
    },
    startFull:function(){
      var $ = document.querySelector.bind(document);
      var $$ = function (selector) {
        return [].slice.call(document.querySelectorAll(selector), 0);
      }
      var prefix = null;
      if ('requestFullscreen' in document.documentElement) {
        prefix = 'fullscreen';
      } else if ('mozRequestFullScreen' in document.documentElement) {
        prefix = 'mozFullScreen';
      } else if ('webkitRequestFullscreen' in document.documentElement) {
        prefix = 'webkitFullscreen';
      } else if ('msRequestFullscreen') {
        prefix = 'msFullscreen';
      }
      var onFullscreenChange = function () {
        var elementName = 'not set';
        if (document[prefix + 'Element']) {
          elementName = document[prefix + 'Element'].nodeName;
        }
        onFullscreenHandler(!!document[prefix + 'Element']);
      }
      if (document[prefix + 'Enabled']) {
        var onFullscreenHandler = function (started) {
          $('#exit').style.display = started ? 'inline-block' : 'none';
          $$('.start').forEach(function (x) {
            x.style.display = started ? 'none' : 'inline-block';
          });
        };
        document.addEventListener(prefix.toLowerCase() + 'change', onFullscreenChange);
        var goFullScreen = null;
        var exitFullScreen = null;
        if ('requestFullscreen' in document.documentElement) {
          goFullScreen = 'requestFullscreen';
          exitFullScreen = 'exitFullscreen';
        } else if ('mozRequestFullScreen' in document.documentElement) {
          goFullScreen = 'mozRequestFullScreen';
          exitFullScreen = 'mozCancelFullScreen';
        } else if ('webkitRequestFullscreen' in document.documentElement) {
          goFullScreen = 'webkitRequestFullscreen';
          exitFullScreen = 'webkitExitFullscreen';
        } else if ('msRequestFullscreen') {
          goFullScreen = 'msRequestFullscreen';
          exitFullScreen = 'msExitFullscreen';
        }
        var goFullscreenHandler = function (element) {
          return function () {
            var maybePromise = element[goFullScreen]();
            if (maybePromise && maybePromise.catch) {
              maybePromise.catch(function (err) {
              });
            }
          };
        };
        $('#startFull').addEventListener('click',goFullscreenHandler(document.documentElement));
        $('#exit').addEventListener('click', function (){document[exitFullScreen]();});
      }
    },
    printDate(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1
      var day = date.getDate();
      if(month < 10){
          month = "0" + month;
      }
      if(day < 10){
          day = "0" + day;
      }
      var today = year+"년 "+month+"월 "+day+"일 ";
      return today;
    },
    logout(){
      this.$store.dispatch('logout');
    },
    getLocation(){
      var options={
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
      }
      let temp = this;
        this.$getLocation(options)
        .then(coordinates => {
          temp.geoLocation.lat = coordinates.lat;
          temp.geoLocation.lng = coordinates.lng;
          temp.getWeather();
        });
        console.log(JSON.stringify(this.weather));
    },
    getWeather(){
       var apiKey = "2553feadd1d8eb56f5cf7e2e205e8af6";
       let temp = this;
       var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat="+JSON.stringify(this.geoLocation.lat)+"&lon="+JSON.stringify(this.geoLocation.lng)+"&appid="+apiKey;
           $.ajax({
               url: apiURI,
               dataType: "json",
               type: "GET",
               async: "false",
               success: function(resp) {
                 temp.weather = resp;
                 temp.imageUrl = "https://openweathermap.org/img/w/"+ temp.weather.weather[0].icon +".png";
               }
           })
    },
  },
  computed: {
    reversethema(){
      return this.$store.getters.getreverseThema;
    },
    authname(){ //route로 추가
      return this.$store.getters.getAuth.name;
    },
    thema(){
      return this.$store.getters.getThema;
    },
  },
}

</script>

<style scoped>
  header{
    text-align:center;
  }
  h1 {
    color: #2F3B52;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
  #current{
    margin: auto;
    padding: 1px;

    height: 50px;
    width:100%;
    line-height: 20px;
    border-radius: 5px;
    float:center;
  }
  #day{
    line-height:40px;
    text-align:center;
    font-size:calc(20px + 1vw);
  }
  #logout{
    width:6em;
    height:3em;
    color: #FFFFFF;
    border-radius: 7px;
    font-size:calc(10px + 0.8vw);
    text-align:left;
    float:center;
  }
  #weatherInfo{
    width:300px;
    height:40px;
    background-color:#377bb3;
    border-radius:15px;
    padding:3px;
    text-align:center;
    align-content: center;
    -webkit-text-fill-color:white;
  }
  #exit {
    display: none;
  }
  #unlock {
    display: none;
  }
</style>
