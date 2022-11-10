const Router = require('express');
const router = Router();

const puppeteer = require("puppeteer");
const xlsxFile = require("read-excel-file/node");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, "uploads/")
    },
    filename: (req, file, next) => {
        next(null, "matriz" + path.extname(file.originalname))
    }
})
const upload = multer({ storage })
  
router.post('/tag', upload.single("file"), async (req, res) => {

    var dataTag = []
  
    await xlsxFile('./uploads/matriz.xlsx').then(rows => {
  
      const quantiti = rows.length
  
      for(i=0; i < quantiti; i++) {
        
        var military = {
          name: rows[i][0] + " " + rows[i][1],
          course: req.body.course
        };
        dataTag.push(military)
      };
    
      const filePath = path.join(__dirname, "../views/tag.ejs")
      ejs.renderFile(filePath, { dataTag }, (err, html) => {
  
        if(err) return res.send("Erro na leitura do arquivo: " + err)
        return res.send(html)
        
      });
    }).catch(err => {
      console.log("o erro foi: " + err)
    });
});
  
router.get('/card', (req, res) => {
  
    var dataCard = []
   
    xlsxFile('./uploads/matriz.xlsx').then(rows => {
  
      const quantiti = rows.length
  
      for(i=0; i < quantiti; i++) {
        
        var military = {
          name: rows[i][0] + " " + rows[i][1],
          course: req.body.course
        };
        
        dataCard.push(military)
      };
    
      const filePath = path.join(__dirname, "../views/helcomeCard.ejs")
      ejs.renderFile(filePath, { dataCard }, (err, html) => {
  
        if(err) return res.send("Erro na leitura do arquivo: " + err)
        return res.send(html)
        
      });
    }).catch(err => {
      console.log("o erro foi: " + err)
    });
});
  
router.get('/', (req, res) => {
    res.render('index')
});

module.exports = router;