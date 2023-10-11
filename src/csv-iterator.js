import fs from 'fs';
import { parse } from 'csv-parse';
const filePath = new URL('../tasks.csv', import.meta.url)
import { randomUUID } from 'node:crypto'
import { database } from './routes.js';

export async function csvIterator() {
        const parser = fs
          .createReadStream(filePath)
          .pipe(parse({
            delimiter: ',',
            skipEmptyLines: true,
            fromLine: 2
          }))

        for await (const record of parser) {
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
}

await csvIterator()