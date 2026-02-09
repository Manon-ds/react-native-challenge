#import <Foundation/Foundation.h>
#import <AppVersionModuleSpec/AppVersionModuleSpec.h>

@interface AppVersionModule : NSObject <NativeAppVersionSpec>
@end

@implementation AppVersionModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

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

- (NSString *)getAppVersion {
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *version = infoDictionary[@"CFBundleShortVersionString"];
  if (!version) {
    NSLog(@"[AppVersionModule] CFBundleShortVersionString not found in bundle");
  }
  return version ?: @"";
}

- (NSString *)getBuildNumber {
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *buildNumber = infoDictionary[@"CFBundleVersion"];
  if (!buildNumber) {
    NSLog(@"[AppVersionModule] CFBundleVersion not found in bundle");
  }
  return buildNumber ?: @"";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAppVersionSpecJSI>(params);
}

@end
