

#import "TPCInterstitialManager.h"
#import "TPCInterstitial.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>

@interface TPCInterstitialManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCInterstitial *>*interstitialAds;
@end

@implementation TPCInterstitialManager

+ (TPCInterstitialManager *)sharedInstance
{
    static TPCInterstitialManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCInterstitialManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.interstitialAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCInterstitial *)getInterstitialWithAdUnitID:(NSString *)adUnitId
{
    if([self.interstitialAds valueForKey:adUnitId])
    {
        return self.interstitialAds[adUnitId];
    }
    return nil;
}

+ (void)loadWithAdUnitID:(NSString *)adUnitID extra:(NSString *)extra
{
    if(adUnitID == nil)
    {
        MSLogInfo(@"adUnitId is null");
        return;
    }
    TPCInterstitial *interstitial = [[TPCInterstitialManager sharedInstance] getInterstitialWithAdUnitID:adUnitID];
    if(interstitial == nil)
    {
        interstitial = [[TPCInterstitial alloc] init];
        [TPCInterstitialManager sharedInstance].interstitialAds[adUnitID] = interstitial;
    }
    NSDictionary *extraDic = nil;
    if([extra isKindOfClass:[NSString class]] && extra.length > 0)
    {
        extraDic = [TPCPluginUtil getJsonDicWithString:extra];
    }
    float maxWaitTime = 0;
    if(extraDic != nil)
    {
        NSDictionary *localParams = extraDic[@"localParams"];
        if([localParams isKindOfClass:[NSDictionary class]])
        {
            [interstitial setLocalParams:localParams];
        }
        NSDictionary *customMap = extraDic[@"customMap"];
        if([customMap isKindOfClass:[NSDictionary class]])
        {
            [interstitial setCustomMap:customMap];
        }
        BOOL openAutoLoadCallback = [extraDic[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [interstitial openAutoLoadCallback];
        }
        maxWaitTime = [extraDic[@"maxWaitTime"] floatValue];
    }
    [interstitial setAdUnitID:adUnitID];
    [interstitial loadAdWithMaxWaitTime:maxWaitTime];
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
{
    
    TPCInterstitial *interstitial = [[TPCInterstitialManager sharedInstance] getInterstitialWithAdUnitID:adUnitID];
    if(interstitial != nil)
    {
        [interstitial showAdWithSceneId:sceneId];
    }
    else
    {
        MSLogInfo(@"interstitial adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCInterstitial *interstitial = [[TPCInterstitialManager sharedInstance] getInterstitialWithAdUnitID:adUnitID];
    if(interstitial != nil)
    {
        return interstitial.isAdReady;
    }
    else
    {
        MSLogInfo(@"interstitial adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCInterstitial *interstitial = [[TPCInterstitialManager sharedInstance] getInterstitialWithAdUnitID:adUnitID];
    if(interstitial != nil)
    {
        [interstitial entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"interstitial adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setCustomAdInfo:(NSString *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCInterstitial *interstitial = [[TPCInterstitialManager sharedInstance] getInterstitialWithAdUnitID:adUnitID];
    if(interstitial != nil)
    {
        NSDictionary *customAdInfoDic = nil;
        if([customAdInfo isKindOfClass:[NSString class]] && customAdInfo.length > 0)
        {
            customAdInfoDic = [TPCPluginUtil getJsonDicWithString:customAdInfo];
        }
        if(customAdInfoDic != nil)
        {
            [interstitial setCustomAdInfo:customAdInfoDic];
        }
    }
    else
    {
        MSLogInfo(@"interstitial adUnitID:%@ not initialize",adUnitID);
    }
}
@end
