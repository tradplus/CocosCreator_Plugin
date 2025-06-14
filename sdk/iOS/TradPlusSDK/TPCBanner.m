//
//  TPCBanner.m
//  tradplus_sdk
//
//  Created by xuejun on 2022/7/19.
//

#import "TPCBanner.h"
#import "TPCBannerManager.h"
#import "TPCPluginUtil.h"
#import "TradplusSdkPlugin.h"

@interface TPCBanner()<TradPlusADBannerDelegate>

@property (nonatomic,assign)BOOL didShow;
@end

@implementation TPCBanner

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        self.banner = [[TradPlusAdBanner alloc] init];
        self.banner.delegate = self;
    }
    return self;
}

- (void)setBackgroundColor:(NSString *)backgroundColor
{
    if(backgroundColor != nil)
    {
        UIColor *color = [TPCPluginUtil colorWithString:backgroundColor];
        self.banner.backgroundColor = color;
    }
}

- (void)setClassName:(NSString *)className
{
    if(className != nil && className.length > 0)
    {
        Class class = NSClassFromString(className);
        if(class != nil)
        {
            self.banner.customRenderingViewClass = class;
        }
        else
        {
            MSLogTrace(@"no finid className %@",className);
        }
    }
    else
    {
        self.banner.customRenderingViewClass = nil;
    }
}

- (void)setX:(float)x y:(float)y adPosition:(int)adPosition
{
    CGRect rect = self.banner.bounds;
    UIViewController *rootController = [TPCPluginUtil viewController];
    if(x > 0 || y > 0)
    {
        rect.origin.x = x;
        rect.origin.y = y;
    }
    else
    {
        rect = [TPCPluginUtil getRectWithSize:rect.size adPosition:adPosition];
    }
    self.banner.frame = rect;
    [rootController.view addSubview:self.banner];
}

- (void)setCloseAutoShow:(BOOL)closeAutoShow
{
    _closeAutoShow = closeAutoShow;
    if(self.closeAutoShow && !self.didShow)
    {
        self.banner.hidden = YES;
    }
    self.banner.autoShow = !closeAutoShow;
}

- (void)setAdUnitID:(NSString * _Nonnull)adUnitID
{
    MSLogTrace(@"%s adUnitID:%@", __PRETTY_FUNCTION__,adUnitID);
    [self.banner setAdUnitID:adUnitID];
}

- (void)setBannerSize:(CGSize)size
{
    CGRect rect = CGRectZero;
    rect.size = size;
    self.banner.frame = rect;
    [self.banner setBannerSize:size];
}

- (void)setBannerContentMode:(NSInteger)mode
{
    self.banner.bannerContentMode = mode;
}

- (void)setCustomMap:(NSDictionary *)dic
{
    MSLogTrace(@"%s dic:%@", __PRETTY_FUNCTION__,dic);
    id segmentTag = dic[@"segment_tag"];
    if([segmentTag isKindOfClass:[NSString class]])
    {
        self.banner.segmentTag = segmentTag;
    }
    self.banner.dicCustomValue = dic;
}

- (void)setLocalParams:(NSDictionary *)dic
{
    self.banner.localParams = dic;
    MSLogTrace(@"%s %@", __PRETTY_FUNCTION__,dic);
}

- (void)loadAdWithSceneId:(nullable NSString *)sceneId maxWaitTime:(float)maxWaitTime
{
    MSLogTrace(@"%s sceneId:%@", __PRETTY_FUNCTION__,sceneId);
    [self.banner loadAdWithSceneId:sceneId maxWaitTime:maxWaitTime];
}

- (void)openAutoLoadCallback
{
    MSLogTrace(@"%s", __PRETTY_FUNCTION__);
    [self.banner openAutoLoadCallback];
}

- (void)showAdWithSceneId:(nullable NSString *)sceneId
{
    //关闭自动展示的并且未展示过的，在首次展示取消默认的隐藏状态
    if(self.closeAutoShow && !self.didShow)
    {
        self.didShow = YES;
        self.banner.hidden = NO;
    }
    [self.banner showWithSceneId:sceneId];
}

