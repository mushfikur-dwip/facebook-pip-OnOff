# Facebook PiP Blocker

A Chrome extension that automatically closes Facebook's Picture-in-Picture (PiP) mini-player and provides additional video control features for a better browsing experience.

## 🚀 Features

### ✨ Core Features
- **Auto-Close PiP**: Automatically closes Facebook's floating Picture-in-Picture video player
- **Tab Switch Video Control**: Automatically pauses video when you switch tabs and resumes when you return
- **Toggle Controls**: Easy on/off switches for both features
- **Feedback System**: Built-in feedback form to send suggestions directly to the developer

### 🎯 Why Use This Extension?
- Prevents annoying floating video players from following you while scrolling
- Saves battery life by pausing videos when not actively viewing
- Provides a cleaner, distraction-free Facebook browsing experience
- Lightweight and fast with minimal resource usage

## 📋 Requirements

- Google Chrome browser (Version 88 or later)
- Access to Facebook.com

## 🛠️ Installation Methods

### Method 1: Manual Installation (Developer Mode)

Since this extension is not yet published on the Chrome Web Store, you'll need to install it manually:

#### Step 1: Download the Extension
1. Download all extension files to a folder on your computer
2. Make sure you have these files in the same directory:
   ```
   facebook-pip-OnOff/
   ├── manifest.json
   ├── background.js
   ├── content.js
   ├── popup.html
   ├── popup.js
   ├── style.css
   └── icons/
       ├── icon16.png
       ├── icon32.png
       ├── icon48.png
       └── icon128.png
   ```

#### Step 2: Enable Developer Mode
1. Open Google Chrome
2. Navigate to `chrome://extensions/` or go to:
   - **Menu (⋮)** → **More Tools** → **Extensions**
3. In the top-right corner, toggle **"Developer mode"** to **ON**

#### Step 3: Load the Extension
1. Click **"Load unpacked"** button (appears after enabling Developer mode)
2. Browse and select the folder containing the extension files
3. Click **"Select Folder"** or **"Open"**

#### Step 4: Verify Installation
- The extension should now appear in your extensions list
- You should see the Facebook PiP Blocker icon in your Chrome toolbar
- The extension will be enabled by default

### Method 2: Drag and Drop Installation
1. Enable Developer mode (follow Step 2 above)
2. Drag the entire extension folder into the Chrome extensions page
3. Chrome will automatically load the extension

## 🎮 How to Use

### Basic Usage
1. **Navigate to Facebook**: Go to [facebook.com](https://facebook.com)
2. **Access Extension**: Click the Facebook PiP Blocker icon in your Chrome toolbar
3. **Configure Settings**: Toggle features on/off as needed

### Feature Controls

#### 🔄 Auto-Close PiP
- **What it does**: Automatically closes Facebook's floating video player
- **How to toggle**: Check/uncheck "Enable PiP Auto-Close" in the extension popup
- **Effect**: Page will reload to apply changes

#### ⏸️ Tab Switch Video Control
- **What it does**: Pauses videos when you switch to another tab, resumes when you return
- **How to toggle**: Check/uncheck "Pause Video on Tab Switch" in the extension popup
- **Effect**: Page will reload to apply changes

#### 💬 Feedback System
- **Purpose**: Send suggestions, bug reports, or feedback directly to the developer
- **How to use**:
  1. Click the extension icon
  2. Scroll to the "Feedback Form" section
  3. Type your message in the text area
  4. Click "Send Feedback"

### Extension States
The extension icon title changes based on its status:
- **"Facebook PiP Blocker: Enabled"** - When PiP blocking is active
- **"Facebook PiP Blocker: Disabled"** - When PiP blocking is inactive

## ⚙️ Technical Details

### Permissions Required
- **Storage**: To save your preference settings
- **Scripting**: To inject content scripts into Facebook pages
- **ActiveTab**: To reload tabs when settings change
- **Host Permissions**: Access to facebook.com to monitor and control video elements

### How It Works
1. **Content Script**: Monitors Facebook pages for PiP video elements
2. **Background Service**: Manages extension state and settings
3. **Popup Interface**: Provides user controls and feedback system
4. **Auto-Detection**: Scans for specific Facebook video control elements every second

## 🔧 Troubleshooting

### Extension Not Working?
1. **Check if enabled**: Make sure both the extension and desired features are toggled ON
2. **Reload Facebook**: Refresh your Facebook tab after changing settings
3. **Check permissions**: Ensure the extension has permission to access Facebook
4. **Developer mode**: Verify Developer mode is still enabled in Chrome extensions

### Common Issues
- **PiP still appearing**: Wait a few seconds, the extension checks every 1 second
- **Videos not pausing**: Ensure "Pause Video on Tab Switch" is enabled and page is reloaded
- **Settings not saving**: Check if Chrome has storage permissions for the extension

### Debug Mode
1. Right-click the extension icon → "Inspect popup" to view popup console
2. Open browser DevTools on Facebook page to see content script logs
3. Check `chrome://extensions/` for any error messages

## 🔄 Updates and Maintenance

### Updating the Extension
1. Download the latest version files
2. Replace the old files in your extension folder
3. Go to `chrome://extensions/`
4. Click the **reload** button (🔄) next to Facebook PiP Blocker

### Uninstalling
1. Go to `chrome://extensions/`
2. Find Facebook PiP Blocker
3. Click **"Remove"**
4. Confirm deletion

## 📞 Support and Feedback

### Get Help
- **Email**: musfikurrahmandip@gmail.com
- **Feedback Form**: Use the built-in feedback form in the extension popup
- **Bug Reports**: Include your Chrome version and steps to reproduce the issue

### Feature Requests
We welcome suggestions for new features! Use the feedback form or email directly.

## 📄 Privacy Policy

This extension:
- ✅ Only accesses Facebook.com pages
- ✅ Stores settings locally on your device
- ✅ Sends feedback only when you explicitly submit it
- ❌ Does not collect personal data
- ❌ Does not track browsing behavior
- ❌ Does not share data with third parties

## 📝 Version History

### Version 1.0 (Current)
- Initial release
- Auto-close PiP functionality
- Tab switch video control
- Settings popup interface
- Feedback system integration

## 🤝 Contributing

This extension is open for improvements! If you're a developer and want to contribute:
1. Fork the project
2. Make your changes
3. Test thoroughly on Facebook
4. Submit feedback with your improvements

## 📋 License

This project is developed for personal and educational use. Feel free to modify and distribute according to your needs.

---

**Developed by Mushfikur Rahman**  
*Making Facebook browsing more enjoyable, one feature at a time.*

For questions, suggestions, or support, please don't hesitate to reach out via the feedback form or email.
