const express= require('express'),
	 path = require('path');

const app =express();


app.use(express.static('./dist/proj2048'));

app.get('/*', (req,res)=>{

res.sendFile(path.join(__dirname,'/dist/proj2048/index.html'));

});

app.listen(process.env.PORT || 8080, ()=>{
console.log('Server started');
})
