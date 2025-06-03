#import "TradplusSdkPlugin.h"
#import "TPCPluginUtil.h"
#import <TradPlusAds/TradPlusAds.h>
//3.0
#include "cocos/bindings/jswrapper/SeApi.h"

@implementation TradplusSdkPlugin

+ (void)callbackWithEventName:(NSString *)name adUnitID:(NSString *)adUnitID adInfo:(NSDictionary *)adInfo error:(NSError *)error exp:(NSDictionary *)exp
{
    NSMutableDictionary *arguments = [[NSMutableDictionary alloc] init];
    arguments[@"adUnitID"] = adUnitID;
    if(adInfo != nil)
    {
        arguments[@"adInfo"] = adInfo;
    }
    if(error != nil)
    {
        NSString *message = @"";
        if(error.localizedDescription != nil)
        {
            message = error.localizedDescription;
        }
        arguments[@"adError"] = @{@"code":@(error.code),@"message":message};
    }
    if(exp != nil)
    {
        [arguments addEntriesFromDictionary:exp];
    }
    NSString *argumentsInfo = [TPCPluginUtil getJsonStringWithDic:arguments];
    //需要去除'
    argumentsInfo = [argumentsInfo stringByReplacingOccurrencesOfString:@"'" withString:@""];
    NSString *evalString = [NSString stringWithFormat:@"%@('%@')",name,argumentsInfo];
    tp_dispatch_main_async_safe(^{
        se::ScriptEngine::getInstance()->evalString(evalString.UTF8String);
    });
}

+ (void)callbackWithEventName:(NSString *)name adUnitID:(NSString *)adUnitID adInfo:(NSDictionary *)adInfo error:(NSError *)error
{
    [TradplusSdkPlugin callbackWithEventName:name adUnitID:adUnitID adInfo:adInfo error:error exp:nil];
}

@end
