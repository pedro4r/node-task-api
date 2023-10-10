import fs from 'fs';
import { parse } from 'csv-parse';
const filePath = new URL('../tasks.csv', import.meta.url)

export async function csvIterator() {
    const processFile = async () => {
        const records = [];
        const parser = fs
          .createReadStream(filePath)
          .pipe(parse())

        for await (const record of parser) {
          records.push(record);
        }
        return records;
      };

      (async () => {
        const records = await processFile();
        console.info(records);
      })();
}

csvIterator()







