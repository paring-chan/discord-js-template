# discord.js 템플릿
자바스크립트를 사용해서 봇을 만들 수 있는 템플릿입니다.

제스퍼님의 [강좌](https://github.com/Ukong0324/Discord-JS-Tutorial)를 참고하여 제작했습니다.

### 사용 방법
먼저 깃허브에서 Use this template 버튼을 눌러 템플릿으로 프로젝트를 생성해주세요.

```
git clone <생성한 레포 주소>
cd <레포이름>
npm install
.env.example 파일을 .env로 변경해주세요.
개발 - npm run dev/yarn dev
프로덕션 - npm start/yarn start
```

# dotenv 설정 방법
```
BOT_TOKEN=디스코드 봇 토큰 입력
```

### 명령어 제작 장법
commands 폴더에 `아무이름.commands.js`를 만들어주세요.

```js
//명령어.commands.js

async function ping(client, message, args, locale, prefix) {
    //코드
}
```
#### 명령어 파라미터 설명
```
client - 디스코드 봇 클라이언트 입니다.
message - 명령어를 실행할 때 사용한 메시지 입니다
args - 명령어를 제외한 텍스트를 스페이스 단위로 자른 배열입니다.
locale - locale 폴더의 kr.js 파일을 사용할 수 있습니다.
```

### 언어 변경 방법(예시)
```js
//src/index.js 7번줄
const lang = "kr" /* 이걸 바꿔주세요. */
```

```js
//src/locale/<언어>.js
module.exports = {
    example: "Example"
}
```

```js
//src/locale/index.js
module.exports = {
    언어코드: require('./<언어>.js')
}
```