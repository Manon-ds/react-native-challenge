package com.reactnativechallenge

import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.reactnativechallenge.appversion.NativeAppVersionSpec

@ReactModule(name = AppVersionModule.NAME)
class AppVersionModule(reactContext: ReactApplicationContext) : NativeAppVersionSpec(reactContext) {

  override fun getName(): String = NAME

  override fun getTypedExportedConstants(): MutableMap<String, Any?> {
    val constants = mutableMapOf<String, Any?>()

    try {
      val packageInfo =
              reactApplicationContext.packageManager.getPackageInfo(
                      reactApplicationContext.packageName,
                      0
              )

      constants["appVersion"] = packageInfo.versionName ?: ""
      constants["buildNumber"] = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        packageInfo.longVersionCode.toString()
      } else {
        @Suppress("DEPRECATION")
        packageInfo.versionCode.toString()
      }
    } catch (e: Exception) {
      Log.w("AppVersionModule", "Failed to get package info", e)
      constants["appVersion"] = ""
      constants["buildNumber"] = ""
    }

    return constants
  }

  companion object {
    const val NAME = "AppVersionModule"
  }
}
