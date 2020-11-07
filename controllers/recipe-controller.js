const mysql = require("mysql2");

//List
exports.getAllRecipes = async (req, res, next) => {
  try {
    const query = "SELECT * FROM recipe";
    const result = await mysql.execute(query);

    //Resposta da requisição
    const response = {
      length: result.length,
      recipes: result.map((recipe) => {
        return {
          id: recipe.idRecipe,
          idUser: recipe.user_idUser,
          name: recipe.name,
          prep: recipe.prep,
          yield: recipe.yield,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          request: {
            type: "GET",
            description: "Return this recipe",
            url: "http://localhost:3000/recipes/" + recipe.idRecipe,
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
exports.getRecipe = async (req, res, next) => {
  try {
    const query = "SELECT * FROM recipe WHERE idRecipe = ?";
    const result = await mysql.execute(query, [req.params.idRecipe]);

    //Resposta da requisição
    const response = {
      id: result.idRecipe,
      idUser: result.user_idUser,
      name: result.name,
      prep: result.prep,
      yield: result.yield,
      ingredients: result.ingredients,
      steps: result.steps,
      request: {
        type: "GET",
        description: "Return all recipes",
        url: "http://localhost:3000/recipes/",
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//Post
exports.postRecipe = async (req, res, next) => {
  try {
    const query =
      "INSERT INTO recipe (user_idUser, name, prep, yield, ingredients, steps) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [
      req.body.user_idUser,
      req.body.name,
      req.body.prep,
      req.body.yield,
      req.body.ingredients,
      req.body.steps,
    ];
    const result = await mysql.execute(query, params);

    //Resposta da requisição
    const response = {
      recipe: {
        id: result.insertId,
        idUser: result.user_idUser,
        name: result.name,
        prep: result.prep,
        yield: result.yield,
        ingredients: result.ingredients,
        steps: result.steps,
        request: {
          type: "GET",
          description: "Return this recipe",
          url: "http://localhost:3000/recipes/" + result.insertId,
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//Patch
exports.patchRecipe = async (req, res, next) => {
  try {
    const query = `UPDATE recipe
                      SET name
                          prep
                          yield
                          ingredients
                          steps
                    WHERE idRecipe = ?`;
    const params = [
      req.body.name,
      req.body.prep,
      req.body.yield,
      req.body.ingredients,
      req.body.steps,
      req.params.idRecipe,
    ];
    const result = await mysql.execute(query, params);

    //Resposta da requisição
    const response = {
      recipe: {
        id: result.recipeId,
        idUser: result.user_idUser,
        name: result.name,
        prep: result.prep,
        yield: result.yield,
        ingredients: result.ingredients,
        steps: result.steps,
        request: {
          type: "GET",
          description: "Return this recipe",
          url: "http://localhost:3000/recipes/" + result.recipeId,
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//Delete
exports.deleteRecipe = async (req, res, next) => {
  try {
    const query = "DELETE FROM recipe WHERE idRecipe = ?";
    const result = await mysql.execute(query, [req.params.idRecipe]);

    //Resposta da requisição
    const response = {
      message: "Recipe successfully deleted.",
      request: {
        tipo: "POST",
        descricao: "Insert a recipe",
        url: "http://localhost:3000/recipes/",
        body: {
          name: "String",
          prep: "String",
          yield: "String",
          ingredients: "String",
          steps: "String",
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
