//
//  TPCSplashManager.h
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TPCSplashManager : NSObject

+ (void)loadWithAdUnitID:(NSString *)adUnitID extra:(NSString *)extra;
+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID;
+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID;
+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;

@end

NS_ASSUME_NONNULL_END
