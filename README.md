# nuxt-firebase

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Firebase data setting

```plugins/firebase.js
//省略
    apiKey: "YourCode",
    authDomain: "YourCode",
    databaseURL: "YourCode",
    projectId: "YourCode",
    storageBucket: "YourCode",
    messagingSenderId: "YourCode",
    appId: "YourCode",
    measurementId: "YourCode"
//省略
```
※各自のFirebaseアプリの情報に差し替え

↓　ここから下は各コードの説明になります。
## Recipe for how to make a project

### Create Nuxt App

```bash
$ npx create-nuxt-app <project-name>
```
※いろいろ聞かれる思いますが、基本はNoneで今回はnpmにしています
Yarnを使いたい場合はそこでご指定ください。

Firebase管理画面から新規プロジェクト作成
各種設定
- firestore database
- アプリ APIキー等の取得に必要
- Authentication メール認証 有効

firebase　イニシャライズ設定

```bash
npm install firebase --save

# インストールしてる人は飛ばしてOK
npm install -g firebase-tools

# Firebaseと連携しているGoogleアカウントでログイン
firebase login

firebase init

	◯ Firestore: Deploy rules and create indexes for Firestore

	❯ Use an existing project 

# 残りそのままEnter
```

### コード側でFirebase設定

```js:plugins/firebase.js
import firebase from 'firebase';

// YourCodeの部分に先ほどアプリで取得したキーを入れる
const firebaseConfig = {
    apiKey: "YourCode",
    authDomain: "YourCode",
    databaseURL: "YourCode",
    projectId: "YourCode",
    storageBucket: "YourCode",
    messagingSenderId: "YourCode",
    appId: "YourCode",
    measurementId: "YourCode"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
```

```js:nuxt.config.js
// 省略
plugins: [
	'~/plugins/firebase',
],
// 省略
```

### 各種コンポーネント作成

#### AppNavigation.vueの実装
ここではSignin.vue、Signup.vueを入れたルーティングコンポーネントにしています。
【現状の使い方】
認証の必要のないpages/index.vueへの埋め込み用

```vue:components/AppNavigation.vue
<template>
  <nav>
    <ul class="navigation">
      <li><nuxt-link to="/signup">Sign Up</nuxt-link></li>
      <li><nuxt-link to="/signin">Sign In</nuxt-link></li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
```

#### default.vueの実装
こちらは共通のコンポーネントです。
基本はいじらないファイルです。

```vue:layouts/default.vue
<template>
  <div class="container">
    <header>
      <nuxt-link to="/">Nuxt.js & Firebase</nuxt-link>
    </header>
    <main>
      <nuxt />
    </main>
    <footer class="footer">
        ©︎2020 Nuxt
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>
  
<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  ul li {
    display: inline-block;
    list-style: none;
  }
</style>

```

### 各種pagesの実装

#### index.vue
Topページ　認証なし

```vue:pages/index.vue
<template>
  <div class="index">
    <h2>Index</h2>
    <AppNavigtion />
  </div>
</template>

<script>
  import AppNavigtion from '~/components/AppNavigation.vue';

  export default {
      name: 'Index',
      components: { AppNavigtion },
  }
</script>

<style scoped>
  ul li {
    display: inline-block;
  }
</style>
```

#### Signin.vue
サインイン画面　認証なし

```vue:pages/Signin.vue
<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>
      You don't have an account? 
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          alert('Success!');
          this.$router.push('/Hello');
        },
        err => {
          alert(err.message);
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
```

#### Signup.vue
サインアップ画面　認証なし

```vue:pages/Signup.vue
<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signUp">Register</button>
    <p>Do you have an account? 
    <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert('Create account: ', user.email);
          this.$router.push('/Sighin');
        })
        .catch(error => {
          alert(error.message);
        })
    }
  }
}
</script>

<style scoped>

</style>
```

#### Hello.vue
サインイン後遷移する画面　認証あり

```vue:pages/Hello.vue
<template>
  <div class="hello">
    <h1>Hello {{ name }}!!</h1>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Hello',
  data () {
    return {
      name: firebase.auth().currentUser.email,
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/Signin');
      })
    }
  }
}
</script>

<style scoped>

</style>
```