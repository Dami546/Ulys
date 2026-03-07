const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Ulys API запущен!'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
