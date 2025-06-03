#import <Foundation/Foundation.h>

@interface TradplusSdkPlugin : NSObject

+ (void)callbackWithEventName:(NSString *)name adUnitID:(NSString *)adUnitID adInfo:(NSDictionary *)adInfo error:(NSError *)error;

+ (void)callbackWithEventName:(NSString *)name adUnitID:(NSString *)adUnitID adInfo:(NSDictionary *)adInfo error:(NSError *)error exp:(NSDictionary *)exp;
@end
