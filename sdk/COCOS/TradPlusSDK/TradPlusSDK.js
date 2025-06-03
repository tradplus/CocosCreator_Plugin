window.TPAdPosition = {
    TopLeft : 0,
    TopCenter : 1,
    TopRight : 2,
    Centered : 3,
    BottomLeft : 4,
    BottomCenter : 5,
    BottomRight : 6
},
window.TPPlatformID = {
    Meta : 1,
    Admob : 2,
    AdColony : 4,
    UnityAds : 5,
    Tapjoy : 6,
    Liftoff : 7,
    AppLovin : 9,
    IronSource : 10,
    Chartboost : 15,
    TencentAds : 16,//优量汇
    CSJ : 17,//穿山甲
    Mintegral : 18,
    Pangle : 19,
    KuaishouAds : 20,
    Sigmob : 21,
    Inmobi : 23,
    Fyber : 24,
    YouDao : 25,
    CrossPromotion : 27,//交叉推广
    StartIO : 28,
    Helium : 30,
    Maio : 31,
    Criteo : 32,
    MyTarget : 33,
    Ogury : 34,
    AppNext : 35,
    Kidoz : 37,
    Smaato : 38,
    ADX : 40,
    HuaWei : 41,
    Baidu : 43,//百度
    Klevin : 44,//游可赢
    A4G : 45,
    Mimo : 46,//米盟
    SuperAwesome : 47,
    GoogleAdManager : 48,
    Yandex : 50,
    Verve : 53,
    ZMaticoo : 55,
    ReklamUp : 56,
    Bigo : 57,
    Beizi : 58,
    TapTap : 63,
    ONEMOB : 60,
    PremiumAds : 64,
    GreedyGame : 67,
    AlgoriX : 68,
    BeesAds : 69,
    Amazon : 70,
    MangoX : 71,
    Sailoff : 72,
    TanX : 73,//阿里妈妈
    TaurusX : 74,
    KwaiAds : 75,
    Columbus : 76,
    YSO : 77,
    VivoAds : 78,
    OppoAds : 79,
    HONOR : 80,
};
window.TPPAGPAConsentType = {
    NoConsent : 0,
    Consent : 1,
};
//初始化,隐私设置等
window.TradPlusAds = {
     PluginVersion : "1.0,0",
     //全局展示
     TPGlobalAdImpressionListener : {
        listener : null,
        onGlobalAdImpression:function(adInfo)
        {
            if(this.listener != null && this.listener.onGlobalAdImpression != null && undefined != this.listener.onGlobalAdImpression)
            {
                this.listener.onGlobalAdImpression(adInfo);
            }
        }
     },
     setGlobalAdImpressionListener(listener)
     {
         this.TPGlobalAdImpressionListener.listener = listener;
         if (cc.sys.os === cc.sys.OS_IOS) {           
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "addGlobalAdImpressionDelegate");
        } 
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "addTPGlobalImpressionListener", "()V");

        }
     },
     //回调
     TradplusAdsListener:{
        listener : null,
        onInitFinish:function(success)
        {
            if(this.listener != null && this.listener.onInitFinish != null && undefined != this.listener.onInitFinish)
            {
                this.listener.onInitFinish(success);
            }
        },
        onCurrentAreaSuccess (isEu,isCn,isCa)
        {
            if(this.listener != null && this.listener.onCurrentAreaSuccess != null && undefined != this.listener.onCurrentAreaSuccess)
            {
                this.listener.onCurrentAreaSuccess(isEu,isCn,isCa);
            }
        },
        onCurrentAreaFailed(msg)
        {
            if(this.listener != null && this.listener.onCurrentAreaFailed != null && undefined != this.listener.onCurrentAreaFailed)
            {
                this.listener.onCurrentAreaFailed(msg);
            }
        },
    },
     setAdsListener(listener)
     {
         this.TradplusAdsListener.listener = listener;
     },
     //API
     //初始化
     initSDK(appid)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "initSDKWithAppId:", appid);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "initSDKWithAppId", "(Ljava/lang/String;)V", appid);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },

     setPlatformLimit(platformLimit)
     {
        var jsonStr = "";
        if(platformLimit != null && undefined != platformLimit
            && platformLimit.array != null && undefined != platformLimit.array)
        {
            jsonStr = JSON.stringify(platformLimit.array);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setPlatformLimit:", jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setPlatformLimit", "(Ljava/lang/String;)V", jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },

     setCustomTestID(customTestID)
     {
        console.log("setCustomTestID:"+customTestID);
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCustomTestID:", customTestID);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCustomTestID", "(Ljava/lang/String;)V", customTestID);

        }
        else{
            console.log("Only Android & iOS Support");
        }
     },

     setPAConsent(consent)
     {
        console.log("setPAConsent:"+consent);
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setPAConsent:", consent);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setPAConsent", "(I)V", consent);

        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //设置流量分组等自定数据，需要在初始化前设置
     setCustomMap(customMap)
     {
        var jsonStr = "";
        if(customMap != null && undefined != customMap)
        {
            jsonStr = JSON.stringify(customMap);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCustomMap:", jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCustomMap", "(Ljava/lang/String;)V", jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //设置Setting级别数据
     setSettingDataParam(settingDataParam)
     {
        var jsonStr = "";
        if(settingDataParam != null && undefined != settingDataParam)
        {
            jsonStr = JSON.stringify(settingDataParam);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setSettingDataParam:", jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setSettingDataParam", "(Ljava/lang/String;)V", jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //获取原生 TradplusSDK 版本号
     version()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "sdkVersion");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "sdkVersion", "()Ljava/lang/String;");
        }
        return "UNKNOWN";
     },
     //是否在欧盟地区 此接口需要在初始化成功后调用
     isEUTraffic()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isEUTraffic");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isEUTraffic", "()Z");
        }
        return false;
     },
     //是否在加州地区 此接口需要在初始化成功后调用
     isCalifornia()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isCalifornia");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isCalifornia", "()Z");
        }
        return false;
     },
     //设置 GDPR等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
     setGDPRDataCollection(canDataCollection)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setGDPRDataCollection:",canDataCollection);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setGDPRDataCollection", "(Z)V", canDataCollection);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //获取当前 GDPR等级：  0 允许上报 , 1 不允许上报, 2 未设置
     getGDPRDataCollection()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getGDPRDataCollection");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getGDPRDataCollection", "()I");
        }
        return 2;
     },
     //设置 CCPA等级 是否允许数据上报: ture 加州用户接受上报数据, false 加州用户均不上报数据
     setCCPADoNotSell(canDataCollection)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCCPADoNotSell:",canDataCollection);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCCPADoNotSell", "(Z)V", canDataCollection);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //获取当前 CCPA等级： 0 允许上报 , 1 不允许上报, 2 未设置
     getCCPADoNotSell()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getCCPADoNotSell");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getCCPADoNotSell", "()I");
        }
        return 2;
     },
     //设置 COPPA等级 是否允许数据上报: ture 表明儿童, false 表明不是儿童
     setCOPPAIsAgeRestrictedUser(isChild)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCOPPAIsAgeRestrictedUser:",isChild);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setCOPPAIsAgeRestrictedUser", "(Z)V",isChild);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //获取当前 COPPA等级： 0 表明儿童 , 1 表明不是儿童, 2 未设置
     getCOPPAIsAgeRestrictedUser()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getCOPPAIsAgeRestrictedUser");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getCOPPAIsAgeRestrictedUser", "()I");
        }
        return 2;
     },
     //设置 LGPD等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
     setLGPDConsent(consent)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setLGPDConsent:",consent);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setLGPDConsent", "(Z)V",consent);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //获取当前 LGPD等级： 0 允许上报 , 1 不允许上报 2 未设置
     getLGPDConsent()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getLGPDConsent");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "getLGPDConsent", "()I");
        }
        return 2;
     },
     //设置是否开启个性化推荐广告。 false 关闭 ，true 开启。SDK默认 true 开启
     setOpenPersonalizedAd(open)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setOpenPersonalizedAd:",open);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setOpenPersonalizedAd", "(Z)V", open);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     //当前的个性化状态  false 关闭 ，true 开启
     isOpenPersonalizedAd()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isOpenPersonalizedAd");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isOpenPersonalizedAd", "()Z");
        }
        return true;
     },
     //清理指定广告位下的广告缓存，一般使用场景：用于切换用户后清除激励视频的缓存广告
     clearCache(adUnitId)
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "clearCacheWithAdUnitId:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "clearCacheWithAdUnitId", "(Ljava/lang/String;)V", adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
    ///查询当前地区，此接口一般在初始化前调用来获取当前设备的地区状态。开发者可根据返回数据针对地区情况来设置各隐私权限。
    ///使用时需要设置回调 OnCurrentAreaSuccess & OnCurrentAreaFailed 来获取查询状态。
    ///OnCurrentAreaSuccess 返回的地区数据包括： bool isEu 是否欧洲, bool isCn 是否中国, bool isCa 是否加州
    ///OnCurrentAreaFailed 时开发者需要自行查询或处理，设置各隐私权限。
     checkCurrentArea()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "checkCurrentArea");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "checkCurrentArea", "()V");
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     ///打开测试工具 集成方法参考：
     ///iOS https://docs.tradplusad.com/docs/integration_ios/sdk_test_android/test_tool/
     ///android https://docs.tradplusad.com/docs/tradplussdk_android_doc_v6/sdk_test_android/test_tool
     openTradPlusTool()
     {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TradplusSdkManager", "openTradPlusTool");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "openTradPlusTool", "()V");
        }
        else{
            console.log("Only Android & iOS Support");
        }
     },
     /// 仅android支持的API

     //开启获取AuthId  false 关闭 ，true 开启
     setAuthUID(needUid)
     {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setAuthUID", "(Z)V", needUid);
        }
        else{
            console.log("Only Android Support");
        }
     },
     //选择是否开启自动加载重新load广告时，是否延迟2秒，bool isopen, 默认false 不使用延迟2s
     setOpenDelayLoadAds(isOpen)
     {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setOpenDelayLoadAds", "(Z)V", isOpen);
        }
        else{
            console.log("Only Android Support");
        }
     },
     //android 国内隐私权限 是否打开，其他平台返回 false
     isPrivacyUserAgree()
     {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TradplusSdkManager", "isPrivacyUserAgree", "()Z");
        }
        return false;
     },
     //android 设置国内隐私权限 false 关闭 ，true 开启
     setPrivacyUserAgree(open)
     {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setPrivacyUserAgree", "(Z)V", isOpen);
        }
        else{
            console.log("Only Android Support");
        }
     },
     //android 设置可使用数据库容量大小，到达数值后自动清空数据库，默认20MB
     setMaxDatabaseSize(size)
     {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TradplusSdkManager", "setMaxDatabaseSize", "(I)V",size);
        }
        else{
            console.log("Only Android Support");
        }
     },
     //全局展示回调
     globalAdImpression(info)
     {
        var obj = JSON.parse(info)
        this.TPGlobalAdImpressionListener.onGlobalAdImpression(obj.adInfo);
     },
     //初始化回调
     initFinish(info)
     {
        var obj = JSON.parse(info)
        this.TradplusAdsListener.onInitFinish(obj.success);
     },
     currentAreaSuccess(info)
     {
        var obj = JSON.parse(info)
        this.TradplusAdsListener.onCurrentAreaSuccess(obj.iseu,obj.iscn,obj.isca);
     },
     currentAreaFailed(info)
     {
        this.TradplusAdsListener.onCurrentAreaFailed("");
     }

};

