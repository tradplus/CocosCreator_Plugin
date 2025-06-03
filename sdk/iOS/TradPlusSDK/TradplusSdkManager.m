//
//  TradplusSdkManager.m
//  tradplus_sdk
//
//  Created by xuejun on 2022/7/25.
//

#import "TradplusSdkManager.h"
#import <TradPlusAds/TradPlusAds.h>
#import "TradplusSdkPlugin.h"
#import "TPCPluginUtil.h"

@interface TradplusSdkManager()<TradPlusAdImpressionDelegate>

@end

@implementation TradplusSdkManager

+(TradplusSdkManager *)sharedInstance
{
    static TradplusSdkManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TradplusSdkManager alloc] init];
    });
    return manager;
}

+ (void)addGlobalAdImpressionDelegate
{
    [TradPlus sharedInstance].impressionDelegate = [TradplusSdkManager sharedInstance];
}

+ (void)openTradPlusTool
{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
    Class TPMediationHelper = NSClassFromString(@"TPMediationHelper");
    if(TPMediationHelper != nil)
    {
        if([TPMediationHelper respondsToSelector:@selector(open)])
        {
            [TPMediationHelper performSelector:@selector(open)];
        }
    }
    else
    {
        NSLog(@"****************");
        NSLog(@"no find TPMediationHelper SDK");
        NSLog(@"****************");
    }
#pragma clang diagnostic pop
}

+ (void)setCustomTestID:(NSString *)testID
{
    MSLogTrace(@"%s %@", __PRETTY_FUNCTION__, testID);
    if(testID != nil && [testID isKindOfClass:[NSString class]])
    {
        [TradPlus sharedInstance].customTestID = testID;
    }
}

+ (void)setPAConsent:(NSInteger)consent
{
    MSLogTrace(@"%s %@", __PRETTY_FUNCTION__, @(consent));
    [TradPlus setPAConsent:consent];
}

+ (void)setPlatformLimit:(NSString *)listStr
{
    MSLogTrace(@"%s %@", __PRETTY_FUNCTION__,listStr);
    NSArray *limitArray = nil;
    if(listStr != nil && [listStr isKindOfClass:[NSString class]])
    {
        limitArray = [TPCPluginUtil getJsonArrayWithString:listStr];
    }
    if(limitArray == nil)
    {
        return;
    }
    [TradPlus setPlatformLimit:limitArray];
}


+ (void)clearCacheWithAdUnitId:(NSString*)adUnitId
{
    if(adUnitId != nil && [adUnitId isKindOfClass:[NSString class]])
    {
        [TradPlus clearCacheWithPlacementId:adUnitId];
    }
}

+ (void)setCustomMap:(NSString *)map
{
    NSDictionary *customMap = nil;
    if([map isKindOfClass:[NSString class]] && map.length > 0)
    {
        customMap = [TPCPluginUtil getJsonDicWithString:map];
    }
    if(customMap != nil)
    {
        [TradPlus sharedInstance].dicCustomValue = customMap;
    }
}

+ (void)initSDKWithAppId:(NSString *)appId
{
    if(appId != nil && [appId isKindOfClass:[NSString class]])
    {
        [TradPlus initSDK:appId completionBlock:^(NSError * _Nonnull error) {
            BOOL success = (error != nil);
            [TradplusSdkPlugin callbackWithEventName:@"window.TradPlusAds.initFinish" adUnitID:nil adInfo:nil error:nil exp:@{@"success":@(success)}];
        }];
    }
    else
    {
        MSLogInfo(@"not find init appId");
    }
}

+ (void)setSettingDataParam:(NSString*)param
{
    NSDictionary *settingDic = nil;
    if([param isKindOfClass:[NSString class]] && param.length > 0)
    {
        settingDic = [TPCPluginUtil getJsonDicWithString:param];
    }
    if(settingDic == nil)
    {
        return;
    }
    //交叉推广超时
    if([settingDic valueForKey:@"http_timeout_crosspromotion"])
    {
        NSInteger http_timeout_crosspromotion = [settingDic[@"http_timeout_crosspromotion"] integerValue];
        if(http_timeout_crosspromotion > 0)
        {
            http_timeout_crosspromotion = http_timeout_crosspromotion/1000;
            if(http_timeout_crosspromotion == 0)
                http_timeout_crosspromotion = 1;
            gTPHttpTimeoutCross = http_timeout_crosspromotion;
        }
    }
    //adx超时
    if([settingDic valueForKey:@"http_timeout_adx"])
    {
        NSInteger http_timeout_adx = [settingDic[@"http_timeout_adx"] integerValue];
        if(http_timeout_adx > 0)
        {
            http_timeout_adx = http_timeout_adx/1000;
            if(http_timeout_adx == 0)
                http_timeout_adx = 1;
            gTPHttpTimeoutAdx = http_timeout_adx;
        }
    }
    //配置超时
    if([settingDic valueForKey:@"http_timeout_conf"])
    {
        NSInteger http_timeout_conf = [settingDic[@"http_timeout_conf"] integerValue];
        if(http_timeout_conf > 0)
        {
            http_timeout_conf = http_timeout_conf/1000;
            if(http_timeout_conf == 0)
                http_timeout_conf = 1;
            gTPHttpTimeoutConf = http_timeout_conf;
        }
    }
    //其他网络超时
    if([settingDic valueForKey:@"http_timeout_event"])
    {
        NSInteger http_timeout_event = [settingDic[@"http_timeout_event"] integerValue];
        if(http_timeout_event > 0)
        {
            http_timeout_event = http_timeout_event/1000;
            if(http_timeout_event == 0)
                http_timeout_event = 1;
            gTPHttpTimeoutEvent = http_timeout_event;
        }
    }
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    if([settingDic valueForKey:@"autoload_close"])
    {
        id autoload_close = settingDic[@"autoload_close"];
        if([autoload_close isKindOfClass:[NSArray class]])
        {
            dic[@"autoload_close"] = autoload_close;
        }
    }
    [[TradPlus sharedInstance] setSettingDataParam:dic];
}

