const express = require("express")
const bp = require("body-parser")
const app = express();
const db = require("./db.js")
const cors = require("cors")
const urlp = bp.urlencoded({ extended: true });

let corsOption = {
    origin: "*",
    optionSuccessStatus: 200,
    methods: "GET, POST"
}
app.use(cors(corsOption));

app.get("/status", async (req, res) => {
    res.send(`{"kode":"01","pesan": "API ExpressJS OK" }`)
})

app.get("/dataPropinsi", async (req, res)=>{
    const dtx = await db.getPropinsi();
    if(!dtx){
        res.send(
            {
                "kode":"0",
                "pesan": "Data Provinsi Tidak Ditemukan"
            }
        )
    }else{
        res.send(
            {
               "kode":"200",
                "pesan": "Data Provinsi Ditemukan" ,
                "data": JSON.stringify(dtx)
            }
        )
    }
})
app.post("/getSekolah", urlp , async (req, res)=>{
    const keyword =  req.body.keyword;
    const dtx = await db.getSekolah(keyword);
    if(!dtx){
        res.send(
            {
                "kode":"0",
                "pesan": "Data Sekolah Tidak Ditemukan"
            }
        )
    }else{
        res.send(`
            {
               "kode":"200",
                "pesan": "Data Sekolah Ditemukan",
                "data": ${JSON.stringify(dtx)}
            }
        `)
    }
})

const port = 8640
app.listen(port, () => {
    console.log(`API Berjalan Di Port: localhost:${port}`)
})
// module.exports = app;