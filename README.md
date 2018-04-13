5-1获取当前位置
21、获取经纬度，通过wx.getLocation

22、经纬度转换为城市，需要调用外部接口http://lbs.qq.com/qqmap_wx_jssdk/index.html


	* 申请开发者密钥（key） ODEBZ-L24RS-MRQOR-6SFSX-VRBAO-R5FRU

	* 下载微信小程序JavaScriptSDK

	* 安全域名设置，在“设置” -> “开发设置”中设置request合法域名，添加https://apis.map.qq.com

	*  小程序实例




 
23、bug问题解决

	* 问题：https://apis.map.qq.com 不在以下 request 合法域名列表中
	* 方法：1、把域名添加到项目--》服务器配置中。2、在开发工具中，点击详情，刷新域名信息



24、页面之间参数的传递和获取？

	* 在App.js中设置全局变量
	* 通过拼接URL直接传递
	* 通过数据缓存存储在获取


25、获取位置被拒绝的时候，在生命周期函数onShow中处理权限

