<img style="height:100px;" src="https://github.com/Supafo-Team/Supafo-React-Native/blob/main/Designs/bigicon.png" />

# Supafo
> Built with React Native, Redux, TailwindCSS and Firebase

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Developer Environment Requirements](#developer-environment-requirements)
  - [Android](#android)
  - [iOS](#ios)
- [Installing](#installing)
  - [Clone repository](#clone-repository)
  - [Install Packages](#install-packages)
- [Running a test/dev build](#running-a-testdev-build)
  - [Android](#android-1)
  - [iOS](#ios-1)
- [Building your app for production](#building-your-app-for-production)
  - [iOS](#ios-2)
    - [Generate IPA](#generate-ipa)
  - [Android](#android-2)
    - [Generating a signing key](#generating-a-signing-key)
    - [Setting up gradle variables](#setting-up-gradle-variables)
    - [Generating the release APK](#generating-the-release-apk)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Developer Environment Requirements

### Android

- Android Studio 3.0 or above + Android SDK: https://developer.android.com/studio/
- Code Editor
  - Visual Studio Code: https://code.visualstudio.com/download
  - Sublime Text: https://www.sublimetext.com/3
- Node: https://nodejs.org/en/
- Python2 or above: https://www.python.org/downloads/

### iOS

- XCode 8.0 or above: https://developer.apple.com/download/
- Code Editor(any)
  - Visual Studio Code: https://code.visualstudio.com/download
- Nodejs LTS: https://nodejs.org/en/

## Installing

Setup your machine for Android and iOS using react native guideline for [Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started.html).

### Clone repository

    git clone https://github.com/Supafo-Team/Supafo-React-Native
    cd Supafo-React-Native/App

### Install Packages

    yarn install

## Running a test/dev build

### Android

    npx react-native run-android

### iOS

Install Cocoapos using terminal

    sudo gem install cocoapods

Go to `ios` directory of the project and run the following command:

    cd ios
    pod install

open `ios/Supafo.xcworkspace` from now on and run the project.

or run

    npx react-native run-ios --simulator="iPhone 14 Pro Max"

## Building your app for production

### iOS

#### Generate IPA

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the `ios` folder in your project, then open the `.xcworkspace` file within it using Xcode.

You can change **App Name** and **bundle identifier** in Xcode.

Go to "Signing" and make sure you have selected right Provisioning Profile and Signing Certificate

To configure your app to be built using the `Release` scheme, go to **Product** → **Scheme** → **Edit Scheme**. Select the **Run** tab in the sidebar, then set the Build Configuration dropdown to `Release`.

![](https://facebook.github.io/react-native/docs/assets/ConfigureReleaseScheme.png)

Now, Go to **Build** → **Archive**.

This will generate **IPA**.

### Android

#### Generating a signing key

You can generate a private signing key using `keytool`. On Windows `keytool` must be run from `C:\Program Files\Java\jdkx.x.x_x\bin`

```
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Note:** I have already added my keystore in the app. you have to replace it.

This command prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called `my-release-key.keystore`.

The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.

#### Setting up gradle variables

1.  Place the `my-release-key.keystore` file under the `android/app` directory in your project folder.
2.  Edit the file `android/gradle.properties` and add the following (replace `*****` with the correct keystore password, alias and key password),

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

#### Generating the release APK

```

## for MacOS and Linux
cd android
chmod +x gradlew
./gradlew assembleRelease


## for Windows
cd android
.\gradlew.bat assembleRelease
```

The generated APK can be found under `android/app/build/outputs/apk/app-release.apk`, and is ready to be distributed.
