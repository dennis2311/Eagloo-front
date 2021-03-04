# Eagloo-front
- 앱 설명..

## Commands
```bash
# 로컬에서 개발환경 모드로 실행.
yarn start

# 실제 운영에서의 프로덕션 모드로 실행.
yarn build
```


## Structure
```
eagloo-front
│
│
├─public
│      eaglooicon-fat.ico
│      eaglooicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
│      _redirects
│
└─src
    │  index.js
    │  logo.svg
    │
    ├─Component
    │  ├─Banner
    │  │      MainBanner.js
    │  │
    │  ├─Calendar
    │  │      Calendar.js
    │  │      CalendarBody.js
    │  │      CalendarHead.js
    │  │
    │  ├─Chatting
    │  │      Chatting.js
    │  │      ChattingBody.js
    │  │      ChattingContent.js
    │  │      ChattingFoot.js
    │  │
    │  ├─Dialog
    │  │      FeedbackDialog.js
    │  │
    │  ├─Header
    │  │      CommonHeader.js
    │  │      Header.js
    │  │      MainHeader.js
    │  │      NoticeHeader.js
    │  │      SubHeader.js
    │  │      UserHeader.js
    │  │
    │  ├─Link
    │  │      ForumLink.js
    │  │      RoomLink.js
    │  │      YonseiLink.js
    │  │
    │  ├─Scheduler
    │  │      ScheduleEach.js
    │  │      Scheduler.js
    │  │      SchedulerBody.js
    │  │      SchedulerError.js
    │  │      SchedulerFoot.js
    │  │      SchedulerHead.js
    │  │
    │  └─StyledComponent
    │          button.js
    │          div.js
    │
    ├─Page
    │  │  About.js
    │  │  Login.js
    │  │  Room.js
    │  │  SignUp.js
    │  │  WrongPath.js
    │  │
    │  ├─Forum
    │  │      Forum.js
    │  │      ForumBody.js
    │  │      ForumFoot.js
    │  │      ForumHead.js
    │  │      MainthreadEach.js
    │  │      SubthreadEach.js
    │  │
    │  ├─Lobby
    │  │      Lobby.js
    │  │
    │  └─PublicRoom
    │          PeerSpaceEach.js
    │          PublicRoom.js
    │          UserSpace.js
    │
    ├─resource
    │  └─img
    │          calendar-sample.jpg
    │          header-icon.png
    │          login-icon.png
    │          main-banner-left.png
    │          main-banner-right.png
    │          peer-offline.gif
    │
    ├─Router
    │      App.js
    │      CommonRouter.js
    │      UserRouter.js
    │
    ├─Service
    │      Socket.js
    │
    ├─Style
    │  │  GlobalStyles.js
    │  │  Theme.js
    │  │
    │  └─fonts
    │          fonts.css
    │          JejuGothic.ttf
    │          SDSamliphopangcheTTFBasic.ttf
    │
    └─Util
            CollegeNameConverter.js
            server.js
            ToastMessages.js

```
