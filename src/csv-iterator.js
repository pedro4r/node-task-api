import fs from 'fs';
import { parse } from 'csv-parse';
const filePath = new URL('../tasks.csv', import.meta.url)
import { randomUUID } from 'node:crypto'
import { database } from './routes.js';

export async function csvIterator() {
        const parser = fs
          .createReadStream(filePath)
          .pipe(parse())

        let index = 0
        for await (const record of parser) {
          if(index !== 0) {
            const [title, description] = record
            database.insert('tasks', {
              id: randomUUID(),
              title,
              description,
              completed_at: null,
              created_at: new Date(),
              updated_at: new Date()
            })
          }
          index++
        }
}








