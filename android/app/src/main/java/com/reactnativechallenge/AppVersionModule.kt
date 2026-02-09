package com.reactnativechallenge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.reactnativechallenge.appversion.NativeAppVersionSpec

@ReactModule(name = AppVersionModule.NAME)
class AppVersionModule(reactContext: ReactApplicationContext) : NativeAppVersionSpec(reactContext) {

  override fun getName(): String = NAME

  override fun getTypedExportedConstants(): MutableMap<String, Any> {
    val constants = mutableMapOf<String, Any>()

    try {
      val packageInfo =
              reactApplicationContext.packageManager.getPackageInfo(
                      reactApplicationContext.packageName,
                      0
              )

      constants["appVersion"] = packageInfo.versionName ?: ""
      constants["buildNumber"] = packageInfo.versionCode.toString()
    } catch (e: Exception) {
      constants["appVersion"] = ""
      constants["buildNumber"] = ""
    }

    return constants
  }

  companion object {
    const val NAME = "AppVersionModule"
  }
}
