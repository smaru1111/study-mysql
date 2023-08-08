import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const mysql = require('mysql2/promise');
const fs = require('fs');

async function addData(title: string) {
    try {
        var config =
        {
            host: process.env['MYSQL_HOST'],
            user: process.env['MYSQL_USER'],
            password: process.env['MYSQL_PASSWORD'],
            database: process.env['MYSQL_DATABASE'],
            port: process.env['MYSQL_PORT'],
            ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
        };
        
        const connection = await mysql.createConnection(config);
        // コネクション確立
        console.log('coneted');
        // データ取得
        const [rows, fields] = await connection.execute("INSERT INTO todos (title) VALUES (?)", [title]);
        const data = JSON.stringify(rows);
        console.log("add data");
        // コネクションを閉じる
        connection.end();
        return data;
    }
    catch (err) {
        // エラーが発生した場合の処理
        console.log('error :', err.message);
        throw err; // エラーを再スローして呼び出し元に伝える
    }
};


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        context.log('JavaScript HTTP trigger function processed a request.');
        const title = req.query.title || (req.body && req.body.title);
        context.log("title: " + title);
        await addData(title);

        context.res = {
            // response 200 ok
            status: 200,
            body: "ok"
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
};

export default httpTrigger;