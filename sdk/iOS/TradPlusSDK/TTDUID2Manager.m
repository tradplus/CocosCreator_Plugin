

#import "TTDUID2Manager.h"
#import "TTDUID2ManagerProtocol.h"
#import "TPCPluginUtil.h"
#import "TradplusSdkPlugin.h"
#import <TradPlusAds/TradPlusAds.h>

@implementation TTDUID2Manager

+ (void)startUID2:(NSString *)jsonStr
{
    MSLogTrace(@"%s", __PRETTY_FUNCTION__);
    Class TTDUID2ManagerAdatper = NSClassFromString(@"TTDUID2ManagerAdatper");
    if(TTDUID2ManagerAdatper == nil)
    {
        return;
    }
    if(![TTDUID2ManagerAdatper respondsToSelector:@selector(sharedInstance)])
    {
        return;
    }
    id <TTDUID2ManagerProtocol>adatper = [TTDUID2ManagerAdatper performSelector:@selector(sharedInstance)];
    if(adatper == nil)
    {
        return;
    }
    NSDictionary *customMap = nil;
    if([jsonStr isKindOfClass:[NSString class]] && jsonStr.length > 0)
    {
        customMap = [TPCPluginUtil getJsonDicWithString:jsonStr];
    }
    if(customMap == nil)
    {
        return;
    }
    if([customMap valueForKey:@"email"])
    {
        adatper.email = customMap[@"email"];
    }
    if([customMap valueForKey:@"emailHash"])
    {
        adatper.emailHash = customMap[@"emailHash"];
    }
    if([customMap valueForKey:@"phone"])
    {
        adatper.phone = customMap[@"phone"];
    }
    if([customMap valueForKey:@"phoneHash"])
    {
        adatper.phoneHash = customMap[@"phoneHash"];
    }
    if([customMap valueForKey:@"subscriptionID"])
    {
        adatper.subscriptionID = customMap[@"subscriptionID"];
    }
    if([customMap valueForKey:@"serverPublicKey"])
    {
        adatper.serverPublicKey = customMap[@"serverPublicKey"];
    }
    if([customMap valueForKey:@"appName"])
    {
        adatper.appName = customMap[@"appName"];
    }
    if([customMap valueForKey:@"customURLString"])
    {
        adatper.customURLString = customMap[@"customURLString"];
    }
    NSInteger testMode = [customMap[@"isTestMode"] integerValue];
    adatper.isTestMode = (testMode == 1);
    [adatper startWithCallback:^(NSError * _Nullable error) {
        [TradplusSdkPlugin callbackWithEventName:@"window.TTDUID2Manager.startFinish" adUnitID:nil adInfo:nil error:error];
    }];
}

+ (void)resetSetting
{
    MSLogTrace(@"%s", __PRETTY_FUNCTION__);
    Class TTDUID2ManagerAdatper = NSClassFromString(@"TTDUID2ManagerAdatper");
    if(TTDUID2ManagerAdatper == nil)
    {
        return;
    }
    if(![TTDUID2ManagerAdatper respondsToSelector:@selector(sharedInstance)])
    {
        return;
    }
    id <TTDUID2ManagerProtocol>adatper = [TTDUID2ManagerAdatper performSelector:@selector(sharedInstance)];
    if(adatper == nil)
    {
        return;
    }
    [adatper resetSetting];
}
@end
