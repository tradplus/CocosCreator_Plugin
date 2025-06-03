//
//  TPCOfferwallManager.h
//  UnityFramework
//
//  Created by xuejun on 2022/9/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TPCOfferwallManager : NSObject

+ (void)loadWithAdUnitID:(NSString *)adUnitID extra:(NSString *)extra;
+ (void)showWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (BOOL)adReadyWithAdUnitID:(NSString *)adUnitID;
+ (void)entryAdScenarioWithAdUnitID:(NSString *)adUnitID sceneId:(NSString *)sceneId;
+ (void)setUserIdWithAdUnitID:(NSString *)adUnitID userId:(NSString *)userId;
+ (void)getCurrencyBalanceWithAdUnitID:(NSString *)adUnitID;
+ (void)spendBalanceWithAdUnitID:(NSString *)adUnitID count:(int)count;
+ (void)awardBalanceWithAdUnitID:(NSString *)adUnitID count:(int)count;
+ (void)setCustomAdInfo:(NSDictionary *)customAdInfo adUnitID:(NSString *)adUnitID;
@end

NS_ASSUME_NONNULL_END


