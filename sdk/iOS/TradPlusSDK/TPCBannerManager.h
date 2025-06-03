//
//  TPCBannerManager.h
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TPCBannerManager : NSObject

+ (void)loadWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId extra:(NSString *)extra;
+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID;
+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (void)hideWithAdUnitID:(NSString *)adUnitID;
+ (void)displayWithAdUnitID:(NSString *)adUnitID;
+ (void)destroyWithAdUnitID:(NSString *)adUnitID;
+ (void)setCustomAdInfo:(NSString *)customAdInfo adUnitID:(NSString *)adUnitID;
@end

NS_ASSUME_NONNULL_END
