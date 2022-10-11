// Funciones de respuesta usados en los enrutadores
import { newError, validateData, verifyID } from '../utils/validations.js'
import { pool } from '../db.js'
import { response } from 'express'


export const getEmployees = async (req, res) => {
    const [ employees ] = await pool.query("SELECT * FROM employee")
    res.json(employees)
}

export const getUnicEmployee = async (req, res) => {
    const { id } = req.params
    const { isNotValid, message } = verifyID(id)

    if(isNotValid) return newError(res, message)

    const [ employee ] = await pool.query("SELECT * FROM employee WHERE id = ?", [ id ])
    
    if(employee.length === 0) return newError(res, "Employee not found", 404)

    res.json(employee[0])
}

export const postEmployees = async (req, res) => {
    const { name, salary } = req.body
    const { isIncorrect, message } = validateData(name, salary)

    if(isIncorrect) return newError(res, message)
    
    const [ rows ] = await pool.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [name, salary])

    res.json({"message": `Empleado ${rows.insertId} creado de nombre ${name}!`})
}

export const putEmployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    const { isNotValid, ...messageID } = verifyID(id)
    if(isNotValid) return newError(res, messageID.message)

    const { isIncorrect, ...messageData } = validateData(name, salary, false)
    if(isIncorrect) return newError(res, messageData.message)

    if(messageData.message === "name") {
        const [ response ] = await pool.query("UPDATE employee SET name = ? WHERE id = ?", [ name, id ])
    } else if(messageData.message === "salary") {
        const [ response ] = await pool.query("UPDATE employee SET salary = ? WHERE id = ?", [ salary, id ])
    } else {
        const [ response ] = await pool.query("UPDATE employee SET name = ?, salary = ? WHERE id = ?", [ name, salary, id ])
    }

    console.log(response)

    res.send("Actualizando empleados!")
}

export const deleteEmployees = async (req, res) => {
    const { id } = req.params
    const { isNotValid, message } = verifyID(id)

    if(isNotValid) return newError(res, message)

    const [ result ] = await pool.query("DELETE FROM employee WHERE id = ?", [ id ])

    if(result.affectedRows === 0) return newError(res, "Employee not found", 404)

    res.json({message: `Successfully deleted the employee ${id}`})
}