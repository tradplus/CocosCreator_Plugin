declare const TradPlusInterstitial: TPInterstitial;
declare const TradPlusRewardVideo: TPRewardVideo;
declare const TradPlusSplash: TPSplash;
declare const TradPlusBanner: TPBanner;
declare const TradPlusOfferwall: TPOfferwall;
declare const TradPlusNative: TPNative;
declare const TradPlusAds: TPAds;
declare const TTDUID2Manager: UID2Manager;
declare const TPPlatformLimit: PlatformLimit;
declare const TPPAGPAConsentType: PAGPAConsentType;
declare const TPPlatformID: PlatformID;
declare const TPAdPosition : AdPosition;

//初始化，隐私政策等

declare interface TPGlobalAdImpressionListener
{
    onGlobalAdImpression?:(adInfo:Record<string,any>) => any;
}

declare interface TradplusAdsListener
{
    onInitFinish?:(success:boolean) => any;

    onCurrentAreaSuccess?:(isEu:boolean,isCn:boolean,isCa:boolean) => any;

    onCurrentAreaFailed?:(msg:string) => any;
}

declare class PAGPAConsentType
{
    NoConsent:number;
    Consent:number;
}

declare class PlatformID
{
    Meta:number;
    Admob:number;
    AdColony:number;
    UnityAds:number;
    Tapjoy:number;
    Liftoff:number;
    AppLovin:number;
    IronSource:number;
    Chartboost:number;
    TencentAds:number;
    CSJ:number;
    Mintegral:number;
    Pangle:number;
    KuaishouAds:number;
    Sigmob:number;
    Inmobi:number;
    Fyber:number;
    YouDao:number;
    CrossPromotion:number;
    StartIO:number;
    Helium:number;
    Maio:number;
    Criteo:number;
    MyTarget:number;
    Ogury:number;
    AppNext:number;
    Kidoz:number;
    Smaato:number;
    ADX:number;
    HuaWei:number;
    Baidu:number;
    Klevin:number;
    A4G:number;
    Mimo:number;
    SuperAwesome:number;
    GoogleAdManager:number;
    Yandex:number;
    Verve:number;
    ZMaticoo:number;
    ReklamUp:number;
    Bigo:number;
    Beizi:number;
    TapTap:number;
    ONEMOB:number;
    PremiumAds:number;
    GreedyGame:number;
    AlgoriX:number;
    BeesAds:number;
    Amazon:number;
    MangoX:number;
    Sailoff:number;
    TanX:number;
    TaurusX:number;
    KwaiAds:number;
    Columbus:number;
    YSO:number;
    VivoAds:number;
    OppoAds:number;
    HONOR:number;
}

declare class PlatformLimit
{
    //设置规则
    setLimit(platform:number,num:number):void;
    //重置规则
    clear():void;
}

