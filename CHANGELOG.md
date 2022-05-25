# ChangeLog

## 0.0.7 (2022-5-25)
### Added
  - Install RecyclerListView
  
### Change
  - AutoHeightImage instead of ScaledImage
  - Commit with gacp

### Fixed
  - Memory leak in chapter screen

## 0.0.6 (2022-5-2)
### Added
  - Handle background notification click
  - Test createSelectorCreator
  - React navigation deep linking
  - Yarn v1
  - package.json
    ```bash
      {
        //...
        "installConfig": {
          "hoistingLimits": "workspaces"
        }
      }
    ```
### Change
  - LibraryList only render when screen is focused
  - LibraryListItem
  - Chapter screen fast image and clear cache when switch chapter
  - ComicDetail chapter list useFocusEffect

## 0.0.5 (2022-4-6)
### Added
  - expo-screen-orientation
  - expo-sharing
### Change
  - Splash screen translate X to exit
  - Change @ package name
### Fixed
  - chapter/chapter-list header height
  - Fix toggle lag in setting
### Fixme
  - Loading icon in Notification screen

## 0.0.4 (2022-4-2)
### Added
  - Goggle login
  - Add new home sessions
  - Lazy top tab
  - Nested Persists
### Change
  - NoNotifications layout animation

## 0.0.3
### Added
- FastImage
- MMKV
### Change
- Category icons
### Fixed
- Background fetch notifications check storage offline

## 0.0.2
### Added
- Sentry
- Background fetch notifications
- i18n
- Zoomable chapter view
### Change
- Infinity comic list

## 0.0.1
### Added
- Initial release
