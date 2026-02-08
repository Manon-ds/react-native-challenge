#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <AppVersionModuleSpec/AppVersionModuleSpec.h>
#endif

@interface AppVersionModule : NSObject
#ifdef RCT_NEW_ARCH_ENABLED
                              <NativeAppVersionSpec>
#else
                              <RCTBridgeModule>
#endif
@end

@implementation AppVersionModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return NO; // Can be initialized on background thread
}

#ifdef RCT_NEW_ARCH_ENABLED
// New Architecture (TurboModule) implementation
- (facebook::react::ModuleConstants<JS::NativeAppVersion::Constants::Builder>)
    constantsToExport {
  return [self getConstants];
}

- (facebook::react::ModuleConstants<JS::NativeAppVersion::Constants::Builder>)
    getConstants {
  return facebook::react::typedConstants<
      JS::NativeAppVersion::Constants::Builder>(
      {.appVersion = [self getAppVersion],
       .buildNumber = [self getBuildNumber]});
}
#else
// Old Architecture (Bridge) implementation
- (NSDictionary *)constantsToExport {
  return @{
    @"appVersion" : [self getAppVersion],
    @"buildNumber" : [self getBuildNumber]
  };
}
#endif

- (NSString *)getAppVersion {
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  return infoDictionary[@"CFBundleShortVersionString"] ?: @"Unknown";
}

- (NSString *)getBuildNumber {
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  return infoDictionary[@"CFBundleVersion"] ?: @"Unknown";
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAppVersionSpecJSI>(params);
}
#endif

@end