declare class TPAds
{
    //版本号
    PluginVersion:string;
    //设置全局展示回调监听
    setGlobalAdImpressionListener(listener:TPGlobalAdImpressionListener):void;
    //设置回调（初始化）
    setAdsListener(listener:TradplusAdsListener):void;
    //设置流量分组等自定数据，需要在初始化前设置
    setCustomMap(customMap:Record<string,any>):void;
    //设置Setting级别数据
    setSettingDataParam(settingDataParam:Record<string,any>):void;
    //获取原生 TradplusSDK 版本号
    version():string;
    //是否在欧盟地区 此接口需要在初始化成功后调用
    isEUTraffic():boolean;
    //是否在加州地区 此接口需要在初始化成功后调用
    isCalifornia():boolean;
    //设置 GDPR等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
    setGDPRDataCollection(canDataCollection:boolean):void;
    //获取当前 GDPR等级：  0 允许上报 , 1 不允许上报, 2 未设置
    getGDPRDataCollection():number;
     //设置 CCPA等级 是否允许数据上报: ture 加州用户接受上报数据, false 加州用户均不上报数据
    setCCPADoNotSell(canDataCollection:boolean):void;
    //获取当前 CCPA等级： 0 允许上报 , 1 不允许上报, 2 未设置
    getCCPADoNotSell():number;
     //设置 COPPA等级 是否允许数据上报: ture 表明儿童, false 表明不是儿童
    setCOPPAIsAgeRestrictedUser(isChild:boolean):void;
    //获取当前 COPPA等级： 0 表明儿童 , 1 表明不是儿童, 2 未设置
    getCOPPAIsAgeRestrictedUser():number;
    //设置 LGPD等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
    setLGPDConsent(consent:boolean):void;
    //获取当前 LGPD等级： 0 允许上报 , 1 不允许上报 2 未设置
    getLGPDConsent():number;
    //设置是否开启个性化推荐广告。 false 关闭 ，true 开启。SDK默认 true 开启
    setOpenPersonalizedAd(open:boolean):void;
    //当前的个性化状态  false 关闭 ，true 开启
    isOpenPersonalizedAd():boolean;
    //清理指定广告位下的广告缓存，一般使用场景：用于切换用户后清除激励视频的缓存广告
    clearCache(adUnitId:string):void;
    ///查询当前地区，此接口一般在初始化前调用来获取当前设备的地区状态。开发者可根据返回数据针对地区情况来设置各隐私权限。
    ///使用时需要设置回调 OnCurrentAreaSuccess & OnCurrentAreaFailed 来获取查询状态。
    ///OnCurrentAreaSuccess 返回的地区数据包括： bool isEu 是否欧洲, bool isCn 是否中国, bool isCa 是否加州
    ///OnCurrentAreaFailed 时开发者需要自行查询或处理，设置各隐私权限。
    checkCurrentArea():void;
    ///打开测试工具 集成方法参考：
     ///iOS https://docs.tradplusad.com/docs/integration_ios/sdk_test_android/test_tool/
     ///android https://docs.tradplusad.com/docs/tradplussdk_android_doc_v6/sdk_test_android/test_tool
    openTradPlusTool():void;
    //设置Pangel是否填充广告
    setPAConsent(consentType:number):void;
    //设置自定义测试ID
    setCustomTestID(customTestID:string):void;
    //设置自定义频限
    setPlatformLimit(platformLimit:PlatformLimit):void;
    //初始化
    initSDK(appid:string):void;

}

declare interface TTDUID2Listener
{
    startFinish?:(error?:Record<string,string>) => any;
}

declare class TTDUID2Extra
{
    subscriptionID:string;//必填
    serverPublicKey:string;//必填
    //email,emailHash,phone,phoneHash需至少设置一个
    email?:string;
    emailHash?:string;
    phone?:string;
    phoneHash?:string;
    appName?:string;//选填
    //测试相关参数
    isTestMode?:boolean;
    customURLString?:string;
}

declare class UID2Manager {
    //启动UID2
    startUID2(extra:TTDUID2Extra):void;
    //清理UID2设置
    resetSetting():void;
    //设置监听回调
    setListener(listener:TTDUID2Listener):void;
}



declare class AdPosition
{
    TopLeft:number;
    TopCenter:number;
    TopRight:number;
    Centered:number;
    BottomLeft:number;
    BottomCenter:number;
    BottomRight:number;
}

//插屏

declare interface TPInterstitialListener
{
    onInterstitialLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onInterstitialImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onInterstitialShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onInterstitialClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onInterstitialBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onInterstitialIsLoading?:(adUnitId:string) => any;

    onInterstitialOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;

    onInterstitialVideoPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onInterstitialVideoPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    onInterstitialAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPInterstitialExtra
{
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
}

declare class TPInterstitial {
    //加载广告 adUnitId：广告位ID；extra：附加参数
    loadInterstitialAd(adUnitId:string,extra:TPInterstitialExtra): void;
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showInterstitialAd(adUnitId:string,sceneId:string):void;
    //是否有ready广告 adUnitId：广告位ID
    interstitialAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryInterstitialAdScenario(adUnitId:string,sceneId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    //设置监听回调
    setInterstitialListener(listener:TPInterstitialListener,adUnitId?:string):void;
}

//激励视频
declare interface TPRewardVideoListener
{
    onRewardVideoLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onRewardVideoImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onRewardVideoShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onRewardVideoClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onRewardVideoBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onRewardVideoIsLoading?:(adUnitId:string) => any;

    onRewardVideoOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;

    onRewardVideoPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onRewardVideoPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    onRewardVideoAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;

