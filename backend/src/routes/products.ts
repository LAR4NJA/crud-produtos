import { Router } from "express";
import { pool } from "../db";

const router = Router();

// Listar produtos
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price, quantity FROM products ORDER BY id"
    );

    res.json(result.rows);
  } catch {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});

// Cadastrar produto
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, price, quantity)
       VALUES ($1, $2, $3)
       RETURNING id, name, price, quantity`,
      [name, price, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
});

// Editar produto
router.put("/:id", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, quantity = $3
       WHERE id = $4
       RETURNING id, name, price, quantity`,
      [name, price, quantity, req.params.id]
    );

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ erro: "Erro ao editar produto" });
  }
});

// Excluir produto
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [req.params.id]
    );

    res.json({ mensagem: "Produto excluído" });
  } catch {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

export default router;