window.TPPlatformLimit ={
    array :[],
    setLimit(platform,num)
    {

        if(undefined != platform && undefined != num)
        {
            var info = {};
            info["platform"] = platform;
            info["num"] = num;
            this.array.push(info);
        }
    },
    clear()
    {
        this.array = [];
    }
};

window.TTDUID2Manager ={
    getExtraJsonStr(extra) {
        var info = {};
        if (extra.subscriptionID != null && undefined != extra.subscriptionID) {
          info["subscriptionID"] = extra.subscriptionID;
        }

        if (extra.serverPublicKey != null && undefined != extra.serverPublicKey) {
          info["serverPublicKey"] = extra.serverPublicKey;
        }

        if (extra.email != null && undefined != extra.email) {
            info["email"] = extra.email;
        }

        if (extra.emailHash != null && undefined != extra.emailHash) {
            info["emailHash"] = extra.emailHash;
        }

        if (extra.phone != null && undefined != extra.phone) {
            info["phone"] = extra.phone;
        }

        if (extra.phoneHash != null && undefined != extra.phoneHash) {
            info["phoneHash"] = extra.phoneHash;
        }

        if (extra.appName != null && undefined != extra.appName) {
            info["appName"] = extra.appName;
        }

        if (undefined != extra.isTestMode) {
            info["isTestMode"] = extra.isTestMode;
        }

        if (extra.customURLString != null && undefined != extra.customURLString) {
            info["customURLString"] = extra.customURLString;
        }


        return JSON.stringify(info);
    },
    startUID2(extra)
    {
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TTDUID2Manager", "startUID2:",jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TTDUID2Manager", "startUID2", "(Ljava/lang/String;)V",jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    resetSetting()
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TTDUID2Manager", "resetSetting");
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TTDUID2Manager", "resetSetting", "()Z");
        }
        return true;
    },
    TTDUID2Listener : {
        listener : null,
        startFinish:function(error)
        {
            if(this.listener != null && this.listener.startFinish != null && undefined != this.listener.startFinish)
            {
                this.listener.startFinish(error);
            }
        }
    },
    setListener(listener)
    {
        this.TTDUID2Listener.listener = listener;
    },
    startFinish(info)
    {
        var obj = JSON.parse(info)
        this.TTDUID2Listener.startFinish(obj.adError);
    },
};
//插屏
window.TradPlusInterstitial = {
    setInterstitialListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPInterstitialListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPInterstitialListener.defaultListener = listener;
        }
    },
    //回调
    TPInterstitialListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onInterstitialLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialLoaded != null && undefined != listener.onInterstitialLoaded)
            {
                listener.onInterstitialLoaded(adUnitId,adInfo);
            }
        },
        onInterstitialLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialLoadFailed != null && undefined != listener.onInterstitialLoadFailed)
            {
                listener.onInterstitialLoadFailed(adUnitId,error);
            }
        },
        onInterstitialImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialImpression != null && undefined != listener.onInterstitialImpression)
            {
                listener.onInterstitialImpression(adUnitId,adInfo);
            }
        },
        onInterstitialShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialShowFailed != null && undefined != listener.onInterstitialShowFailed)
            {
                listener.onInterstitialShowFailed(adUnitId,adInfo,error);
            }
        },
        onInterstitialClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialClicked != null && undefined != listener.onInterstitialClicked)
            {
                listener.onInterstitialClicked(adUnitId,adInfo);
            }
        },
        onInterstitialClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialClosed != null && undefined != listener.onInterstitialClosed)
            {
                listener.onInterstitialClosed(adUnitId,adInfo);
            }
        },
        onInterstitialStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialStartLoad != null && undefined != listener.onInterstitialStartLoad)
            {
                listener.onInterstitialStartLoad(adUnitId,adInfo);
            }
        },
        onInterstitialBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialBiddingStart != null && undefined != listener.onInterstitialBiddingStart)
            {
                listener.onInterstitialBiddingStart(adUnitId,adInfo);
            }
        },
        onInterstitialBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialBiddingEnd != null && undefined != listener.onInterstitialBiddingEnd)
            {
                listener.onInterstitialBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onInterstitialIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialIsLoading != null && undefined != listener.onInterstitialIsLoading)
            {
                listener.onInterstitialIsLoading(adUnitId);
            }
        },
        onInterstitialOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialOneLayerStartLoad != null && undefined != listener.onInterstitialOneLayerStartLoad)
            {
                listener.onInterstitialOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onInterstitialOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialOneLayerLoaded != null && undefined != listener.onInterstitialOneLayerLoaded)
            {
                listener.onInterstitialOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onInterstitialOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialOneLayerLoadFailed != null && undefined != listener.onInterstitialOneLayerLoadFailed)
            {
                listener.onInterstitialOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onInterstitialVideoPlayStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialVideoPlayStart != null && undefined != listener.onInterstitialVideoPlayStart)
            {
                listener.onInterstitialVideoPlayStart(adUnitId,adInfo);
            }
        },
        onInterstitialVideoPlayEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialVideoPlayEnd != null && undefined != listener.onInterstitialVideoPlayEnd)
            {
                listener.onInterstitialVideoPlayEnd(adUnitId,adInfo);
            }
        },
        onInterstitialAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInterstitialAllLoaded != null && undefined != listener.onInterstitialAllLoaded)
            {
                listener.onInterstitialAllLoaded(adUnitId,isSuccess);
            }
        },
        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }

        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }

        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }

        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；extra：附加参数 TPInterstitialExtra
    loadInterstitialAd(adUnitId,extra)
    {

        console.log("loadInterstitialAd:"+adUnitId);
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "loadWithAdUnitID:extra:", adUnitId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showInterstitialAd(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "showWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //是否有ready广告 adUnitId：广告位ID
    interstitialAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCInterstitialManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCInterstitialManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryInterstitialAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCInterstitialManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialAllLoaded(obj.adUnitID,obj.success);
    },
    playStart(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialVideoPlayStart(obj.adUnitID,obj.adInfo);
    },
    playEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialVideoPlayEnd(obj.adUnitID,obj.adInfo);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPInterstitialListener.onInterstitialIsLoading(obj.adUnitID);
    },
};
//激励视频
window.TradPlusRewardVideo = {
    setRewardVideoListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPRewardVideoListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPRewardVideoListener.defaultListener = listener;
        }
    },
    //回调
    TPRewardVideoListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onRewardVideoLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoLoaded != null && undefined != listener.onRewardVideoLoaded)
            {
                listener.onRewardVideoLoaded(adUnitId,adInfo);
            }
        },
        onRewardVideoLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoLoadFailed != null && undefined != listener.onRewardVideoLoadFailed)
            {
                listener.onRewardVideoLoadFailed(adUnitId,error);
            }
        },
        onRewardVideoImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoImpression != null && undefined != listener.onRewardVideoImpression)
            {
                listener.onRewardVideoImpression(adUnitId,adInfo);
            }
        },
        onRewardVideoShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoShowFailed != null && undefined != listener.onRewardVideoShowFailed)
            {
                listener.onRewardVideoShowFailed(adUnitId,adInfo,error);
            }
        },
        onRewardVideoClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoClicked != null && undefined != listener.onRewardVideoClicked)
            {
                listener.onRewardVideoClicked(adUnitId,adInfo);
            }
        },
        onRewardVideoClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoClosed != null && undefined != listener.onRewardVideoClosed)
            {
                listener.onRewardVideoClosed(adUnitId,adInfo);
            }
        },
        onRewardVideoStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoStartLoad != null && undefined != listener.onRewardVideoStartLoad)
            {
                listener.onRewardVideoStartLoad(adUnitId,adInfo);
            }
        },
        onRewardVideoBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoBiddingStart != null && undefined != listener.onRewardVideoBiddingStart)
            {
                listener.onRewardVideoBiddingStart(adUnitId,adInfo);
            }
        },
        onRewardVideoBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoBiddingEnd != null && undefined != listener.onRewardVideoBiddingEnd)
            {
                listener.onRewardVideoBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onRewardVideoIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoIsLoading != null && undefined != listener.onRewardVideoIsLoading)
            {
                listener.onRewardVideoIsLoading(adUnitId);
            }
        },
        onRewardVideoOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoOneLayerStartLoad != null && undefined != listener.onRewardVideoOneLayerStartLoad)
            {
                listener.onRewardVideoOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onRewardVideoOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoOneLayerLoaded != null && undefined != listener.onRewardVideoOneLayerLoaded)
            {
                listener.onRewardVideoOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onRewardVideoOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoOneLayerLoadFailed != null && undefined != listener.onRewardVideoOneLayerLoadFailed)
            {
                listener.onRewardVideoOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onRewardVideoPlayStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoPlayStart != null && undefined != listener.onRewardVideoPlayStart)
            {
                listener.onRewardVideoPlayStart(adUnitId,adInfo);
            }
        },
        onRewardVideoPlayEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoPlayEnd != null && undefined != listener.onRewardVideoPlayEnd)
            {
                listener.onRewardVideoPlayEnd(adUnitId,adInfo);
            }
        },
        onRewardVideoAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoAllLoaded != null && undefined != listener.onRewardVideoAllLoaded)
            {
                listener.onRewardVideoAllLoaded(adUnitId,isSuccess);
            }
        },
        onRewardVideoRewarded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onRewardVideoRewarded != null && undefined != listener.onRewardVideoRewarded)
            {
                listener.onRewardVideoRewarded(adUnitId,adInfo);
            }
        },
        //playAgain
        onPlayAgainImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainImpression != null && undefined != listener.onPlayAgainImpression)
            {
                listener.onPlayAgainImpression(adUnitId,adInfo);
            }
        },
        onPlayAgainShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainShowFailed != null && undefined != listener.onPlayAgainShowFailed)
            {
                listener.onPlayAgainShowFailed(adUnitId,adInfo,error);
            }
        },
        onPlayAgainClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainClicked != null && undefined != listener.onPlayAgainClicked)
            {
                listener.onPlayAgainClicked(adUnitId,adInfo);
            }
        },
        onPlayAgainRewarded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainRewarded != null && undefined != listener.onPlayAgainRewarded)
            {
                listener.onPlayAgainRewarded(adUnitId,adInfo);
            }
        },
        onPlayAgainPlayStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainPlayStart != null && undefined != listener.onPlayAgainPlayStart)
            {
                listener.onPlayAgainPlayStart(adUnitId,adInfo);
            }
        },
        onPlayAgainPlayEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onPlayAgainPlayEnd != null && undefined != listener.onPlayAgainPlayEnd)
            {
                listener.onPlayAgainPlayEnd(adUnitId,adInfo);
            }
        },

        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }

        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }

        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }

        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }

        if (extra.userId != null && undefined != extra.userId) {
            info["userId"] = extra.userId;
        }

        if (extra.customData != null && undefined != extra.customData) {
            info["customData"] = extra.customData;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；extra：附加参数 TPRewardVideoExtra
    loadRewardVideoAd(adUnitId,extra)
    {
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "loadWithAdUnitID:extra:", adUnitId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showRewardVideoAd(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "showWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //是否有ready广告 adUnitId：广告位ID
    rewardVideoAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCRewardVideoManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCRewardVideoManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryRewardVideoAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCRewardVideoManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",jsonStr,adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoAllLoaded(obj.adUnitID,obj.success);
    },
    playStart(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoPlayStart(obj.adUnitID,obj.adInfo);
    },
    playEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoPlayEnd(obj.adUnitID,obj.adInfo);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoIsLoading(obj.adUnitID);
    },
    rewarded(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onRewardVideoRewarded(obj.adUnitID);
    },
    playAgainImpression(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainImpression(obj.adUnitID,obj.adInfo);
    },
    playAgainShowFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    playAgainClicked(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainClicked(obj.adUnitID,obj.adInfo);
    },
    playAgainRewarded(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainRewarded(obj.adUnitID);
    },
    playAgainPlayStart(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainPlayStart(obj.adUnitID,obj.adInfo);
    },
    playAgainPlayEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPRewardVideoListener.onPlayAgainPlayEnd(obj.adUnitID,obj.adInfo);
    }
};
//横幅
window.TradPlusBanner = {
    setBannerListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPBannerListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPBannerListener.defaultListener = listener;
        }
    },
    //回调
    TPBannerListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onBannerLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerLoaded != null && undefined != listener.onBannerLoaded)
            {
                listener.onBannerLoaded(adUnitId,adInfo);
            }
        },
        onBannerLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerLoadFailed != null && undefined != listener.onBannerLoadFailed)
            {
                listener.onBannerLoadFailed(adUnitId,error);
            }
        },
        onBannerImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerImpression != null && undefined != listener.onBannerImpression)
            {
                listener.onBannerImpression(adUnitId,adInfo);
            }
        },
        onBannerShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerShowFailed != null && undefined != listener.onBannerShowFailed)
            {
                listener.onBannerShowFailed(adUnitId,adInfo,error);
            }
        },
        onBannerClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerClicked != null && undefined != listener.onBannerClicked)
            {
                listener.onBannerClicked(adUnitId,adInfo);
            }
        },
        onBannerClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerClosed != null && undefined != listener.onBannerClosed)
            {
                listener.onBannerClosed(adUnitId,adInfo);
            }
        },
        onBannerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerStartLoad != null && undefined != listener.onBannerStartLoad)
            {
                listener.onBannerStartLoad(adUnitId,adInfo);
            }
        },
        onBannerBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerBiddingStart != null && undefined != listener.onBannerBiddingStart)
            {
                listener.onBannerBiddingStart(adUnitId,adInfo);
            }
        },
        onBannerBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerBiddingEnd != null && undefined != listener.onBannerBiddingEnd)
            {
                listener.onBannerBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onBannerIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerIsLoading != null && undefined != listener.onBannerIsLoading)
            {
                listener.onBannerIsLoading(adUnitId);
            }
        },
        onBannerOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerOneLayerStartLoad != null && undefined != listener.onBannerOneLayerStartLoad)
            {
                listener.onBannerOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onBannerOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerOneLayerLoaded != null && undefined != listener.onBannerOneLayerLoaded)
            {
                listener.onBannerOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onBannerOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerOneLayerLoadFailed != null && undefined != listener.onBannerOneLayerLoadFailed)
            {
                listener.onBannerOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onBannerAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onBannerAllLoaded != null && undefined != listener.onBannerAllLoaded)
            {
                listener.onBannerAllLoaded(adUnitId,isSuccess);
            }
        },
        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if(extra.className != null && undefined != extra.className)
        {
            info["className"] = extra.className;
        }
        if(extra.backgroundColor != null && undefined != extra.backgroundColor)
        {
            info["backgroundColor"] = extra.backgroundColor;
        }
        if(undefined != extra.x)
        {
            info["x"] = extra.x;
        }
        if(undefined != extra.y)
        {
            info["y"] = extra.y;
        }
        if(undefined != extra.height)
        {
            info["height"] = extra.height;
        }
        if(undefined != extra.width)
        {
            info["width"] = extra.width;
        }
        if(undefined != extra.adPosition)
        {
            info["adPosition"] = extra.adPosition;
        }
        if(undefined != extra.closeAutoShow)
        {
            info["closeAutoShow"] = extra.closeAutoShow;
        }
        if(undefined != extra.contentMode)
        {
            info["contentMode"] = extra.contentMode;
        }
        if(undefined != extra.closeAutoDestroy)
        {
            info["closeAutoDestroy"] = extra.closeAutoDestroy;
        }
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }
        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }
        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }
        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；sceneId：广告场景ID；extra：附加参数
    loadBannerAd(adUnitId,sceneId,extra)
    {
        var jsonStr = "";
        if (extra != null && undefined != extra) {
        jsonStr = this.getExtraJsonStr(extra);

        if (jsonStr == null && undefined == jsonStr) {
            jsonStr = "";
        }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "loadWithAdUnitID:sceneId:extra:", adUnitId,sceneId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    ///banner默认开启自动展示，一般不需要使用此接口。
    ///当TPBannerExtra 中的 closeAutoShow 设置为ture时关闭自动展示。
    ///开发者可以在加载成功回调后调用此接口进行banner展示。
    showBannerAd(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "showWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///是否有ready广告 adUnitId：广告位ID
    bannerAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCBannerManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCBannerManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryBannerAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //隐藏Banner
    hideBanner(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "hideWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "hideWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //显示已隐藏了的广告
    displayBanner(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "displayWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "displayWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //移除Banner
    destroyBanner(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "destroyWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "destroyWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCBannerManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCBannerManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",jsonStr,adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerAllLoaded(obj.adUnitID,obj.success);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPBannerListener.onBannerIsLoading(obj.adUnitID);
    },
};
//原生
window.TradPlusNative = {
    setNativeListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPNativeListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPNativeListener.defaultListener = listener;
        }
    },
    //回调
    TPNativeListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onNativeLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeLoaded != null && undefined != listener.onNativeLoaded)
            {
                listener.onNativeLoaded(adUnitId,adInfo);
            }
        },
        onNativeLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeLoadFailed != null && undefined != listener.onNativeLoadFailed)
            {
                listener.onNativeLoadFailed(adUnitId,error);
            }
        },
        onNativeImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeImpression != null && undefined != listener.onNativeImpression)
            {
                listener.onNativeImpression(adUnitId,adInfo);
            }
        },
        onNativeShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeShowFailed != null && undefined != listener.onNativeShowFailed)
            {
                listener.onNativeShowFailed(adUnitId,adInfo,error);
            }
        },
        onNativeClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeClicked != null && undefined != listener.onNativeClicked)
            {
                listener.onNativeClicked(adUnitId,adInfo);
            }
        },
        onNativeClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeClosed != null && undefined != listener.onNativeClosed)
            {
                listener.onNativeClosed(adUnitId,adInfo);
            }
        },
        onNativeStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeStartLoad != null && undefined != listener.onNativeStartLoad)
            {
                listener.onNativeStartLoad(adUnitId,adInfo);
            }
        },
        onNativeBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeBiddingStart != null && undefined != listener.onNativeBiddingStart)
            {
                listener.onNativeBiddingStart(adUnitId,adInfo);
            }
        },
        onNativeBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeBiddingEnd != null && undefined != listener.onNativeBiddingEnd)
            {
                listener.onNativeBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onNativeIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeIsLoading != null && undefined != listener.onNativeIsLoading)
            {
                listener.onNativeIsLoading(adUnitId);
            }
        },
        onNativeOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeOneLayerStartLoad != null && undefined != listener.onNativeOneLayerStartLoad)
            {
                listener.onNativeOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onNativeOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeOneLayerLoaded != null && undefined != listener.onNativeOneLayerLoaded)
            {
                listener.onNativeOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onNativeOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeOneLayerLoadFailed != null && undefined != listener.onNativeOneLayerLoadFailed)
            {
                listener.onNativeOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onNativeAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeAllLoaded != null && undefined != listener.onNativeAllLoaded)
            {
                listener.onNativeAllLoaded(adUnitId,isSuccess);
            }
        },
        onNativeVideoPlayStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeVideoPlayStart != null && undefined != listener.onNativeVideoPlayStart)
            {
                listener.onNativeVideoPlayStart(adUnitId,adInfo);
            }
        },
        onNativeVideoPlayEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onNativeVideoPlayEnd != null && undefined != listener.onNativeVideoPlayEnd)
            {
                listener.onNativeVideoPlayEnd(adUnitId,adInfo);
            }
        },
        onZoomOutStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onZoomOutStart != null && undefined != listener.onZoomOutStart)
            {
                listener.onZoomOutStart(adUnitId,adInfo);
            }
        },
        onZoomOutEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onZoomOutEnd != null && undefined != listener.onZoomOutEnd)
            {
                listener.onZoomOutEnd(adUnitId,adInfo);
            }
        },
        onSkip(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSkip != null && undefined != listener.onSkip)
            {
                listener.onSkip(adUnitId,adInfo);
            }
        },
        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if(undefined != extra.x)
        {
            info["x"] = extra.x;
        }
        if(undefined != extra.y)
        {
            info["y"] = extra.y;
        }
        if(undefined != extra.height)
        {
            info["height"] = extra.height;
        }
        if(undefined != extra.width)
        {
            info["width"] = extra.width;
        }
        if(undefined != extra.adPosition)
        {
            info["adPosition"] = extra.adPosition;
        }
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }
        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }
        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }
        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；extra：附加参数 TPNativeExtra
    loadNativeAd(adUnitId,extra)
    {
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "loadWithAdUnitID:extra:", adUnitId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID className：自定义模版名称 设置null时会使用默认
    showNativeAd(adUnitId,sceneId,className)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "showWithAdUnitID:sceneId:className:", adUnitId,sceneId,className);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId,className);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //是否有ready广告 adUnitId：广告位ID
    nativeAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCNativeManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCNativeManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryNativeAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",jsonStr,adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //隐藏Native
    hideNative(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "hideWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "hideWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //显示已隐藏了的广告
    displayNative(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "displayWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "displayWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //移除Banner
    destroyNative(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCNativeManager", "destroyWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCNativeManager", "destroyWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeAllLoaded(obj.adUnitID,obj.success);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeIsLoading(obj.adUnitID);
    },
    playStart(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeVideoPlayStart(obj.adUnitID,obj.adInfo);
    },
    playEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPNativeListener.onNativeVideoPlayEnd(obj.adUnitID,obj.adInfo);
    },
};
//开屏
window.TradPlusSplash = {
    setSplashListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPSplashListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPSplashListener.defaultListener = listener;
        }
    },
    //回调
    TPSplashListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onSplashLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashLoaded != null && undefined != listener.onSplashLoaded)
            {
                listener.onSplashLoaded(adUnitId,adInfo);
            }
        },
        onSplashLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashLoadFailed != null && undefined != listener.onSplashLoadFailed)
            {
                listener.onSplashLoadFailed(adUnitId,error);
            }
        },
        onSplashImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashImpression != null && undefined != listener.onSplashImpression)
            {
                listener.onSplashImpression(adUnitId,adInfo);
            }
        },
        onSplashShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashShowFailed != null && undefined != listener.onSplashShowFailed)
            {
                listener.onSplashShowFailed(adUnitId,adInfo,error);
            }
        },
        onSplashClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashClicked != null && undefined != listener.onSplashClicked)
            {
                listener.onSplashClicked(adUnitId,adInfo);
            }
        },
        onSplashClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashClosed != null && undefined != listener.onSplashClosed)
            {
                listener.onSplashClosed(adUnitId,adInfo);
            }
        },
        onSplashStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashStartLoad != null && undefined != listener.onSplashStartLoad)
            {
                listener.onSplashStartLoad(adUnitId,adInfo);
            }
        },
        onSplashBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashBiddingStart != null && undefined != listener.onSplashBiddingStart)
            {
                listener.onSplashBiddingStart(adUnitId,adInfo);
            }
        },
        onSplashBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashBiddingEnd != null && undefined != listener.onSplashBiddingEnd)
            {
                listener.onSplashBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onSplashIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashIsLoading != null && undefined != listener.onSplashIsLoading)
            {
                listener.onSplashIsLoading(adUnitId);
            }
        },
        onSplashOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashOneLayerStartLoad != null && undefined != listener.onSplashOneLayerStartLoad)
            {
                listener.onSplashOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onSplashOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashOneLayerLoaded != null && undefined != listener.onSplashOneLayerLoaded)
            {
                listener.onSplashOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onSplashOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashOneLayerLoadFailed != null && undefined != listener.onSplashOneLayerLoadFailed)
            {
                listener.onSplashOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onSplashAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSplashAllLoaded != null && undefined != listener.onSplashAllLoaded)
            {
                listener.onSplashAllLoaded(adUnitId,isSuccess);
            }
        },
        onZoomOutStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onZoomOutStart != null && undefined != listener.onZoomOutStart)
            {
                listener.onZoomOutStart(adUnitId,adInfo);
            }
        },
        onZoomOutEnd(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onZoomOutEnd != null && undefined != listener.onZoomOutEnd)
            {
                listener.onZoomOutEnd(adUnitId,adInfo);
            }
        },
        onSkip(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSkip != null && undefined != listener.onSkip)
            {
                listener.onSkip(adUnitId,adInfo);
            }
        },
        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }

        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }

        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }

        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；extra：附加参数 TPSplashExtra
    loadSplashAd(adUnitId,extra)
    {
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCSplashManager", "loadWithAdUnitID:extra:", adUnitId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCSplashManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showSplashAd(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCSplashManager", "showWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCSplashManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //是否有ready广告 adUnitId：广告位ID
    splashAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCSplashManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCSplashManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entrySplashAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCSplashManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCSplashManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCSplashManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCSplashManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",jsonStr,adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashAllLoaded(obj.adUnitID,obj.success);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPSplashListener.onSplashIsLoading(obj.adUnitID);
    },
};
//积分墙
window.TradPlusOfferwall = {
    setOfferwallListener(listener,adUnitId)
    {
        if(undefined != adUnitId && adUnitId != null)
        {
            this.TPOfferwallListener.listenerMap[adUnitId] = listener;
        }
        else
        {
            this.TPOfferwallListener.defaultListener = listener;
        }
    },
    //回调
    TPOfferwallListener:{
        defaultListener : null,
        listenerMap:{},
        getListener:function(adUnitId)
        {
            if(adUnitId in this.listenerMap)
            {
                return this.listenerMap[adUnitId];
            }
            return this.defaultListener;
        },
        onOfferwallLoaded:function(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallLoaded != null && undefined != listener.onOfferwallLoaded)
            {
                listener.onOfferwallLoaded(adUnitId,adInfo);
            }
        },
        onOfferwallLoadFailed(adUnitId,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallLoadFailed != null && undefined != listener.onOfferwallLoadFailed)
            {
                listener.onOfferwallLoadFailed(adUnitId,error);
            }
        },
        onOfferwallImpression(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallImpression != null && undefined != listener.onOfferwallImpression)
            {
                listener.onOfferwallImpression(adUnitId,adInfo);
            }
        },
        onOfferwallShowFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallShowFailed != null && undefined != listener.onOfferwallShowFailed)
            {
                listener.onOfferwallShowFailed(adUnitId,adInfo,error);
            }
        },
        onOfferwallClicked(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallClicked != null && undefined != listener.onOfferwallClicked)
            {
                listener.onOfferwallClicked(adUnitId,adInfo);
            }
        },
        onOfferwallClosed(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallClosed != null && undefined != listener.onOfferwallClosed)
            {
                listener.onOfferwallClosed(adUnitId,adInfo);
            }
        },
        onOfferwallStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallStartLoad != null && undefined != listener.onOfferwallStartLoad)
            {
                listener.onOfferwallStartLoad(adUnitId,adInfo);
            }
        },
        onOfferwallBiddingStart(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallBiddingStart != null && undefined != listener.onOfferwallBiddingStart)
            {
                listener.onOfferwallBiddingStart(adUnitId,adInfo);
            }
        },
        onOfferwallBiddingEnd(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallBiddingEnd != null && undefined != listener.onOfferwallBiddingEnd)
            {
                listener.onOfferwallBiddingEnd(adUnitId,adInfo,error);
            }
        },
        onOfferwallIsLoading(adUnitId)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallIsLoading != null && undefined != listener.onOfferwallIsLoading)
            {
                listener.onOfferwallIsLoading(adUnitId);
            }
        },
        onOfferwallOneLayerStartLoad(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallOneLayerStartLoad != null && undefined != listener.onOfferwallOneLayerStartLoad)
            {
                listener.onOfferwallOneLayerStartLoad(adUnitId,adInfo);
            }
        },
        onOfferwallOneLayerLoaded(adUnitId,adInfo)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallOneLayerLoaded != null && undefined != listener.onOfferwallOneLayerLoaded)
            {
                listener.onOfferwallOneLayerLoaded(adUnitId,adInfo);
            }
        },
        onOfferwallOneLayerLoadFailed(adUnitId,adInfo,error)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallOneLayerLoadFailed != null && undefined != listener.onOfferwallOneLayerLoadFailed)
            {
                listener.onOfferwallOneLayerLoadFailed(adUnitId,adInfo,error);
            }
        },
        onOfferwallAllLoaded(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onOfferwallAllLoaded != null && undefined != listener.onOfferwallAllLoaded)
            {
                listener.onOfferwallAllLoaded(adUnitId,isSuccess);
            }
        },
        setUserIdFinish(adUnitId,isSuccess)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.setUserIdFinish != null && undefined != listener.setUserIdFinish)
            {
                listener.setUserIdFinish(adUnitId,isSuccess);
            }
        },
        onCurrencyBalanceSuccess(adUnitId,amount,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onCurrencyBalanceSuccess != null && undefined != listener.onCurrencyBalanceSuccess)
            {
                listener.onCurrencyBalanceSuccess(adUnitId,amount,msg);
            }
        },
        onCurrencyBalanceFailed(adUnitId,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onCurrencyBalanceFailed != null && undefined != listener.onCurrencyBalanceFailed)
            {
                listener.onCurrencyBalanceFailed(adUnitId,msg);
            }
        },
        onSpendCurrencySuccess(adUnitId,amount,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSpendCurrencySuccess != null && undefined != listener.onSpendCurrencySuccess)
            {
                listener.onSpendCurrencySuccess(adUnitId,amount,msg);
            }
        },
        onSpendCurrencyFailed(adUnitId,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onSpendCurrencyFailed != null && undefined != listener.onSpendCurrencyFailed)
            {
                listener.onSpendCurrencyFailed(adUnitId,msg);
            }
        },
        onAwardCurrencySuccess(adUnitId,amount,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onAwardCurrencySuccess != null && undefined != listener.onAwardCurrencySuccess)
            {
                listener.onAwardCurrencySuccess(adUnitId,amount,msg);
            }
        },
        onAwardCurrencyFailed(adUnitId,msg)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onAwardCurrencyFailed != null && undefined != listener.onAwardCurrencyFailed)
            {
                listener.onAwardCurrencyFailed(adUnitId,msg);
            }
        },

        //以下仅ANDROID支持
        onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadStart != null && undefined != listener.onDownloadStart)
            {
                listener.onDownloadStart(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadUpdate != null && undefined != listener.onDownloadUpdate)
            {
                listener.onDownloadUpdate(adUnitId, adInfo, totalBytes, currBytes, fileName, appName, progress);
            }
        },
        onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadPause != null && undefined != listener.onDownloadPause)
            {
                listener.onDownloadPause(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFinish != null && undefined != listener.onDownloadFinish)
            {
                listener.onDownloadFinish(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onDownloadFailed != null && undefined != listener.onDownloadFailed)
            {
                listener.onDownloadFailed(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        },
        onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName)
        {
            listener = this.getListener(adUnitId);
            if(listener != null && listener.onInstalled != null && undefined != listener.onInstalled)
            {
                listener.onInstalled(adUnitId, adInfo, totalBytes, currBytes, fileName, appName);
            }
        }
    },
    getExtraJsonStr(extra) {
        var info = {};
        if (extra.customMap != null && undefined != extra.customMap) {
          info["customMap"] = extra.customMap;
        }

        if (extra.localParams != null && undefined != extra.localParams) {
          info["localParams"] = extra.customMap;
        }

        if (undefined != extra.openAutoLoadCallback) {
          info["openAutoLoadCallback"] = extra.openAutoLoadCallback;
        }

        if (undefined != extra.maxWaitTime) {
          info["maxWaitTime"] = extra.maxWaitTime;
        }
        return JSON.stringify(info);
    },
    //加载广告 adUnitId：广告位ID；extra：附加参数 TPOfferwallExtra
    loadOfferwallAd(adUnitId,extra)
    {
        var jsonStr = "";
        if(extra != null && undefined != extra)
        {
            jsonStr = this.getExtraJsonStr(extra);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "loadWithAdUnitID:extra:", adUnitId,jsonStr);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "loadWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showOfferwallAd(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "showWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "showWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,jsonStr);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //是否有ready广告 adUnitId：广告位ID
    offerwallAdReady(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            return jsb.reflection.callStaticMethod("TPCOfferwallManager", "adReadyWithAdUnitID:",adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            return jsb.reflection.callStaticMethod("TPCOfferwallManager", "adReadyWithAdUnitID", "(Ljava/lang/String;)Z",adUnitId);
        }
        return false;
    },
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryOfferwallAdScenario(adUnitId,sceneId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "entryAdScenarioWithAdUnitID:sceneId:", adUnitId,sceneId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "entryAdScenarioWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,sceneId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //开发者可在展示前通过此接口设置透传的adInfo信息。
    //透传信息可以在广告展示后的相关回调的adInfo中获取。
    setCustomAdInfo(adUnitId,customAdInfo)
    {
        var jsonStr = "";
        if(customAdInfo != null && undefined != customAdInfo)
        {
            jsonStr = JSON.stringify(customAdInfo);
            if(jsonStr == null && undefined == jsonStr)
            {
                jsonStr = "";
            }
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "setCustomAdInfo:adUnitID:", jsonStr,adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "setCustomAdInfo", "(Ljava/lang/String;Ljava/lang/String;)V",jsonStr,adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///设置积分墙用户ID adUnitId：广告位ID；userId：用户ID
    ///需要设置回调 OnOfferwallSetUserIdFinish 来获取设置结果
    setUserId(adUnitId,userId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "setUserIdWithAdUnitID:userId:", adUnitId,userId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "setUserIdWithAdUnitID", "(Ljava/lang/String;Ljava/lang/String;)V",adUnitId,userId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///查询当前用户积分墙积分 adUnitId：广告位ID
    ///需要设置回调 OnCurrencyBalanceSuccess & OnCurrencyBalanceFailed 来获取查询结果
    getCurrencyBalance(adUnitId)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "getCurrencyBalanceWithAdUnitID:", adUnitId);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "getCurrencyBalanceWithAdUnitID", "(Ljava/lang/String;)V",adUnitId);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///扣除用户积分墙积分 adUnitId：广告位ID；count：积分数量
    ///需要设置回调 OnSpendCurrencySuccess & OnSpendCurrencyFailed 来获取扣除是否成功及扣除后的积分数量
    spendBalance(adUnitId,count)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "spendBalanceWithAdUnitID:count:", adUnitId,count);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "spendBalanceWithAdUnitID", "(Ljava/lang/String;I)V",adUnitId,count);
        }
        else{
            console.log("Only Android & iOS Support");
        }
    },
    ///增加用户积分墙积分 adUnitId：广告位ID；count：积分数量
    ///需要设置回调 OnAwardCurrencySuccess & OnAwardCurrencyFailed 来获取添加是否成功及扣除后的积分数量
    awardBalance(adUnitId,count)
    {
        if (cc.sys.os === cc.sys.OS_IOS) {
            //iOS
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "awardBalanceWithAdUnitID:count:", adUnitId,count);
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            //ANDROID
            jsb.reflection.callStaticMethod("TPCOfferwallManager", "awardBalanceWithAdUnitID", "(Ljava/lang/String;I)V",adUnitId,count);
        } 
        else{
            console.log("Only Android & iOS Support");
        }
    },
    //Callback 回调
    loaded(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallLoaded(obj.adUnitID,obj.adInfo);
    },
    loadFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallLoadFailed(obj.adUnitID,obj.adError);
    },
    impression(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallImpression(obj.adUnitID,obj.adInfo);
    },
    showFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallShowFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    clicked(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallClicked(obj.adUnitID,obj.adInfo);
    },
    closed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallClosed(obj.adUnitID,obj.adInfo);
    },
    startLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallStartLoad(obj.adUnitID,obj.adInfo);
    },
    oneLayerStartLoad(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallOneLayerStartLoad(obj.adUnitID,obj.adInfo);
    },
    bidStart(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallBiddingStart(obj.adUnitID,obj.adInfo);
    },
    bidEnd(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallBiddingEnd(obj.adUnitID,obj.adInfo,obj.adError);
    },
    oneLayerLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallOneLayerLoaded(obj.adUnitID,obj.adInfo);
    },
    oneLayerLoadedFail(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallOneLayerLoadFailed(obj.adUnitID,obj.adInfo,obj.adError);
    },
    allLoaded(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallAllLoaded(obj.adUnitID,obj.success);
    },
    isLoading(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onOfferwallIsLoading(obj.adUnitID);
    },
    setUserIdFinish(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.setUserIdFinish(obj.adUnitID,obj.success);
    },
    currencyBalanceSuccess(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onCurrencyBalanceSuccess(obj.adUnitID,obj.amount,obj.msg);
    },
    currencyBalanceFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onCurrencyBalanceFailed(obj.adUnitID,obj.msg);
    },
    spendCurrencySuccess(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onSpendCurrencySuccess(obj.adUnitID,obj.amount,obj.msg);
    },
    spendCurrencyFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onSpendCurrencyFailed(obj.adUnitID,obj.msg);
    },
    awardCurrencySuccess(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onAwardCurrencySuccess(obj.adUnitID,obj.amount,obj.msg);
    },
    awardCurrencyFailed(info)
    {
        var obj = JSON.parse(info)
        this.TPOfferwallListener.onAwardCurrencyFailed(obj.adUnitID,obj.msg);
    }
}