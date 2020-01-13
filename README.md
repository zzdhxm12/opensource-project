# To do list
Vue.js - To do list

## 개요
일정 관리 프로그램은 업무 생산성을 높이고자하는 실무자들뿐만 아니라 일상적인 일정을 관리하기 위하여도 많이 사용된다. 구글 플레이에서 일정 이라는 키워드로 검색을 하여 나오는 관련 어플리케이션이 251개 이상 된다. 그러나 이러한 어플리케이션을 사용하기 위해서는 반드시 설치를 하여야한다. 이는 사용자가 어플리케이션을 설치하고 사용하기에 접근성을 떨어뜨릴 수 있다. 그렇기에 Progressive Web App을 사용하여 웹에서 어플리케이션처럼 사용이 가능하고 설치 또한 가능한 일정 관리 어플리케이션을 만들고자 하였다. 해당 기능으로는 할 일 추가, 할 일 수정, 할 일 삭제, 할 일 조회 등이 있다. 카카오톡 플러스친구를 활용하여 사용에 불편함이 있을 시 관리자에게 문의할 수 있으며 모바일에서 디바이스를 제어하여 사용이 편하도록 하였다. 그 외에도 날씨를 지원하거나 모바일과 웹에서 모두 자연스럽게 사용이 가능하도록 디자인 하였다. 즉, 보다 사용자가 쉽게 접할 수 있는 다양한 기능을 제공하는 일정 관리 어플리케이션을 만드는 것이 본 프로젝트의 목적이다.

## 기능 리스트

### 1. App설치 및 Splash Screen 노출 - firebase

