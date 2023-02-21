const express = require('express');
const path = require('path')
const app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, _ => {
    console.log('App deployed at Port ${PORT}')
})