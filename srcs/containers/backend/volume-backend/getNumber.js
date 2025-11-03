export const getNumber = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  });
  res.end(JSON.stringify({result: 42}));
};