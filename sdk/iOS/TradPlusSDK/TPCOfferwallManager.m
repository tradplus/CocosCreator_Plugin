//
//  TPCOfferwallManager.m
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import "TPCOfferwallManager.h"
#import "TPCOfferwall.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>

@interface TPCOfferwallManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCOfferwall *>*offerwallAds;
@end

@implementation TPCOfferwallManager

+ (TPCOfferwallManager *)sharedInstance
{
    static TPCOfferwallManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCOfferwallManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.offerwallAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCOfferwall *)getOfferwallWithAdUnitID:(NSString *)adUnitId
{
    if([self.offerwallAds valueForKey:adUnitId])
    {
        return self.offerwallAds[adUnitId];
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
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall == nil)
    {
        offerwall = [[TPCOfferwall alloc] init];
        [TPCOfferwallManager sharedInstance].offerwallAds[adUnitID] = offerwall;
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
            [offerwall setLocalParams:localParams];
        }
        NSDictionary *customMap = extraDic[@"customMap"];
        if([customMap isKindOfClass:[NSDictionary class]])
        {
            [offerwall setCustomMap:customMap];
        }
        BOOL openAutoLoadCallback = [extraDic[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [offerwall openAutoLoadCallback];
        }
        maxWaitTime = [extraDic[@"maxWaitTime"] floatValue];
    }
    [offerwall setAdUnitID:adUnitID];
    [offerwall loadAdWithMaxWaitTime:maxWaitTime];
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
{
    
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall showAdWithSceneId:sceneId];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        return offerwall.isAdReady;
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setUserIdWithAdUnitID:(NSString *)adUnitID userId:(NSString *)userId
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall setUserId:userId];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)getCurrencyBalanceWithAdUnitID:(NSString *)adUnitID
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall getCurrency];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)spendBalanceWithAdUnitID:(NSString *)adUnitID count:(int)count
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall spendWithAmount:count];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)awardBalanceWithAdUnitID:(NSString *)adUnitID count:(int)count
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall awardWithAmount:count];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCOfferwall *offerwall = [[TPCOfferwallManager sharedInstance] getOfferwallWithAdUnitID:adUnitID];
    if(offerwall != nil)
    {
        [offerwall setCustomAdInfo:customAdInfo];
    }
    else
    {
        MSLogInfo(@"Offerwall adUnitID:%@ not initialize",adUnitID);
    }
}
@end
