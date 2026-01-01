import { initApp } from './index';
import { Express } from 'express';

const PORT = process.env.PORT || 3000;

initApp().then((app: Express) => {
  app.listen(PORT, () =>
    console.log(`Server is runnin on http://localhost:${PORT}`)
  );
});
