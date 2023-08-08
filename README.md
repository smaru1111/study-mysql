# Azure FunctionsとAzure Database for mysqlでCRUD処理実装
## 概要
CRUD処理練習用に作ったTodoアプリです！

## 使用技術
- React ( typescript )
- Azure Static Web App
- Azure Functions(swa内包・nodejs typescript)
- Azure Database for MySQL
- Azure Data Studioで管理

## 環境構築
api直下にSSH keyと、DBの接続情報を持っておくためのlocal.settings.jsonが必要。

参考サイト：https://learn.microsoft.com/ja-jp/azure/mysql/flexible-server/connect-nodejs?tabs=windows

```
git clone https://github.com/smaru1111/study-mysql

npm i
cd api

npm i
npm start // swa内包functionを7071で立ち上げる

// 別のターミナル開いて(/study-mysql直下で)
swa start --api-location http://localhost:7071
```

functionsのトリガー変更したらapiディレクトリから`npm run build`しないと、distに更新かからない。
ので、functionの内容変更したら、その都度`npm start`し直す。

