const pool = require("../mysql2").pool;

// Return all
exports.get = (req, res, next) => {
  pool.getConnection((err, conn) => {
    if (err)
      return res.status(500).send({
        error: "Error on database connection",
      });

    conn.query("SELECT * FROM car", null, (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: "Error on query execute",
        });

      res.status(200).send({
        success: {
          result: results,
        },
      });
    });
  });
};

// Return with filter ID
exports.getByID = (req, res, next) => {
  const id = req.params.id;

  pool.getConnection((err, conn) => {
    if (err)
      return res.status(500).send({
        error: "Error on database connection",
      });

    conn.query(
      "SELECT * FROM car WHERE car.idcar = ?",
      [id],
      (error, results, fields) => {
        if (error)
          return res.status(400).send({
            error: "Error on query execute",
          });

        if (!results.length)
          return res.status(404).send({
            error: "Not found",
          });

        res.status(200).send({
          success: {
            result: results,
          },
        });
      }
    );
  });
};

// Update with filter ID
exports.put = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  pool.getConnection((err, conn) => {
    if (err)
      return res.status(500).send({
        error: "Error on database connection",
      });

    conn.query(
      "UPDATE car SET car.name = ?, car.color = ? WHERE car.idcar = ?",
      [body.name, body.color, id],
      (error, results, fields) => {
        if (error)
          return res.status(400).send({
            error: "Error on query execute",
          });

        res.status(200).send({
          success: {
            id: id,
            result: body,
          },
        });
      }
    );
  });
};

// Delete with filter ID
exports.delete = (req, res, next) => {
  const id = req.params.id;

  pool.getConnection((err, conn) => {
    if (err)
      return res.status(500).send({
        error: "Error on database connection",
      });

    conn.query(
      "DELETE FROM car WHERE car.idcar = ?",
      [id],
      (error, results, fields) => {
        if (error)
          return res.status(400).send({
            error: "Error on query execute",
          });

        if (results.affectedRows == 0)
          return res.status(404).send({
            error: "Not found",
          });

        res.status(200).send({
          success: "OK, deleted",
        });
      }
    );
  });
};

// Create new record
exports.post = (req, res, next) => {
  const body = req.body;

  pool.getConnection((err, conn) => {
    if (err)
      return res.status(500).send({
        error: "Error on database connection",
      });

    conn.query(
      "INSERT INTO car (name, color) VALUES (?, ?)",
      [body.name, body.color],
      (error, results, fields) => {
        if (error)
          return res.status(400).send({
            error: "Error on query execute",
          });

        res.status(201).send({
          success: {
            id: results.insertId,
            result: body,
          },
        });
      }
    );
  });
};
