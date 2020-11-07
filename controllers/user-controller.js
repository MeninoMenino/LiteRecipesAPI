const mysql = require("../mysql");

//List
exports.getAllUsers = async (req, res, next) => {
  try {
    const query = "SELECT * FROM user";
    const result = await mysql.execute(query);

    //Resposta da requisição
    const response = {
      length: result.length,
      users: result.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          request: {
            type: "GET",
            description: "Return this user",
            url: "http://localhost:3000/users/" + user.idUser,
          },
        };
      }),
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//Search
exports.getUser = async (req, res, next) => {
  try {
    const query = "SELECT * FROM user WHERE idUser = ?";
    const result = await mysql.execute(query, [req.params.idUser]);

    //Resposta da requisição
    const response = {
      id: user.idUser,
      name: user.name,
      email: user.email,
      request: {
        type: "GET",
        description: "Return all users",
        url: "http://localhost:3000/users/",
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

//Post
exports.postUser = async (req, res, next) => {
  try {
    const query = "INSERT INTO user(name, email, password) VALUES(?, ?)";
    const result = await mysql.execute(query, [
      req.body.name,
      req.body.email,
      req.body.password,
    ]);

    //Resposta da requisição
    const response = {
      user: {
        id: result.insertId,
        name: result.name,
        email: result.email,
      },
      request: {
        type: "GET",
        description: "Return this user",
        url: "http://localhost:3000/users/" + result.insertId,
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

//Patch
exports.patchUser = async (req, res, next) => {
  try {
    const query = `UPDATE user
                      SET name = ?,
                          email = ?
                    WHERE idUser = ?`;
    const result = await mysql.execute(query, [req.body.name, req.body.email, req.params.idUser]);

    //Resposta da requisição
    const response = {
      user: {
        id: result.idUser,
        name: result.name,
        email: result.email,
      },
      request: {
        type: "GET",
        description: "Return this user",
        url: "http://localhost:3000/users/" + result.idUser,
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

//Delete
exports.deleteUser = async (req, res, next) => {
  try {
    const query = "DELETE FROM user WHERE idUser = ?";
    const result = mysql.execute(query, [req.params.idUser]);

    //Resposta da requisição
    const response = {
      message: "User successfully deleted",
      request: {
        type: "POST",
        description: "Insert user",
        url: "http://localhost:3000/users/",
        body: {
          name: "String",
          email: "String",
          password: "String",
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