호스팅을 해둔 사이트(https://osp18-sun-1.firebaseapp.com/)에 모바일을 통하여 접속하면 홈 화면에 추가라는 창을 확인 할 수 있다. 추가를 누르게 되면 ToDo의 어플리케이션이 설치가 완료된다. 이 어플리케이션을 실행하면 Splash Screen이 출력된다.

![image](https://user-images.githubusercontent.com/53864655/72239401-4dc99300-3624-11ea-9cf2-6f08922a18de.png)

### 2. 추가

input 입력창에 입력값을 입력한 뒤 엔터버튼이나 + 모양의 버튼을 클릭하여 할 일 목록을 추가한다.

![image](https://user-images.githubusercontent.com/53864655/72239418-5ae68200-3624-11ea-8c16-17be693cdc4f.png)

### 3. 삭제

할 일 목록의 개별 삭제를 지원하며 추가적으로 전체 삭제, 상태 별 삭제를 지원한다.

![image](https://user-images.githubusercontent.com/53864655/72239433-65a11700-3624-11ea-877d-08b0ae765a4c.png)

### 4. 조회

할 일을 상태별, 카테고리 별로 조회가 가능하다. 

![image](https://user-images.githubusercontent.com/53864655/72239446-705bac00-3624-11ea-95c5-bec79d65b338.png)

### 5. 수정

수정 버튼을 누르게 되면 모달 창이 생성된다. 모달창에 수정 및 추가 입력할 정보를 기입하고 추가를 하여준다. 모달창은 스크롤이 가능하여 아래에 숨겨진 페이지를 모두 확인할 수 있다. 수정이 완료되면 변경된 정보를 확인할 수 있다.

![image](https://user-images.githubusercontent.com/53864655/72239468-7f425e80-3624-11ea-8dc7-55ae45ec6cce.png)

### 6. 상세 정보 추가

contents이외에 list에 필요한 내용과 기한을 추가 입력 가능하도록 하는 기능이다. 상세 정보 추가는 먼저 list를 추가한 다음 수정버튼을 통해서 추가할 수 있게 된다. 수정버튼을 클릭하게 되면 contents 이외에 list에 필요한 추가 설명을 기입할 수도 있고 기한을 설정할 수 있게 된다(상태나 카테고리 설정 또한 가능). 기한 설정은 vue에서 제공하는 datePicker 위젯을 사용하여 date input 창을 클릭하면 달력이 나오고 기한으로 할 날짜를 클릭하게 되면 input창에 사용자가 지정한 ‘yy/mm/dd’와 같은 형식으로 input창에 입력되게 된다.

![image](https://user-images.githubusercontent.com/53864655/72239521-9da85a00-3624-11ea-8a61-c71132e8b90b.png)

### 7. 완료 마킹
카테고리 버튼 왼쪽의 체크 버튼을 클릭하면 할 일의 상태가 Todo→Doing→Done→Todo.. 순으로 변한다. 이와 같은 기능에 대한 함수는 store.js의 mutation과 action에 doneTodo로 정의 되어있으며, mutation에서는 클릭된 할 일의 로컬 데이터의 상태를 변경한다. action에서는 먼저 mutation이 호출되었기 때문에 로컬의 상태 데이터는 변경된 상태이므로 변경된 상태를 데이터베이스의 상태로 update한다.

![image](https://user-images.githubusercontent.com/53864655/72239534-a731c200-3624-11ea-8f69-0661a7af150a.png)

### 8. 뱃지

할 일의 상태 별로 존재하는 목록 개수를 뱃지를 통해 시각화한다. 추가, 수정, 삭제의 기능이 수행될 경우 store.js안에서 mutation의 추가, 수정, 삭제 함수 안에서 로컬에서 각 상태 별 뱃지의 수를 수정하였다. 데이터베이스를 연동한 뒤에는 store.js안에서 action의 getTodos 함수를 통해 변동이 일어날 때마다 mutaion의 countTodo 함수로 부터 데이터베이스에서 각 할 일에서 상태를 가져와 개수를 알아온 뒤 출력하였다.

![image](https://user-images.githubusercontent.com/53864655/72239549-b1ec5700-3624-11ea-87ec-0a4770412acc.png)

### 9. 카테고리 설정

list 별로 장소에 따른 카테고리를 설정할 수 있도록 하였다. 처음에 list를 등록한 후 수정 버튼을 통해 카테고리를 설정할 수 있는데 카테고리를 사용자 임의로 추가하지 않았을 경우 기본적으로 All, Business, Home, School과 같은 카테고리를 제공해주게 된다. 만약 기본적으로 제공하는 카테고리 이외에 사용자가 필요로 하는 카테고리가 있는 경우  카테고리 설정 모달에서 추가 버튼을 누르면 카테고리를 추가할 수 있게 된다. 만약 추가하려고 하는 카테고리와 같은 이름의 카테고리가 존재하면 추가되지 않도록 하고 쓰지 않는 카테고리가 있다면 삭제할 수 있도록 하였다. 하지만 기본 카테고리를 삭제할 수 없도록 하였다. Session Storage와 같은 저장소인 Cookie를 사용하여 카테고리의 추가와 삭제를 할 수 있도록 하였는데 Cookie는 사용자의 설정 일수 만큼 저장할 수 있기 때문에 추가는 설정 일수를 3일로 정하였고 삭제를 할 경우에는 설정 일수를 0으로 지정하여 바로 삭제되도록 구현하였다. 이렇게 카테고리를 지정하게 되면 해당 리스트의 앞부분에 카테고리 tag를 붙여 해당 리스트의 카테고리를 직관적으로 볼 수 있도록 하였다. 

![image](https://user-images.githubusercontent.com/53864655/72239565-badd2880-3624-11ea-824f-28c8b793a247.png)

### 10. 필터링 (상태,카테고리)

* 상태 별 필터링

TodoNavbar.vue에서 사용자가 필터링 할 상태에 대해 commit을 통해 선택된 데이터를 store.js로 넘겨주고, store.js의 mutation에서 selectCondition 함수를 통해 로컬의 selectcondition 데이터가 선택된 상태로 변경된다. 여기서 변경된 상태를 TodoList.vue에서 받아와 v-if문을 이용하여 필터링한다.

* 카테고리 별 필터링

TodoNavbar.vue에서 사용자가 필터링 할 카테고리에 대해 commit을 통해 선택된 데이터를 store.js로 넘겨주고, store.js의 mutation에서 selectCategory 함수를 통해 로컬의 selectcategory 데이터가 선택된 상태로 변경된다. 여기서 변경된 상태를 TodoList.vue에서 받아와 v-if문을 이용하여 필터링한다.

### 11. 테마

사용자가 테마를 선택하게 되면 TodoNavbar.vue에서 선택된 테마를 commit을 통해 store.js로 넘겨준다. store.js에서는 받은 데이터를 mutation의 changeThema 함수로 넘긴다. changeThema 함수 에서는 로컬의 테마 데이터를 선택된 테마의 데이터로 변경한다. 이때, 변경된 데이터는 TodoList.vue의 뱃지와 TodoHeader.vue의 날짜 및 시간 , 로그아웃, Device feature 버튼에도 적용된다. 

![image](https://user-images.githubusercontent.com/53864655/72239576-ca5c7180-3624-11ea-860f-a605cca336ab.png)

### 12. 검색

할 일 검색에서 입력 값을 받아 해당 입력 값을 포함하는 할 일을 찾는다. 할 일 제목 뿐만이 아니라 상세 내용, 날짜 또한 함께 검색이 가능하다. 해당 코드는 TodoNavbar.vue에서 <b-form-input> 태그를 통해 @input 이벤트를 통해 searchTodo를 실행한다. searchTodo 함수에서는 store.js 로 입력한 키워드를 commit으로, this.$store.commit 하여 값을 ‘searchTodo’로 전송한다. store.js에서의 searchTodo는 store 내부의 searchKeyword의 값을 입력받은 value의 값으로 입력해준다. 그리고 TodoList.vue에서 getSearchKeyword를 통해 computed: 내의 searchKeyword 함수를 통해 변경사항을 자동으로 받아와 v-if를 통해 출력 사항을 수정하여 출력하여준다. 또한 웹 검색 기능에서는 TodoNavbar.vue에서 webSearchTodo 함수를 통하여 실행하는데 이는 url을 'https://www.google.com/search?q=' 뒤에 키워드를 붙혀 window.open을 통해 url을 열어주는 식으로 새 창에서 구글 검색으로 연결하여준다.

![image](https://user-images.githubusercontent.com/53864655/72239592-d5af9d00-3624-11ea-8eb2-a75c14b888a7.png)

### 13. 전체 삭제

모든 list를 지우는 Clear All 버튼에서 상태별로 그룹을 나누어 해당 상태의 리스트만을 Clear All 할 수 있는 기능이다. 기존과는 다르게 Clear All 버튼을 클릭했을 때 Modal창을 띄워 All, Todo, Doing, Done과 같이 상태별로 버튼을 나누어 두었다. All 버튼을 클릭하면 상태와 상관없이 모든 리스트들을 지워주고, 나머지는 선택한 버튼의 상태와 같은 리스트만을 지우도록 하였다. 

### 14. 날짜 경고

Due date의 경고기능은 해당 일정에 등록한 날짜와 현재 날짜를 비교하여 색과 중앙선으로 구분하여주는 기능이다. 본 경고 기능은 TodoList.vue 의 checkDay 함수를 통해 날짜를 확인하며 class를 달리 주어 색을 다르게 표시한다. 이 checkDay 함수는 할 일의 date를 넘겨주어 현재 날짜와 비교하는데 마감 일에서 현재 일을 빼준 후 그 값에 1을 더해서 return 한다. 1을 더하는 이유는 00시에서 넘어가게 되면 소수점이 생기는데 int 형으로 만들 시 우리가 세는 날짜보다 1일 적은 값이 만들어지기 때문에 1을 더하여서 return 해준다. 이 반환된 값으로 만료되었는지 1 ~ 2일인지, 3 ~ 5일인지 혹은 그보다 많이 남았는지를 판단하여 각 빨간색과 중앙선, 빨간색, 청록색, 검은색으로 표시한다.

![image](https://user-images.githubusercontent.com/53864655/72239617-e5c77c80-3624-11ea-8e69-68206efe95e1.png)

### 15. VueX

VueX를 store.js에서 만들어 데이터를 관리, 제어해주었다. state에서 각 저장되는 data들을 정해주었다. 또한 이에 대한 접근을 위하여 getter들을 만들어 접근이 가능하도록 열어주었다. 그리고 mutation에서 기존 vue에서 다루던 Props/Event 방식에서 store.js에서 모두 관리하는 Vuex방식으로 변화시켰는데 이 때 기존에 쓰였던 함수들을 Vuex에 맞게 변형시켜주었다. 한편, action 부분에서 비동기적으로 실행하여야하는 함수들을 만들어 사용하였다. 그 예로 로그인, 데이터베이스 관련 함수들이 있다.

![image](https://user-images.githubusercontent.com/53864655/72239624-efe97b00-3624-11ea-9e73-46a02e0f89ea.png)

### 16. 사용자 인증 (Auth)

사용자 계정에 맞는 정보를 제공하고 보안하기 위해서 사용자 인증 시나리오를 구현하였다. 사용자 인증을 하는 방법에는 이메일/비밀번호 계정을 등록한 후 로그인 할 수도 있고 Google, Facebook, Github과 연동하여 로그인을 할 수도 있도록 구현하였다. 먼저 이메일/비밀번호로 로그인 하는 방법은 우선 a new account를 클릭하면 이메일과 비밀번호를 등록할 수 있는 Sign up 페이지로 이동하게 된다. 그 페이지에서 사용할 이메일과 비밀번호를 등록하여 주면 firebase auth에 createUserWithEmailAndPassword를 사용하여 만든 이메일과 비밀번호를 저장하게 된다. 그 후 다시 로그인 페이지로 넘어와서 등록한 이메일과 비밀번호를 치면 사용자 인증이 되어 자신의 계정의 list 들을 볼 수 있게 된다. Google과 Facebook, Github 로그인은 AuthProvider를 통해 각각의 auth 로그인 폼을 정해준다. 그 다음 로그인 버튼을 킅릭하게 되면 signInWithPopup을 이용하여 해당 auth 로그인 폼을 팝업 창으로 띄워주게 된다. 

![image](https://user-images.githubusercontent.com/53864655/72239638-faa41000-3624-11ea-89c2-117645ef1bb6.png)

### 17. 3rd Party 서비스 연동

* 카카오톡(Kakao Talk)

카카오톡의 javascript에서 지원하는 로그인 기능과 플러스친구 기능을 사용하였다. 우측 하단의 카카오톡 버튼을 누르면 카카오톡 로그인 창이 나타난다. 로그인을 완료하면 카카오톡으로 플러스친구와 채팅을 시작한다. 해당 플러스친구에서는 관리자에게 직접 문의와 스마트 채팅을 이용한 도움말을 지원한다. 이를 구현하기 위하여 vue-kakao-login 모듈과 vue-kakao-pf 모듈을 사용하였다. 이 두 모듈은 카카오에서 지원하는 javascript API를 사용하기 편하도록 구현해둔 모듈이다.

![image](https://user-images.githubusercontent.com/53864655/72239656-0d1e4980-3625-11ea-9905-e2c7c1600983.png)

* 오픈웨더(Open Weather)

![image](https://user-images.githubusercontent.com/53864655/72239665-14ddee00-3625-11ea-85a8-1a887f88ec22.png)

오픈 웨더 API를 사용하여 해당 지역의 기상 정보를 받아와 사용자에게 제공한다. 사용자의 지역에 대한 정보를 제공하기 위하여 vue-browser-geolocation 모델을 이용하여 GPS의 위치 정보를 받아온다. 받아온 경도와 위도를 오픈 웨더 API에 입력하여 json 형태로 기상 정보를 받아온다. 받아온 정보를 저장한 뒤 사용자에게 제공한다. 사용자는 LogOut 버튼 아래의 Weather 버튼을 누르면 GPS 사용 동의 창을 거친 후 위치정보를 받아와 오픈 웨더로 보내고 기상정보를 받아와 출력하는 형식이다. 그 후 기상 정보를 사용자에게 제공한다.

### 18. Database 연동

Firebase 데이터베이스 중 Firestore와 Vue 프로젝트를 연동하여 사용자의 할 일 목록을 관리 한다. Vue 프로젝트와 연동 할 Firebase 프로젝트를 생성하고, 생성된 Firebase 프로젝트의 웹 연동 정보를 Vue 프로젝트 db.js 파일에 저장한다. 또한, db.js 파일에는 Firebase 프로젝트의 데이터베이스 중 “todos” 컬렉션을 dbRef 변수로 저장하여 Vue 파일에서 Firebase 프로젝트 데이터베이스의 "todos" 컬렉션을 직접 관리 할 수 있도록 한다. 원래 Vue 프로젝트의 기본적인 할 일 관리인 추가, 조회, 삭제 기능을 구현하기 위하여 데이터베이스가 변하는 것을 비동기적으로 처리하기 위해 store.js 파일에서 action 아래에 함수들을 구현하였다. 이를 통해, 원래 commit으로 함수를 처리하였는데 dispatch를 통해 함수를 처리하도록 하였다. 기능 구현에 있어서는 변화가 있을 때 마다 로컬의 할 일 목록을 전체적으로 삭제하여 화면을 비움과 동시에 데이터베이스의 정보를 다시 불러와 로컬에 저장시킴으로써 즉각적으로 변화되는 데이터베이스를 조회할 수 있도록 한다. 추가, 삭제, 수정의 기능은 Firebase 데이터베이스 API를 사용하여 구현하였다. 추가는 set 함수, 삭제는 delete 함수와 기본 과제에서 수행하였던 상태 별 삭제를 구현하기 위하여 where 함수를 사용하여 데이터베이스에 저장된 할 일들의 상태에 따라 삭제 할 데이터를 불러와 삭제 하였다. 또한, 수정 기능은 API 중 update 함수를 사용하여 부분적으로 수정된 부분만 업데이트 되어 저장되도록 하였다. 
사용자에게 각자 계정에 맞는 정보를 제공하기 위하여 데이터 입력 시 Firebase 데이터베이스에 계정을 함께 저장한다. 그 후 받아온 정보를 출력할 때 현재 로그인한 계정과 받아온 목록의 계정이 같은가 확인하여 같다면 v-if를 통하여 리스트를 출력한다. 마찬가지로 목록을 삭제할 때 현재 접속한 계정과 해당 아이템의 계정이 같은가 비교하여 삭제를 진행한다. 이를 통해 각 계정에 개인에 맞는 정보를 제공한다.

* 추가

![image](https://user-images.githubusercontent.com/53864655/72239864-b107f500-3625-11ea-8ac2-3d2f56eb6a62.png)

* 삭제

![image](https://user-images.githubusercontent.com/53864655/72239837-9f265200-3625-11ea-87b8-d4598c96d6fd.png)

* 수정

![image](https://user-images.githubusercontent.com/53864655/72239850-a8afba00-3625-11ea-8fb7-aca2db527489.png)

* 개인화 (로그인 주소 이용)

![image](https://user-images.githubusercontent.com/53864655/72239730-4e165e00-3625-11ea-804d-e7b2c0c4b6f0.png)

### 19. Device Feature

* Full/UnFull

화면에 불필요한 요소들은 빼고 할 일 리스트만 볼 수 있도록 전체화면을 설정을 할 수 있는 기능이다. https://whatwebcando.today에서 Screen&Output의 FULLSCREEN을 참고하였다. 우선 TodoHeader.vue에 full 버튼과 unfull 만들고 unfull 버튼은 display를 none으로 지정해 준다. full 버튼이 클릭되면 발생되는 startFull 함수에 참고한 자바스크립트 코드를 추가해주었다. full 버튼이 클릭되게 되면 goFullscreenHandler가 발생하여 전체화면모드로 전환되며 Unfull 버튼이 화면에 보여지게 된다. 다시 전체화면모드에서 기본화면모드로 돌아가기 위해서는 unfull 버튼을 클릭하게 되면 exitFullScreen을 통해 기본 화면으로 돌아오며 unfull 버튼은 다시 display none 으로 지정되어 보이지 않게 된다. 

![image](https://user-images.githubusercontent.com/53864655/72239687-28895480-3625-11ea-99c5-6ffc6b8155d3.png)

* Lock/Unlock

화면의 가로모드와 세로모드를 고정시킬 수 있도록 하는 화면 잠금 기능이다. https://whatwebcando.today에서 Screen&Output의 SCREEN ORIENTATION&LOCK을 참고하였다. 먼저 Full/UnFull과 마찬가지로 TodoHeader.vue에 lock버튼과 unlock 버튼을 만들고 unlock 버튼은 display를 none으로 지정하여 화면상에는 보여지지 않게 된다. 여기서 lock 버튼을 클릭하면 발생되는 lockscreen 함수에 자바스크립트 코드를 추가하였다. 다음 lock 기능을 사용하기 위해서 자신이 원하는 화면 type에 맞춰 lock 버튼을 클릭하게 되면 전체화면모드로 바뀌고 unlock 버튼의 display가 inline-block으로 화면에 나타나는 반면에 lock 버튼의 display가 none으로 보여지지 않게 된다. 또한 lock을 건 화면이 가로모드라면 가로는 180px, 세로는 100px로 고정되고 세로모드라면 가로는 100px, 세로는 180px로 고정되게 된다. 다시 unlock버튼을 누르면 기본화면모드로 바뀌고 lock버튼이 보여지게 되며 화면 lock이 풀리게 된다. 

![image](https://user-images.githubusercontent.com/53864655/72239693-32ab5300-3625-11ea-9955-ede976faaf49.png)

* Battery/State/Network/Memory

현재의 상태를 보여주는 기능들이다. https://whatwebcando.today의 Device feature를 참고하였다. TodoHeader.vue에 battery 버튼을 생성하여 클릭하게 되면 진동이 울리면서 alert로 간단하게 현재 배터리 상태를 보여주도록 하였다. 이와 마찬가지로 state/network/memory버튼도 추가하여 alert기능으로 online/offline, 네트워크 상태, memory를 보여주도록 하였다.

![image](https://user-images.githubusercontent.com/53864655/72239712-3c34bb00-3625-11ea-9a5a-4df3fc268874.png)

* Copy & Mail

현재 로그인한 계정의 이메일을 상단에 표시하고 그 이메일을 클릭하면 메일을 보낼 수 있고 copy 버튼을 클릭하면 현재 계정의 이메일을 복사할 수 있도록 하였다. https://whatwebcando.today에서 Input의 CLIPBOARD(COPY&PASTE)를 참고하였다. copy버튼을 클릭했을 때 copyemail 함수를 발생시켜 clipboard.writeText를 통해 이메일을 복사할 수 있다.

![image](https://user-images.githubusercontent.com/53864655/72240061-486d4800-3626-11ea-9480-ece0487e3b8b.png)
