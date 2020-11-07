const mysql = require("mysql2");

exports.getAllRecipes = async (req, res, next) => {
  try {
    const query = "SELECT * FROM recipe";
    const result = await mysql.execute(query);

    //Resposta da requisição
    const response = {
      length: result.length,
      recipes: result.map((recipe) => {
        return {
          id: result.idRecipe,
          name: result.name,
          prep: result.prep,
          yield: result.yield,
          ingredients: result.ingredients,
          steps: result.steps,
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