+ (NSString *)sdkVersion
{
    return [TradPlus getVersion];
}

+ (BOOL)isCalifornia
{
    return gMsSDKIsCA;
}

+ (BOOL)isEUTraffic
{
    BOOL isEU = ([MSConsentManager sharedManager].isGDPRApplicable == MSBoolYes);
    return isEU;
}

+ (void)checkCurrentArea
{
    [TradPlus checkCurrentArea:^(BOOL isUnknown, BOOL isCN, BOOL isCA, BOOL isEU) {
        if(!isUnknown)
        {
            [TradplusSdkPlugin callbackWithEventName:@"window.TradPlusAds.currentAreaSuccess" adUnitID:nil adInfo:nil error:nil exp:@{@"iscn":@(isCN),@"iseu":@(isEU),@"isca":@(isCA)}];
        }
        else
        {
            [TradplusSdkPlugin callbackWithEventName:@"window.TradPlusAds.currentAreaFailed" adUnitID:nil adInfo:nil error:nil];
        }
    }];
}

+ (void)setLGPDConsent:(BOOL)canDataCollection
{
    [TradPlus setLGPDIsConsentEnabled:canDataCollection];
}

+ (NSInteger)getLGPDConsent
{
    NSInteger callbackState = 2;//未设置
    if([[NSUserDefaults standardUserDefaults] objectForKey:gTPLGPDStorageKey])
    {
        NSInteger lgpdStatus = [[NSUserDefaults standardUserDefaults] integerForKey:gTPLGPDStorageKey];
        if(lgpdStatus == 2)
        {
            callbackState = 0;//允许
        }
        else if(lgpdStatus == 1)
        {
            callbackState = 1;//不允许
        }
    }
    return callbackState;
}

+ (void)setGDPRDataCollection:(BOOL)canDataCollection
{
    [TradPlus setGDPRDataCollection:canDataCollection];
}

+ (NSInteger)getGDPRDataCollection
{
    NSInteger callbackState = 2;//未设置
    MSConsentStatus state =  [TradPlus getGDPRDataCollection];
    if(state == MSConsentStatusDenied)
    {
        callbackState = 1;//不允许
    }
    else if(state == MSConsentStatusConsented)
    {
        callbackState = 0;//允许
    }
    return callbackState;
}


+ (void)setCCPADoNotSell:(BOOL)canDataCollection
{
    [TradPlus setCCPADoNotSell:canDataCollection];
}

+ (NSInteger)getCCPADoNotSell
{
    NSInteger callbackState = 2;//未设置
    if([[NSUserDefaults standardUserDefaults] objectForKey:gTPCCPAStorageKey])
    {
        NSInteger ccpaStatus = [[NSUserDefaults standardUserDefaults] integerForKey:gTPCCPAStorageKey];
        if(ccpaStatus == 2)
        {
            callbackState = 0;//允许
        }
        else if(ccpaStatus == 1)
        {
            callbackState = 1;//不允许
        }
    }
    return callbackState;
}

+ (void)setCOPPAIsAgeRestrictedUser:(BOOL)isChild
{
    [TradPlus setCOPPAIsAgeRestrictedUser:isChild];
}

+ (NSInteger)getCOPPAIsAgeRestrictedUser
{
    NSInteger callbackState = 2;//未设置
    if([[NSUserDefaults standardUserDefaults] objectForKey:gTPCOPPAStorageKey])
    {
        NSInteger coppaStatus = [[NSUserDefaults standardUserDefaults] integerForKey:gTPCOPPAStorageKey];
        if(coppaStatus == 2)
        {
            callbackState = 0;//允许
        }
        else if(coppaStatus == 1)
        {
            callbackState = 1;//不允许
        }
    }
    return callbackState;
}

+ (void)setOpenPersonalizedAd:(BOOL)open
{
    [TradPlus setOpenPersonalizedAd:open];
}

+ (BOOL)isOpenPersonalizedAd
{
    return [TradPlus sharedInstance].isOpenPersonalizedAd;
}

+ (void)showGDPRDialog
{
    [[MSConsentManager sharedManager] showConsentDialogFromViewController:[MsCommon getTopRootViewController] didShow:nil didDismiss:^{
        [TradplusSdkPlugin callbackWithEventName:@"window.TradPlusAds.dialogClosed" adUnitID:nil adInfo:nil error:nil];
    }];
}

#pragma mark - TradPlusAdImpressionDelegate
- (void)tradPlusAdImpression:(NSDictionary *)adInfo
{
    [TradplusSdkPlugin callbackWithEventName:@"window.TradPlusAds.globalAdImpression" adUnitID:nil adInfo:adInfo error:nil];
}
@end
