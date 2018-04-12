const weatherMap={
  'sunny':'晴天',
  'clody':'多云',
  'overcast':'阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColor={
  'sunny': '#ff0',
  'clody': '#cbeefd',
  'overcast': '#cbeefd',
  'lightrain': '#cbeefd',
  'heavyrain': '#cbeefd',
  'snow': '#cbeefd'
}
Page({
  data:{
    nowTemp:2,
    nowWeather:'',
    nowWeatherBg:''
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
        let temp = result.now.temp;
        let weather = result.now.weather;
        this.setData({
          nowTemp: temp,
          nowWeather: weatherMap[weather],
          nowWeatherBg: '/images/' + weather + '_bg.png'
        });
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: weatherColor[weather],
        })
      },
      complete:()=>{
        // 如果存在回调函数则执行，不存在则不执行
        callback&&callback();
      }
    })
  }
})