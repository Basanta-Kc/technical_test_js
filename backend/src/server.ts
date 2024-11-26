
import app from "./app";

import { connectToDatabase } from "./utils/database";

const start = async () => {
    const PORT = 8000;

  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

start();
