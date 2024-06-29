import { Duplex } from 'stream'

let count = 0;
const server = new Duplex({

    objectMode:true, //Faz não usar buffer, so que vai comer mais a memória.
    encoding:'utf-8',

    //são canais comunicação diferentes read e write no Duplex
    read(){
        const everySecond = (intervalContext) => {
            if(count++ <= 5){
                this.push(`My name is João [${count}]`)
                return;
            }
            clearInterval(intervalContext)
            this.push(null)
        }
        setInterval(function(){
            everySecond(this)
        })

    },
    //é como se fosse um objeto completamente diferente!
    write(chunk, enconding, cb){
        console.log(`writable`,chunk)
        cb()
    }
})


//o write aciona aciona o writable do Duplex o read aciona o stdout
server.write('[duplex] hey this is a writable!\n')

//on data _> loga oque rolou no .push no readble
server.on('data', msg => console.log(`[READBLE]${msg}`))

// o push deixa você enviar mais dados
server.push(`[duplex] hey this is also a readble!\n`)

// server
// .pipe(process.stdout)