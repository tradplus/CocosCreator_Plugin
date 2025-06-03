

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
@interface TPCInterstitialManager : NSObject

+ (void)loadWithAdUnitID:(NSString *)adUnitID extra:(NSString *)extra;
+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID;
+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (void)setCustomAdInfo:(NSString *)customAdInfo adUnitID:(NSString *)adUnitID;
@end

NS_ASSUME_NONNULL_END
