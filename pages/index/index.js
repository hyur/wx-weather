const weatherMap={
  'sunny':'晴天',
  'cloudy':'多云',
  'overcast':'阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColor={
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 声明三个常量来表示状态的值
const UNPROMPTED =0;
const UNAUTHORIZED = 1;
const AUTHORIZED  = 2;

Page({
  data:{
    nowTemp:2,
    nowWeather:'',
    nowWeatherBg:'',
    forecast:'',
    todayDate:'',
    todayTemp:'',
    city:'上海市',
    locationAuthType: UNPROMPTED
  },
  onLoad(){
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
       key:'ODEBZ-L24RS-MRQOR-6SFSX-VRBAO-R5FRU'
     });
     wx.getSetting({
       success:res=>{
         let auth = res.authSetting['scope.userLocation'];
        this.setData({
          locationAuthType: auth ? AUTHORIZED : (auth === false) ? UNAUTHORIZED : UNPROMPTED
        })
        if(auth){
          this.getCityAndWeather();
        }else{
          this.getNow();
        }
       }
     })
     this.getNow();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh();
    });
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: this.data.city
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data.result;
        this.setNow(result);
        this.setHourly(result);  
        this.setToday(result); 
      },
      complete:()=>{
        // 如果存在回调函数则执行，不存在则不执行
        callback&&callback();
      }
    })
  },
  // 设置当前的时间
  setNow(result){
    let temp = result.now.temp;
    let weather = result.now.weather;
    this.setData({
      nowTemp: temp,
      nowWeather: weatherMap[weather],
      nowWeatherBg: '/images/' + weather + '-bg.png', 
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: weatherColor[weather],
    })
  },
  // 设置未来24小时的时间
  setHourly(result){
    let forecast = result.forecast;
    let currentTime = new Date().getHours();
    for (let i = 0; i < 8; i++) {
      forecast[i].timeValue = i == 0 ? "现在" : currentTime + "时";
      currentTime += 3;
      if (currentTime > 24) {
        currentTime -= 24;
      }
    }
    this.setData({
      forecast
    })
  },
  // 设置今天
  setToday(result){
    let date = new Date();
    this.setData({
      todayDate:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}今天`,
      todayTemp: `${result.today.minTemp}°-${result.today.maxTemp}°`
    })
  },
  // 页面跳转
  onTapDayWeather(){
   wx.navigateTo({
     url: '/pages/list/list?city='+this.data.city,
   })
  },
  //点击获取当前位置
  getCurrentLocation(){
    if (this.data.locationAuthType===UNAUTHORIZED){
      // 开启位置权限
      wx.openSetting({
        success:res=>{
          let auth = res.authSetting['scope.userLocation'];
          if (auth) {
            // 权限从无到有
            this.setData({
              locationAuthType: AUTHORIZED
            })
          }
          this.getCityAndWeather();
        }
      })
    }else
      // 获取当前位置
      this.getCityAndWeather()
    },
  getCityAndWeather(){
     wx.getLocation({
      success: (res)=> {
        this.setData({
          locationAuthType: AUTHORIZED
        })
        let latitude= res.latitude;
        let longitude=res.longitude;
        //调用接口
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: res => {
            let city = res.result.address_component.city;
            this.setData({
              city:city
            }); 
          }
        });
      },
      fail:()=>{
        this.setData({
          locationAuthType: UNAUTHORIZED
        })
      }
     })
  }
})