    onRewardVideoRewarded?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    //PlayAgain
    onPlayAgainImpression?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onPlayAgainShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onPlayAgainClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onPlayAgainRewarded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onPlayAgainPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onPlayAgainPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPRewardVideoExtra
{
    userId?:string;
    customData?:string;
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
}

declare class TPRewardVideo {
    //加载广告 adUnitId：广告位ID；extra：附加参数
    loadRewardVideoAd(adUnitId:string,extra:TPRewardVideoExtra): void;
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showRewardVideoAd(adUnitId:string,sceneId:string):void;
    //是否有ready广告 adUnitId：广告位ID
    rewardVideoAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryRewardVideoAdScenario(adUnitId:string,sceneId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    //设置监听回调
    setRewardVideoListener(listener:TPRewardVideoListener,adUnitId?:string):void;
}

//banner
declare interface TPBannerListener
{
    onBannerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onBannerImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onBannerShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onBannerClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onBannerBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onBannerIsLoading?:(adUnitId:string) => any;

    onBannerOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onBannerOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
       
    onBannerAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPBannerExtra
{
    className?:string;//自定义模版名称
    x?:number;//横幅广告展示坐标 x
    y?:number;//横幅广告展示坐标 y
    height?:number;//高度
    width?:number;//宽度
    adPosition?:number;
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    closeAutoShow?:boolean;//是否关闭自动展示
    backgroundColor?:string;//自定义背景色 例如：#FFFFFF
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
    //仅iOS支持 居中模式
    // 0 = 顶部水平居中；1 = 垂直居中并水平居中； 2 = 底边水平居中；默认 = 0
    contentMode?:number;
    //仅安卓
    closeAutoDestroy?:boolean;
}

declare class TPBanner 
{
    //加载广告 adUnitId：广告位ID；sceneId：广告场景ID；extra：附加参数
    loadBannerAd(adUnitId:string,sceneId:string,extra:TPBannerExtra): void;
     ///展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    ///banner默认开启自动展示，一般不需要使用此接口。
    ///当TPBannerExtra 中的 closeAutoShow 设置为ture时关闭自动展示。
    ///开发者可以在加载成功回调后调用此接口进行banner展示。
    showBannerAd(adUnitId:string,sceneId:string):void;
    //是否有ready广告 adUnitId：广告位ID
    bannerAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryBannerAdScenario(adUnitId:string,sceneId:string):void;
     //隐藏Banner
     hideBanner(adUnitId:string):void;
     //显示已隐藏了的广告
    displayBanner(adUnitId:string):void;
    //移除Banner
    destroyBanner(adUnitId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    //设置监听回调
    setBannerListener(listener:TPBannerListener,adUnitId?:string):void;
}

//开屏
declare interface TPSplashListener
{
    onSplashLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onSplashImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onSplashShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onSplashClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onSplashBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onSplashIsLoading?:(adUnitId:string) => any;

    onSplashOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;

    onSplashVideoPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onSplashVideoPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    onSplashAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;

    onZoomOutStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onZoomOutEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onSkip?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPSplashExtra
{
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
}

declare class TPSplash {
    //加载广告 adUnitId：广告位ID；extra：附加参数
    loadSplashAd(adUnitId:string,extra:TPSplashExtra): void;
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showSplashAd(adUnitId:string,sceneId:string):void;
    //是否有ready广告 adUnitId：广告位ID
    splashAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entrySplashAdScenario(adUnitId:string,sceneId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    //设置监听回调
    setSplashListener(listener:TPSplashListener,adUnitId?:string):void;
}

//积分墙
declare interface TPOfferwallListener
{
    onOfferwallLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onOfferwallImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onOfferwallShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onOfferwallClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onOfferwallBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onOfferwallIsLoading?:(adUnitId:string) => any;

    onOfferwallOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;

    onOfferwallVideoPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onOfferwallVideoPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    onOfferwallAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;

    setUserIdFinish?:(adUnitId:string,isSuccess:boolean) => any;

    onCurrencyBalanceSuccess?:(adUnitId:string,amount:number,msg:string) => any;

    onCurrencyBalanceFailed?:(adUnitId:string,msg:string) => any;

    onSpendCurrencySuccess?:(adUnitId:string,amount:number,msg:string) => any;

    onSpendCurrencyFailed?:(adUnitId:string,msg:string) => any;

    onAwardCurrencySuccess?:(adUnitId:string,amount:number,msg:string) => any;

