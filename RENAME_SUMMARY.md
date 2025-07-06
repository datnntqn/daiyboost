# Application Rename Summary: DailyBoostApp to MotiveMe

## Changes Made

1. Updated application name in configuration files:
   - package.json
   - app.json
   - package-lock.json
   - android/settings.gradle

2. Updated Android files:
   - Changed main component name in MainActivity.kt

3. Updated iOS files:
   - Changed display name in Info.plist
   - Changed module name in AppDelegate.swift
   - Updated text in LaunchScreen.storyboard
   - Updated Podfile references

4. Updated Xcode scheme file:
   - Changed BuildableName and BlueprintName references

## Manual Steps Required

1. Rename iOS directories and files:
   - Rename `ios/DailyBoostApp` directory to `ios/MotiveMe`
   - Rename `ios/DailyBoostApp.xcodeproj` to `ios/MotiveMe.xcodeproj`
   - Rename `ios/DailyBoostApp.xcworkspace` to `ios/MotiveMe.xcworkspace`

2. Update Xcode project file (project.pbxproj):
   - This file contains many references to DailyBoostApp that need to be updated
   - It's recommended to use Xcode to rename the project rather than manually editing this file

3. Update Android package name:
   - Consider renaming the package from `com.dailyboostapp` to `com.motiveme`
   - This would require updating the directory structure and references

4. Rebuild the project:
   - Run `npm install` to update dependencies
   - For iOS: `cd ios && pod install`
   - For Android: Clean and rebuild

5. Test the application:
   - Ensure the app launches correctly on both iOS and Android
   - Verify that all functionality works as expected

## Note
Renaming an Xcode project is complex and is best done through Xcode itself rather than manually renaming files. The same applies to Android package names. Consider using specialized tools or IDEs for these operations. 