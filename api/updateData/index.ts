import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { type } from "os";
const mysql = require('mysql2/promise');
const fs = require('fs');

type TodoContent = {
    id: string;
    title: string;
    complete: boolean;
};

async function updateData(todoContent: TodoContent) {
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
        // データ更新
        const [rows, fields] = await connection.execute("UPDATE todos SET title = ?, complete = ? WHERE id = ?", [todoContent.title, todoContent.complete, todoContent.id]);
        const data = JSON.stringify(rows);
        console.log("update data");
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
    try {
        context.log('JavaScript HTTP trigger function processed a request.');
        // if((req.query.id && req.query.title && req.query.complete) || (req.body && req.body.id && req.body.title && req.body.complete)) {
        const todoContent: TodoContent = {
            id: req.query.id || (req.body && req.body.id),
            title: req.query.title || (req.body && req.body.title),
            complete: req.query.complete || (req.body && req.body.complete)
        };
        context.log("id: " + todoContent.id);
        // updateData関数でデータを更新
        await updateData(todoContent);

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