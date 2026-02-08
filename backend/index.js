const express = require("express")
const path = require("path")
require("dotenv").config({ path: "./config/config.env" })
const connections = require("./config/connections.js")
const cors = require("cors")
const routers = require("./routes/router.js")
const l_routers = require("./routes/userroutes.js")
const auth = require("./authentication/auth.js")

const app = express()

app.use(cors());
app.use(express.json())

// ✅ STATIC FILES (MUST be before auth)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
)

// Public routes
app.use("/apis", l_routers)

// Protected routes
app.use(auth.Authenticate)
app.use("/api", routers)

connections()

app.listen(process.env.PORT, () => {
  console.log("server is started on port", process.env.PORT)
})
