import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// إعداد قاعدة البيانات
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "math_forum"
});

// إنشاء الجداول
await db.query(`
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50)
);
`);

await db.query(`
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rootNumber INT,
  author VARCHAR(50),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

await db.query(`
CREATE TABLE IF NOT EXISTS responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postId INT,
  parentId INT NULL,
  operation VARCHAR(5),
  operand INT,
  result INT,
  author VARCHAR(50),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES posts(id)
);
`);

// بيانات تجريبية (مرة واحدة فقط)
const [count] = await db.query("SELECT COUNT(*) AS c FROM posts");
if (count[0].c === 0) {
  console.log("📥 Inserting demo data...");
  await db.query(`
  INSERT INTO posts (id, rootNumber, author, timestamp) VALUES
  (1, 10, 'Alice', '2025-11-08 10:00:00'),
  (2, 100, 'Henry', '2025-11-08 09:00:00'),
  (3, 7, 'Liam', '2025-11-08 12:00:00');
  `);

  await db.query(`
  INSERT INTO responses (id, postId, parentId, operation, operand, result, author, timestamp) VALUES
  (1, 1, NULL, '+', 5, 15, 'Bob', '2025-11-08 10:15:00'),
  (2, 1, 1, '×', 2, 30, 'Charlie', '2025-11-08 10:30:00'),
  (3, 1, 1, '÷', 3, 5, 'Diana', '2025-11-08 10:45:00'),
  (4, 1, NULL, '-', 3, 7, 'Eve', '2025-11-08 11:00:00'),
  (5, 1, 4, '+', 8, 15, 'Frank', '2025-11-08 11:15:00'),
  (6, 1, NULL, '÷', 2, 5, 'Grace', '2025-11-08 11:30:00'),
  (7, 2, NULL, '÷', 4, 25, 'Iris', '2025-11-08 09:30:00'),
  (8, 2, 7, '-', 10, 15, 'Jack', '2025-11-08 10:00:00'),
  (9, 2, NULL, '-', 50, 50, 'Kate', '2025-11-08 09:45:00'),
  (10, 3, NULL, '×', 3, 21, 'Mia', '2025-11-08 12:15:00');
  `);
  console.log("✅ Demo data inserted");
}

// دالة لبناء الردود المتداخلة
const buildResponsesTree = (responses, parentId = null) =>
  responses
    .filter(r => r.parentId === parentId)
    .map(r => ({
      id: `resp${r.id}`,
      operation: r.operation,
      operand: r.operand,
      result: r.result,
      author: r.author,
      timestamp: r.timestamp,
      responses: buildResponsesTree(responses, r.id)
    }));

// ----------- API POSTS & RESPONSES -----------

app.get("/api/data", async (req, res) => {
  const [posts] = await db.query("SELECT * FROM posts ORDER BY id ASC");
  const [responses] = await db.query("SELECT * FROM responses ORDER BY id ASC");

  const fullPosts = posts.map(post => ({
    id: `post${post.id}`,
    rootNumber: post.rootNumber,
    author: post.author,
    timestamp: post.timestamp,
    responses: buildResponsesTree(responses.filter(r => r.postId === post.id))
  }));

  res.json({
    posts: fullPosts,
    currentUser: { username: "Guest", isAuthenticated: false }
  });
});

app.post("/api/posts", async (req, res) => {
  const { rootNumber, author } = req.body;
  await db.query("INSERT INTO posts (rootNumber, author) VALUES (?, ?)", [rootNumber, author]);
  res.json({ message: "Post added" });
});

app.post("/api/responses", async (req, res) => {
  const { postId, parentId, operation, operand, result, author } = req.body;
  await db.query(
    "INSERT INTO responses (postId, parentId, operation, operand, result, author) VALUES (?, ?, ?, ?, ?, ?)",
    [postId, parentId || null, operation, operand, result, author]
  );
  res.json({ message: "Response added" });
});

app.delete("/api/posts/:id", async (req, res) => {
  await db.query("DELETE FROM posts WHERE id=?", [req.params.id]);
  await db.query("DELETE FROM responses WHERE postId=?", [req.params.id]);
  res.json({ message: "Post deleted" });
});

// ----------- LOGIN & REGISTER -----------

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });

  try {
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    res.json({ message: "Account created successfully" });
  } catch {
    res.status(400).json({ message: "Username already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const [user] = await db.query("SELECT * FROM users WHERE username=? AND password=?", [
    username,
    password
  ]);
  if (user.length === 0)
    return res.status(401).json({ message: "Invalid username or password" });

  res.json({ message: "Login successful", user: { username, isAuthenticated: true } });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
