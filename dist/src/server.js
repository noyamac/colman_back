"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const PORT = process.env.PORT || 3000;
(0, index_1.initApp)().then((app) => {
    app.listen(PORT, () => console.log(`Server is runnin on http://localhost:${PORT}`));
});
//# sourceMappingURL=server.js.map