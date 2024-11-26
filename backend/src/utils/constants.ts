
console.log(process.env.MONGODB_URI)
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/mydb";
const LLM_URL = process.env.LLM_URL || "http://localhost:8080";
const PORT = process.env.PORT || 8000;

export { MONGODB_URL, LLM_URL };