    onAwardCurrencyFailed?:(adUnitId:string,msg:string) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPOfferwallExtra
{
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
}

declare class TPOfferwall {
    //加载广告 adUnitId：广告位ID；extra：附加参数
    loadOfferwallAd(adUnitId:string,extra:TPOfferwallExtra): void;
    //展示广告 adUnitId：广告位ID；sceneId：广告场景ID
    showOfferwallAd(adUnitId:string,sceneId:string):void;
    //是否有ready广告 adUnitId：广告位ID
    offerwallAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryOfferwallAdScenario(adUnitId:string,sceneId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    ///设置积分墙用户ID adUnitId：广告位ID；userId：用户ID
    ///需要设置回调 OnOfferwallSetUserIdFinish 来获取设置结果
    setUserId(adUnitId:string,userId:string):void;
    ///查询当前用户积分墙积分 adUnitId：广告位ID
    ///需要设置回调 OnCurrencyBalanceSuccess & OnCurrencyBalanceFailed 来获取查询结果
    getCurrencyBalance(adUnitId:string):void;
    ///扣除用户积分墙积分 adUnitId：广告位ID；count：积分数量
    ///需要设置回调 OnSpendCurrencySuccess & OnSpendCurrencyFailed 来获取扣除是否成功及扣除后的积分数量
    spendBalance(adUnitId:string,count:number):void;
    ///增加用户积分墙积分 adUnitId：广告位ID；count：积分数量
    ///需要设置回调 OnAwardCurrencySuccess & OnAwardCurrencyFailed 来获取添加是否成功及扣除后的积分数量
    awardBalance(adUnitId:string,count:number):void;
    //设置监听回调
    setOfferwallListener(listener:TPOfferwallListener,adUnitId?:string):void;
}

//原生
declare interface TPNativeListener
{
    onNativeLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeLoadFailed?:(adUnitId:string,error:Record<string,string>) => any;

    onNativeImpression?:(adUnitId:string,adInfo:Record<string,string>) => any;

    onNativeShowFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Map<string,string>) => any;

    onNativeClicked?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeClosed?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeBiddingStart?:(adUnitId:string,adInfo:Record<string,any>) => any;
    
    onNativeBiddingEnd?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
        
    onNativeIsLoading?:(adUnitId:string) => any;

    onNativeOneLayerStartLoad?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeOneLayerLoaded?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeOneLayerLoadFailed?:(adUnitId:string,adInfo:Record<string,any>,error:Record<string,string>) => any;
       
    onNativeAllLoaded?:(adUnitId:string,isSuccess:boolean) => any;

    onNativeVideoPlayStart?:(adUnitId:string,adInfo:Record<string,any>) => any;

    onNativeVideoPlayEnd?:(adUnitId:string,adInfo:Record<string,any>) => any;
       
    //以下仅ANDROID支持
    onDownloadStart?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string)  => any;
       
    onDownloadUpdate?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string, progres:number) => any;

    onDownloadPause?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFinish?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onDownloadFailed?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

    onInstalled?:(adUnitId:string, adInfo:Map<string,any>, totalBytes:number, currBytes:number, fileName:string, appName:string) => any;

}

declare class TPNativeExtra
{
    x?:number;//横幅广告展示坐标 x
    y?:number;//横幅广告展示坐标 y
    height?:number;//高度
    width?:number;//宽度
    adPosition?:number;
    customMap?:Record<string,any>;
    localParams?:Record<string,any>;
    openAutoLoadCallback?:boolean;
    maxWaitTime?:number;
}

declare class TPNative 
{
    //加载广告 adUnitId：广告位ID；extra：附加参数
    loadNativeAd(adUnitId:string,extra:TPNativeExtra): void;
     ///展示广告 adUnitId：广告位ID；sceneId：广告场景ID className：自定义模版名称 设置null时会使用默认
    showNativeAd(adUnitId:string,sceneId:string,className?:string):void;
    //是否有ready广告 adUnitId：广告位ID
    nativeAdReady(adUnitId:string):boolean;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    entryNativeAdScenario(adUnitId:string,sceneId:string):void;
     //隐藏Native
    hideNative(adUnitId:string):void;
     //显示已隐藏了的广告
    displayNative(adUnitId:string):void;
    //移除Native
    destroyNative(adUnitId:string):void;
    //进入广告场景 adUnitId：广告位ID；sceneId：广告场景ID
    setCustomAdInfo(adUnitId:string,customAdInfo:Map<string,string>):void;
    //设置监听回调
    setNativeListener(listener:TPNativeListener,adUnitId?:string):void;
}