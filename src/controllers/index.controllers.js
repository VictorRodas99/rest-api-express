import { pool } from '../db.js'

export const home = (req, res) => res.send("Welcome!")

export const getData = async (req, res) => {
    const [ result ] = await pool.query("SELECT 1 + 1 AS RESULT")
    res.json(result)
}