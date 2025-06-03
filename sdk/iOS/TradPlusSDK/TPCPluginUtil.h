//
//  TPUPluginUtil.h
//  UnityFramework
//
//  Created by xuejun on 2022/9/5.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface TPCPluginUtil : NSObject

+ (UIViewController*)viewController;
+ (UIWindow*)window;
+ (NSString *)getJsonStringWithDic:(NSDictionary *)dic;
+ (NSString *)getJsonStringWithError:(NSError *)error;
+ (NSDictionary *)getJsonDicWithString:(NSString *)str;
+ (NSArray *)getJsonArrayWithString:(NSString *)str;
+ (CGRect)getRectWithSize:(CGSize)size adPosition:(int)adPosition;
+ (UIColor *)colorWithString:(NSString *)colorStr;
@end

NS_ASSUME_NONNULL_END
