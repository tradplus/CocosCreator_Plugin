

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TPCInterstitial : NSObject

@property (nonatomic,readonly)BOOL isAdReady;

- (void)setAdUnitID:(NSString * _Nonnull)adUnitID;
- (void)loadAdWithMaxWaitTime:(float)maxWaitTime;
- (void)openAutoLoadCallback;
- (void)setCustomMap:(NSDictionary *)dic;
- (void)setLocalParams:(NSDictionary *)dic;
- (void)showAdWithSceneId:(nullable NSString *)sceneId;
- (void)entryAdScenario:(nullable NSString *)sceneId;
- (void)setCustomAdInfo:(NSDictionary *)customAdInfo;
@end

NS_ASSUME_NONNULL_END
