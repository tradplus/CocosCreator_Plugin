//
//  TradplusSdkManager.h
//  tradplus_sdk
//
//  Created by xuejun on 2022/7/25.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TradplusSdkManager : NSObject

+ (void)initSDKWithAppId:(NSString *)appId;
+ (void)setCustomMap:(NSString *)map;
+ (void)setSettingDataParam:(NSString*)param;
+ (void)setLGPDConsent:(BOOL)canDataCollection;
+ (NSInteger)getLGPDConsent;
+ (void)setGDPRDataCollection:(BOOL)canDataCollection;
+ (NSInteger)getGDPRDataCollection;
+ (void)setCCPADoNotSell:(BOOL)canDataCollection;
+ (NSInteger)getCCPADoNotSell;
+ (void)setCOPPAIsAgeRestrictedUser:(BOOL)isChild;
+ (NSInteger)getCOPPAIsAgeRestrictedUser;
+ (void)setOpenPersonalizedAd:(BOOL)open;
+ (BOOL)isOpenPersonalizedAd;
+ (void)showGDPRDialog;
+ (NSString *)sdkVersion;
+ (BOOL)isCalifornia;
+ (BOOL)isEUTraffic;
+ (void)checkCurrentArea;
+ (void)clearCacheWithAdUnitId:(NSString*)adUnitId;
+ (void)openTradPlusTool;
+ (void)addGlobalAdImpressionDelegate;
+ (void)setCustomTestID:(NSString *)testID;
+ (void)setPAConsent:(NSInteger)consent;
+ (void)setPlatformLimit:(NSString *)listStr;
@end

NS_ASSUME_NONNULL_END
