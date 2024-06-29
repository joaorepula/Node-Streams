//node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"


//node -e process.stdout.write(crypto.randomBytes(1e9)) > big.file

import http from 'http'
import { createReadStream, readFileSync } from 'fs'

/*
Jeito errado
http.createServer((req,res) => {
    //Pega o buffer inteiro e joga em memória
    const file = readFileSync('big.file').toString()
    res.write(file)
    res.end()
//curl localhost:3000 -o output.txt

}).listen(3000, () => console.log('running at 3000'))*/


http.createServer((req,res) => {
    createReadStream('big.file')
        .pipe(res)
    const file = readFileSync('big.file').toString()
    res.write(file)
    res.end()
//curl localhost:3000 -o output.txt

}).listen(3000, () => console.log('running at 3000'))