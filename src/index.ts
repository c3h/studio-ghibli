import app from './main/app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`running at the door ${PORT}`));

export default server;
