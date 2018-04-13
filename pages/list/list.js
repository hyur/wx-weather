const weatherDayMap={
  '0':'日',
  '1':'一',
  '2':'二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六'
}
Page({
  data:{
    futureWeather:'',
    city:'上海市'
  },
  onLoad(options){
    console.log('onLoad');
    this.setData({
      city:options.city
    })
    this.getWeekWeather();
  },
  onShow: function () { 
    console.log('onShow');
  }, 
  onReady: function () {
    console.log('onReady');
   }, 
  onHide: function () {
    console.log('onHide');
   }, 
  onUnload: function () { 
    console.log('onUnload');
  }, 
  onLaunch: function () { 
    console.log('onLaunch');
  }, 
  onError: function () { 
    console.log('onError');
  }, 
  onPullDownRefrush(){
    this.getWeekWeather(()=>{
      wx.stopPullDownRefresh();
    });
  },
  getWeekWeather(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: this.data.city,
        time: new Date().getTime()
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let result = res.data.result;
        this.setWeekWeather(result);
      },
      complete:()=>{
        callback&&callback();
      }
    })
  },
  setWeekWeather(result){
    let futureWeather = [];
    for (let i = 0; i < result.length; i++) {
      let date = new Date();
      // 获取未来7天
      date.setDate(date.getDate()+i);
      futureWeather.push({
        day: "星期" + weatherDayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        temp: result[i].minTemp + '°-' + result[i].maxTemp + '°',
        imgUrl: '/images/' + result[i].weather + '-icon.png'
      })
    }
    futureWeather[0].day= "今天";
    this.setData({
      futureWeather
    })
  }
})