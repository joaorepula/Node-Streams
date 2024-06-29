import { Readable, Writable } from 'stream'

//fonte de dados
const readable = Readable({
    read(){
        this.push('Hello World')
        this.push('Hello World')
        this.push('Hello World')

        //O null informa que acabou! 
        this.push(null)
    }
})

const writable = Writable({
    write(chunk, enconding, cb){
        console.log('msg',chunk.toString())
        cb()
    }
})

readable
    //writable sempre é a saida -> imprimir, salvar ou ignorar
    .pipe(writable)