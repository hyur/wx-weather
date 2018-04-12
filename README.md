# wx-weather
分支1-1提交内容：
4、rpx（responsive pixel）可以根据屏幕宽度进行自适应，规定任何手机屏幕宽度为750rpx

	* iphone7的宽高比是375*667，因此屏幕宽度对应667/375*750rpx = 1334rpx
	* iPhone 7 Plus 宽高比 414 x 736，因此屏幕高度对应与 736 / 414 x 750 rpx = 1333.33 rpx
	* iPhone X 宽高比 375 x 812，因此屏幕高度对应与 812 / 375 x 750 rpx = 1624 rpx   


5、比较分支的修改（在示范代码中查看）

	* 如果未切换到某个分支，你可以使用git diff origin/1-1 origin 2-1来比较不同
	* 也可以先git checkout 2-1分支后，在查看两个分支的不同git diff 1-1 2-1  


6、通常来说，行高是字体的1.4倍
7、修改微信小程序标题栏颜色在app.json中查找navigationBarBackgroundColor  

分支2-1提交内容：
8、小程序启动的时候，会首先调用启动页面的onLoader()函数，作为Page()函数其中的一个参数。
9、获取真实的天气数据流程：

	* 调用天气API获取json数据
	* 解析json数据并展示
	* 下拉刷新

10、天气api的查看地址是https://github.com/udacity/cn-wechat-weather/blob/default-1-1/weather_api.md
        天气api的请求地址是：https://test-miniprogram.com/api/weather/now?city=%E4%B8%8A%E6%B5%B7%E5%B8%82
    URL的组成:

	* 协议。它可以是HTTP(不带SSL)或HTTPS(带SSL)
	* 主机。例如test-miniprogram.com
	* 路径。例如/api/weather/now
	* 查询字符串。规则为？后显示参数查询值，如？city=上海市


11、JSON扁平化的代码可以通过在线网站格式化，推荐网站为https://codebeautify.org/jsonviewer   
12、bug解决：wx.request()提交请求的时候出现“不在以下 request 合法域名列表中”

	* 解决方法：微信平台---》设置----》开发设置------->服务器配置----->bug解决


13、微信发送请求使用wx.request()具体使用方式可查看api
        wx.request保证了API返回的所有数据都存储在res.data中
14、WXHL中的动态数据都来自于Paga中的data
15、实现下拉刷新功能：

	* 需要在config的window选项中开启 enablePullDownRefresh
	* 在Page函数中调用onPullDownRefresh()函数，请求天气API
	* 数据返回后，在compolete()函数中调用停止刷新wx.stopPullDownRefresh()函数
	* 把公共功能getNow()提取（请求天气API）出来的时候，onLoad()函数也调用了停止刷新。解决办法是：给getNow添加回调参数如getNow（callback），在complete函数中判断回调函数若存在则执行。

