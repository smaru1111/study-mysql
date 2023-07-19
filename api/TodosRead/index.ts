import { Context, HttpRequest } from "@azure/functions"

const httpTrigger = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Hello from TodosRead!"
    };
}

export default httpTrigger;