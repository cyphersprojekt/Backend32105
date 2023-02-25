/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { serve } from "https://deno.land/std@0.159.0/http/server.ts";

const port = 8080;
const tasks: string[] = [];

function getRandomColor(max: number): string {
    return `#${Math.floor(Math.random() * max)}`
}

function renderTasks(): string {
    let output = '';
    tasks.forEach((task) => {
        output = output + `<li style="color: ${getRandomColor(999999)}"> ${task}</li>`
    })

    const html = `
    <html>
        <style>
            body {
                background-color: ${getRandomColor(999999)};
                color: white;
            }
        </style>
        
        <body>
            <h1> TSX To-do </h1>
            <h2> Add a new task </h2>
            <form method="POST" action="/" id="newTaskForm">
                <label for="task">Create a new task down below 👇 </label><br>
                <input type="text" name="task"></input>
            </form>
            <br>

            <ul>
                ${output}
            </ul>
        </body>
    </html>`

    return html
}

async function handler(req: Request): Promise<Response> {
    if (req.method == "POST") {
        const body = await req.text()
        console.log(body)
        const taskIn = body.split("=")[1];
        tasks.push(taskIn)
        console.log(tasks)
    }

    return new Response(renderTasks(),
        {
            headers: {
                "content-type": "text/html; charset=UTF-8",
            }
        }
    )
}

await serve(handler, {port});