import fs from 'node:fs/promises'
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, "utf8")
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search){
        let data = this.#database[table] ?? []
        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key]
                    .toLowerCase()
                    .includes(value.toLowerCase())
                })
            })
        }
        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist();
        return data
    }

    complete(table, id, completed){
        const rowIndex = this.#database[table]
        .findIndex(row => row.id === id)

        if(rowIndex > -1) {
            console.log(completed)
            if(completed === 'true') {
                this.#database[table][rowIndex].completed_at = new Date()
            }
            else {
                this.#database[table][rowIndex].completed_at = null
            }
            
            this.#persist()
        }
    }

    update(table, id, data){
        const rowIndex = this.#database[table]
        .findIndex(row => row.id === id)

        if(rowIndex > -1) {
            const existingRow = this.#database[table][rowIndex];
            const updatedRow = {
                ...existingRow,
                title: data.title,
                description: data.description,
                updated_at: data.updated_at
            };

            this.#database[table][rowIndex] = updatedRow;
            this.#persist()
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table]
        .findIndex(row => row.id === id)
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
    
}
