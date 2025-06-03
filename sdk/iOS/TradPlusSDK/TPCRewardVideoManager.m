//
//  TPCRewardVideoManager.m
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import "TPCRewardVideoManager.h"
#import "TPCRewardVideo.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>

@interface TPCRewardVideoManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCRewardVideo *>*rewardVideoAds;
@end

@implementation TPCRewardVideoManager

+ (TPCRewardVideoManager *)sharedInstance
{
    static TPCRewardVideoManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCRewardVideoManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.rewardVideoAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCRewardVideo *)getRewardVideoWithAdUnitID:(NSString *)adUnitId
{
    if([self.rewardVideoAds valueForKey:adUnitId])
    {
        return self.rewardVideoAds[adUnitId];
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
    TPCRewardVideo *rewardVideo = [[TPCRewardVideoManager sharedInstance] getRewardVideoWithAdUnitID:adUnitID];
    if(rewardVideo == nil)
    {
        rewardVideo = [[TPCRewardVideo alloc] init];
        [TPCRewardVideoManager sharedInstance].rewardVideoAds[adUnitID] = rewardVideo;
    }
    NSDictionary *extraMap = nil;
    if([extra isKindOfClass:[NSString class]] && extra.length > 0)
    {
        extraMap = [TPCPluginUtil getJsonDicWithString:extra];
    }
    CGFloat maxWaitTime = 0;
    NSString *userId = nil;
    NSString *customData = nil;
    if(extraMap != nil)
    {
        id customMap = extraMap[@"customMap"];
        if(customMap != nil && [customMap isKindOfClass:[NSDictionary class]])
        {
            [rewardVideo setCustomMap:customMap];
        }
        id localParams = extraMap[@"localParams"];
        if(localParams != nil && [localParams isKindOfClass:[NSDictionary class]])
        {
            [rewardVideo setLocalParams:localParams];
        }
        userId = extraMap[@"userId"];
        customData = extraMap[@"customData"];
        BOOL openAutoLoadCallback = [extraMap[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [rewardVideo openAutoLoadCallback];
        }
        maxWaitTime = [extraMap[@"maxWaitTime"] floatValue];
    }
    [rewardVideo setAdUnitID:adUnitID];
    if(userId != nil)
    {
        [rewardVideo setServerSideVerificationOptionsWithUserID:userId customData:customData];
    }
    [rewardVideo loadAdWithMaxWaitTime:maxWaitTime];
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
{
    
    TPCRewardVideo *rewardVideo = [[TPCRewardVideoManager sharedInstance] getRewardVideoWithAdUnitID:adUnitID];
    if(rewardVideo != nil)
    {
        [rewardVideo showAdWithSceneId:sceneId];
    }
    else
    {
        MSLogInfo(@"RewardVideo adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCRewardVideo *rewardVideo = [[TPCRewardVideoManager sharedInstance] getRewardVideoWithAdUnitID:adUnitID];
    if(rewardVideo != nil)
    {
        return rewardVideo.isAdReady;
    }
    else
    {
        MSLogInfo(@"RewardVideo adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCRewardVideo *rewardVideo = [[TPCRewardVideoManager sharedInstance] getRewardVideoWithAdUnitID:adUnitID];
    if(rewardVideo != nil)
    {
        [rewardVideo entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"RewardVideo adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCRewardVideo *rewardVideo = [[TPCRewardVideoManager sharedInstance] getRewardVideoWithAdUnitID:adUnitID];
    if(rewardVideo != nil)
    {
        [rewardVideo setCustomAdInfo:customAdInfo];
    }
    else
    {
        MSLogInfo(@"RewardVideo adUnitID:%@ not initialize",adUnitID);
    }
}
@end
