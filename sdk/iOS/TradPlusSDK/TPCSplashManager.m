//
//  TPCSplashManager.m
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import "TPCSplashManager.h"
#import "TPCSplash.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>

@interface TPCSplashManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCSplash *>*splashAds;
@end

@implementation TPCSplashManager

+ (TPCSplashManager *)sharedInstance
{
    static TPCSplashManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCSplashManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.splashAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCSplash *)getsplashWithAdUnitID:(NSString *)adUnitId
{
    if([self.splashAds valueForKey:adUnitId])
    {
        return self.splashAds[adUnitId];
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
    TPCSplash *splash = [[TPCSplashManager sharedInstance] getsplashWithAdUnitID:adUnitID];
    if(splash == nil)
    {
        splash = [[TPCSplash alloc] init];
        [TPCSplashManager sharedInstance].splashAds[adUnitID] = splash;
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
            [splash setLocalParams:localParams];
        }
        NSDictionary *customMap = extraDic[@"customMap"];
        if([customMap isKindOfClass:[NSDictionary class]])
        {
            [splash setCustomMap:customMap];
        }
        BOOL openAutoLoadCallback = [extraDic[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [splash openAutoLoadCallback];
        }
        maxWaitTime = [extraDic[@"maxWaitTime"] floatValue];
    }
    [splash setAdUnitID:adUnitID];
    [splash loadAdWithMaxWaitTime:maxWaitTime];
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCSplash *splash = [[TPCSplashManager sharedInstance] getsplashWithAdUnitID:adUnitID];
    if(splash != nil)
    {
        [splash showAdWithSceneId:sceneId];
    }
    else
    {
        MSLogInfo(@"splash adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCSplash *splash = [[TPCSplashManager sharedInstance] getsplashWithAdUnitID:adUnitID];
    if(splash != nil)
    {
        [splash entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"splash adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCSplash *splash = [[TPCSplashManager sharedInstance] getsplashWithAdUnitID:adUnitID];
    if(splash != nil)
    {
        return splash.isAdReady;
    }
    else
    {
        MSLogInfo(@"splash adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCSplash *splash = [[TPCSplashManager sharedInstance] getsplashWithAdUnitID:adUnitID];
    if(splash != nil)
    {
        [splash setCustomAdInfo:customAdInfo];
    }
    else
    {
        MSLogInfo(@"splash adUnitID:%@ not initialize",adUnitID);
    }
}
@end
