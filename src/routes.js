import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            console.log(search)
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }
            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (req, res) => {
            
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
          
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {
          
        }
    }
]