# Android TV Keyboard Setup Guide

## ✅ Changes Made

### 1. **AndroidManifest.xml**

- Updated `windowSoftInputMode` to `adjustResize|stateVisible`
- This tells Android to show the keyboard when input fields are focused

### 2. **FocusableInput Component**

- Added `useRef` to get reference to TextInput
- Added keyboard focus logic with setTimeout
- Added `autoFocus={false}` to prevent auto-focus on mount
- Configured for URL input with proper keyboard type

### 3. **ADB Settings**

- Enabled soft keyboard to show even with hardware keyboard present
- Command run: `adb shell settings put secure show_ime_with_hard_keyboard 1`

## 🎯 How to Use the Keyboard Now

### **Method 1: Click the Input Field**

1. Navigate to the input field using your TV remote
2. Press the **SELECT/OK** button on the remote
3. The on-screen keyboard should now appear
4. Use the remote D-pad to navigate the keyboard
5. Select letters to type your URL

### **Method 2: Use Physical Keyboard (If Connected)**

1. Connect a USB or Bluetooth keyboard to your Android TV
2. Click on the input field
3. Type directly using the physical keyboard

### **Method 3: Use "Paste URL" Button (Easiest)**

1. Copy a video URL on your computer/phone
2. The URL will be in the clipboard
3. Click the "Paste URL" button
4. URL automatically fills in

## 🔧 Troubleshooting

### If Keyboard Still Doesn't Show:

#### **Option A: Enable Soft Keyboard in Android TV Settings**

1. On your Android TV, go to **Settings**
2. Navigate to **Device Preferences** → **Keyboard**
3. Select **Gboard** (or your keyboard)
4. Enable **Show input method**

#### **Option B: Use ADB to Force Enable**

Run these commands from your computer:

```bash
# Enable soft keyboard
adb shell settings put secure show_ime_with_hard_keyboard 1

# Restart the app
adb shell am force-stop com.androidtvapp
npm run android
```

#### **Option C: Enable in Emulator Settings**

1. In Android Studio, open **AVD Manager**
2. Click the **pencil icon** to edit your TV emulator
3. Under **Advanced Settings** → **Keyboard**
4. Check **Enable keyboard input**
5. Restart the emulator

## 📱 Current Keyboard Configuration

The app is now configured with:

- ✅ Soft keyboard enabled in manifest
- ✅ Input field configured for URL entry
- ✅ Keyboard type set to "url" for better suggestions
- ✅ Auto-focus logic to trigger keyboard
- ✅ ADB settings configured

## 🎮 Using the On-Screen Keyboard with TV Remote

When the keyboard appears:

- **D-Pad Up/Down/Left/Right**: Navigate between keys
- **SELECT/OK**: Type the selected character
- **BACK**: Close keyboard
- **Look for**: Space bar, Delete, and Done buttons on the keyboard

## ⚡ Quick Test

To test if the keyboard works:

1. Open the app on your TV
2. Navigate to the input field (it will have a cyan border when focused)
3. Press **SELECT/OK** on your remote
4. The on-screen keyboard should appear at the bottom of the screen

If it appears, you're all set! 🎉

## 💡 Pro Tip

For the best TV experience, we recommend using the **"Paste URL"** button method as it's:

- ⚡ Faster than typing with a remote
- 🎯 More accurate (no typos)
- 📱 Easier to copy URLs from your phone/computer

The app is now ready to use with full keyboard support!
