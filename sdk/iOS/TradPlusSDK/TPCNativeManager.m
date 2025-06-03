//
//  TPUNativeManager.m
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import "TPCNativeManager.h"
#import "TPCNative.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>

@interface TPCNativeManager()

@property (nonatomic,strong)NSMutableDictionary <NSString *,TPCNative *>*nativeAds;
@end

@implementation TPCNativeManager

+ (TPCNativeManager *)sharedInstance
{
    static TPCNativeManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TPCNativeManager alloc] init];
    });
    return manager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.nativeAds = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (TPCNative *)getNativeWithAdUnitID:(NSString *)adUnitId
{
    if([self.nativeAds valueForKey:adUnitId])
    {
        return self.nativeAds[adUnitId];
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
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native == nil)
    {
        native = [[TPCNative alloc] init];
        [TPCNativeManager sharedInstance].nativeAds[adUnitID] = native;
    }
    NSDictionary *extraMap = nil;
    if([extra isKindOfClass:[NSString class]] && extra.length > 0)
    {
        extraMap = [TPCPluginUtil getJsonDicWithString:extra];
    }
    NSInteger loadCount = 0;
    CGFloat maxWaitTime = 0;
    if(extraMap != nil)
    {
        CGFloat templateWidth = [extraMap[@"width"] floatValue];
        CGFloat templateHeight = [extraMap[@"height"] floatValue];
        if(templateWidth == 0)
        {
            templateWidth = 320;
        }
        if(templateHeight == 0)
        {
            templateHeight = 250;
        }
        [native setTemplateRenderSize:CGSizeMake(templateWidth, templateHeight)];
        CGFloat x = [extraMap[@"x"] floatValue];
        CGFloat y = [extraMap[@"y"] floatValue];
        int adPosition = [extraMap[@"adPosition"] intValue];
        [native setX:x y:y adPosition:adPosition];
        id customMap = extraMap[@"customMap"];
        if(customMap != nil && [customMap isKindOfClass:[NSDictionary class]])
        {
            [native setCustomMap:customMap];
        }
        id localParams = extraMap[@"localParams"];
        if(localParams != nil && [localParams isKindOfClass:[NSDictionary class]])
        {
            [native setLocalParams:localParams];
        }
        BOOL openAutoLoadCallback = [extraMap[@"openAutoLoadCallback"] boolValue];
        if(openAutoLoadCallback)
        {
            [native openAutoLoadCallback];
        }
        loadCount = [extraMap[@"loadCount"] integerValue];
        maxWaitTime = [extraMap[@"maxWaitTime"] floatValue];
    }
    [native setAdUnitID:adUnitID];
    [native loadAdWithMaxWaitTime:maxWaitTime];
    
}

+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId className:(NSString *)className
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        if(className == nil)
        {
            className = @"TPNativeTemplate";
        }
        Class renderClass = NSClassFromString(className);
        if(renderClass != nil)
        {
            [native showWithClassName:renderClass sceneId:sceneId];
        }
        else
        {
            MSLogInfo(@"Native renderClass is nil className:%@ adUnitID:%@",className,adUnitID);
        }
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}

+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        return native.isAdReady;
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
        return false;
    }
}

+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        [native entryAdScenario:sceneId];
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)hideWithAdUnitID:(NSString *)adUnitID
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        [native hide];
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)displayWithAdUnitID:(NSString *)adUnitID
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        [native display];
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)destroyWithAdUnitID:(NSString *)adUnitID
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        [native destroy];
        [[TPCNativeManager sharedInstance].nativeAds removeObjectForKey:adUnitID];
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}

+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID
{
    TPCNative *native = [[TPCNativeManager sharedInstance] getNativeWithAdUnitID:adUnitID];
    if(native != nil)
    {
        [native setCustomAdInfo:customAdInfo];
    }
    else
    {
        MSLogInfo(@"Native adUnitID:%@ not initialize",adUnitID);
    }
}
@end
