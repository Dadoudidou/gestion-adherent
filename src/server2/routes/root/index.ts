import { Request, ResponseToolkit } from "hapi";


const handler = async ( request: Request, h: ResponseToolkit ) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="icon" type="image/png" href="/assets/favicon.ico" />
        <link href="/static/css/client.css" rel="stylesheet" />
    </head>
    <body>
        <div id="root"></div>
        <script src="/static/js/vendor.js"></script>
        <script src="/static/js/client.js"></script>
    </body>
    </html>
    `;
}

export default handler;