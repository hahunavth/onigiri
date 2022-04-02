## Note: 
  - Using custom dev client
  - Remove ./android folder if build fail
  - Expo publish:
      "react-native-fast-image": "^8.5.11",
      "react-native-mmkv": "^1.6.2",
      "react-native-mmkv-flipper-plugin": "^1.0.0",
  - Disable update.url in app.config.js
  - Set .env: MMKV=false

## 
```code
expo fetch:android:hashes
expo credentials:manager -p android
expo start --dev-client 
```

