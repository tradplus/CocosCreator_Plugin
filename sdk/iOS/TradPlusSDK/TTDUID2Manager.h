#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TTDUID2Manager : NSObject

+ (void)startUID2:(NSString *)jsonStr;
+ (void)resetSetting;

@end

NS_ASSUME_NONNULL_END
