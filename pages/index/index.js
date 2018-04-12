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
Page({
  data:{
    nowTemp:2,
    nowWeather:'',
    nowWeatherBg:'',
    forecast:'',
    todayDate:'',
    todayTemp:''
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh();
    });
  },
  onLoad(){
    this.getNow();
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
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
  onTapDayWeather(){
   wx.navigateTo({
     url: '/pages/list/list',
   })
  }
})