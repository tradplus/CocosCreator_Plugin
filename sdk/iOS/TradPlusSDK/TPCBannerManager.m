//
//  TPUBannerManager.m
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import "TPCBannerManager.h"
#import "TPCBanner.h"
#import <TradPlusAds/TradPlusAds.h>
#import "TPCPluginUtil.h"

@interface TPCBannerManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCBanner *>*bannerAds;
@end

@implementation TPCBannerManager

+ (TPCBannerManager *)sharedInstance
{
    static TPCBannerManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCBannerManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.bannerAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCBanner *)getBannerWithAdUnitID:(NSString *)adUnitId
{
    if([self.bannerAds valueForKey:adUnitId])
    {
        return self.bannerAds[adUnitId];
    }
    return nil;
}

+ (void)loadWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId extra:(NSString *)extra
{
    if(adUnitID == nil)
    {
        MSLogInfo(@"adUnitId is null");
        return;
    }
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner == nil)
    {
        banner = [[TPCBanner alloc] init];
        [TPCBannerManager sharedInstance].bannerAds[adUnitID] = banner;
    }
    NSDictionary *extraDic = nil;
    float maxWaitTime = 0;
    if([extra isKindOfClass:[NSString class]] && extra.length > 0)
    {
        extraDic = [TPCPluginUtil getJsonDicWithString:extra];
    }
    if(extraDic != nil)
    {
        id className = extraDic[@"className"];
        if([className isKindOfClass:[NSString class]])
        {
            [banner setClassName:className];
        }
        NSDictionary *localParams = extraDic[@"localParams"];
        if([localParams isKindOfClass:[NSDictionary class]])
        {
            [banner setLocalParams:localParams];
        }
        NSDictionary *customMap = extraDic[@"customMap"];
        if([customMap isKindOfClass:[NSDictionary class]])
        {
            [banner setCustomMap:customMap];
        }
        BOOL openAutoLoadCallback = [extraDic[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [banner openAutoLoadCallback];
        }
        maxWaitTime = [extraDic[@"maxWaitTime"] floatValue];
        CGSize size = CGSizeZero;
        CGFloat width = [extraDic[@"width"] floatValue];
        if(width == 0)
        {
            UIView *rootView = [TPCPluginUtil viewController].view;
            size.width = [UIScreen mainScreen].bounds.size.width;
            if (@available(iOS 11.0, *)) {
                size.width = size.width - rootView.safeAreaInsets.left - rootView.safeAreaInsets.right;
            }
        }
        else
        {
            size.width = width;
        }
        CGFloat height = [extraDic[@"height"] floatValue];
        if(height == 0)
        {
            size.height = 50;
        }
        else
        {
            size.height = height;
        }
        [banner setBannerSize:size];
        NSInteger contentMode = [extraDic[@"contentMode"] integerValue];
        [banner setBannerContentMode:contentMode];
        bool closeAutoShow = [extraDic[@"closeAutoShow"] boolValue];
        banner.closeAutoShow = closeAutoShow;
        CGFloat x = [extraDic[@"x"] floatValue];
        CGFloat y = [extraDic[@"y"] floatValue];
        int adPosition = [extraDic[@"adPosition"] intValue];
        [banner setX:x y:y adPosition:adPosition];
        id backgroundColor = extraDic[@"backgroundColor"];
        if([backgroundColor isKindOfClass:[NSString class]])
        {
            [banner setBackgroundColor:backgroundColor];
        }
    }
    [banner setAdUnitID:adUnitID];
    [banner loadAdWithSceneId:sceneId maxWaitTime:maxWaitTime];
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        [banner showAdWithSceneId:sceneId];
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        return banner.isAdReady;
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        [banner entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)hideWithAdUnitID:(NSString *)adUnitID
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        [banner hide];
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)displayWithAdUnitID:(NSString *)adUnitID
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        [banner display];
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)destroyWithAdUnitID:(NSString *)adUnitID
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        [banner destroy];
        [[TPCBannerManager sharedInstance].bannerAds removeObjectForKey:adUnitID];
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setCustomAdInfo:(NSString *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCBanner *banner = [[TPCBannerManager sharedInstance] getBannerWithAdUnitID:adUnitID];
    if(banner != nil)
    {
        NSDictionary *customAdInfoDic = nil;
        if([customAdInfo isKindOfClass:[NSString class]] && customAdInfo.length > 0)
        {
            customAdInfoDic = [TPCPluginUtil getJsonDicWithString:customAdInfo];
        }
        if(customAdInfoDic != nil)
        {
            [banner setCustomAdInfo:customAdInfoDic];
        }
    }
    else
    {
        MSLogInfo(@"Banner adUnitID:%@ not initialize",adUnitID);
    }
}
@end
