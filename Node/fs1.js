const http = require('http')
http.createServer((req,res)=>{
    res.write("HTTP request resolve")
    res.end()
}).listen(4000)