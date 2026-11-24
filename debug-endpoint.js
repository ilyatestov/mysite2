const express = require('express');
const app = express();

app.use(express.json());

// Простой endpoint для проверки
app.get('/debug', (req, res) => {
  res.json({
    message: 'Debug endpoint works',
    timestamp: new Date().toISOString()
  });
});

app.listen(3001, () => {
  console.log('Debug server running on port 3001');
});