- (void)entryAdScenario:(nullable NSString *)sceneId
{
    MSLogTrace(@"%s entryAdScenario:%@", __PRETTY_FUNCTION__,sceneId);
    [self.banner entryAdScenario:sceneId];
}

- (BOOL)isAdReady
{
    MSLogTrace(@"%s", __PRETTY_FUNCTION__);
    return self.banner.isAdReady;
}

- (void)hide
{
    self.banner.hidden = YES;
}

- (void)display
{
    self.banner.hidden = NO;
}

- (void)destroy
{
    [self.banner removeFromSuperview];
}

- (void)setCustomAdInfo:(NSDictionary *)customAdInfo
{
    MSLogTrace(@"%s", __PRETTY_FUNCTION__);
    self.banner.customAdInfo = customAdInfo;
}

#pragma mark - TradPlusADBannerDelegate

- (nullable UIViewController *)viewControllerForPresentingModalView
{
    return [TPCPluginUtil viewController];
}

- (NSString *)eventName:(NSString *)event
{
    return [NSString stringWithFormat:@"window.TradPlusBanner.%@",event];
}

- (void)tpBannerAdIsLoading:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"isLoading"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///AD加载完成 首个广告源加载成功时回调 一次加载流程只会回调一次
- (void)tpBannerAdLoaded:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"loaded"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///AD加载失败
///tpBannerAdOneLayerLoad:didFailWithError：返回三方源的错误信息
- (void)tpBannerAdLoadFailWithError:(NSError *)error
{
    MSLogTrace(@"%s error:%@", __PRETTY_FUNCTION__, error);
    NSString *eventNam = [self eventName:@"loadFailed"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:nil error:error];
}

///AD展现
- (void)tpBannerAdImpression:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"impression"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///AD展现失败
- (void)tpBannerAdShow:(NSDictionary *)adInfo didFailWithError:(NSError *)error
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"showFailed"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:error];
}

///AD被点击
- (void)tpBannerAdClicked:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"clicked"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///v7.6.0+新增 开始加载流程
- (void)tpBannerAdStartLoad:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"startLoad"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///当每个广告源开始加载时会都会回调一次。
///v7.6.0+新增。替代原回调接口：tpBannerAdLoadStart:(NSDictionary *)adInfo;
- (void)tpBannerAdOneLayerStartLoad:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"oneLayerStartLoad"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///bidding开始
- (void)tpBannerAdBidStart:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"bidStart"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///bidding结束 error = nil 表示成功
- (void)tpBannerAdBidEnd:(NSDictionary *)adInfo error:(NSError *)error
{
    MSLogTrace(@"%s adInfo:%@ error:%@", __PRETTY_FUNCTION__, adInfo,error);
    NSString *eventNam = [self eventName:@"bidEnd"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:error];
}

///当每个广告源加载成功后会都会回调一次。
- (void)tpBannerAdOneLayerLoaded:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"oneLayerLoaded"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

///当每个广告源加载失败后会都会回调一次，返回三方源的错误信息
- (void)tpBannerAdOneLayerLoad:(NSDictionary *)adInfo didFailWithError:(NSError *)error
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"oneLayerLoadedFail"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:error];
}

///加载流程全部结束
- (void)tpBannerAdAllLoaded:(BOOL)success
{
    MSLogTrace(@"%s success:%@", __PRETTY_FUNCTION__, @(success));
    NSString *eventNam = [self eventName:@"allLoaded"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:nil error:nil exp:@{@"success":@(success)}];
}

///三方关闭按钮触发时的回调
- (void)tpBannerAdClose:(NSDictionary *)adInfo
{
    MSLogTrace(@"%s adInfo:%@", __PRETTY_FUNCTION__, adInfo);
    NSString *eventNam = [self eventName:@"closed"];
    [TradplusSdkPlugin callbackWithEventName:eventNam adUnitID:self.banner.unitID adInfo:adInfo error:nil];
}

@end
