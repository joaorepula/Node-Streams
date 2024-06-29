import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'
//fonte de dados
const readable = Readable({
    read(){
        //for é bloqueante, normalmente é mais lento.
        for(let index = 0; index < 1e7; index++){
            const person = {id: Date.now() + index, name: `João ${index}`}
            const data = JSON.stringify(person)
            this.push(data)
        }
        //O null informa que acabou! 
        this.push(null)
    }
})

// processamento dos dados

const mapHeader = Transform({
    transform(chunk, enconding, cb){
        this.counter = this.counter ?? 0;

        if(this.counter){
            return cb(null, chunk)
        }
        this.counter += 1
        cb(null,"id,name\n".concat(chunk)) 
    }
})


const mapFields = Transform({
    transform(chunk, enconding, cb){
        const data = JSON.parse(chunk)
        const result = `${data.id},${data.name},${data.name.toUpperCase()}\n}`
        cb(null,result)
    }
})

const writable = Writable({
    write(chunk, enconding, cb){
        console.log('msg',chunk.toString())
        cb()
    }
})

const pipeline = readable
    //Mapeando os dados conforme eles chegam, se tiver uma linha ele já cai aqui e vai processando
    .pipe(mapFields)
    .pipe(mapHeader)
    //writable sempre é a saida -> imprimir, salvar ou ignorar
    //.pipe(process.stdout)
    .pipe(createWriteStream('my.csv'))

    pipeline.on('end', () => console.log('acabou'))