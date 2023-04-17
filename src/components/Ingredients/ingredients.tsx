import { useEffect, useState } from "react";
import styles from '../../styles/Ingredients.module.scss';
import { useRouter } from "next/router";

export type Ingredient = {
  ingredient_id: number,
  recipe_id: number,
  name: string,
  quantity: string,
  unit: string
}

type IngredientsProps = {
  recipeId: number
}

export default function Ingredients() {
  const [state, setState] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const router = useRouter();
  const { id } = router.query;

  async function getAllIngredients() {
    setState('loading');

    const response = await fetch(
      `http://localhost:3001/recipes/${id}/ingredients`
    );
    const data = await response.json();
    setIngredients(data)
    if (data) {
      setState('data');
    } else {
      setState('empty');
    }
    return {
      props: {
        data,
      },
    };
  }

  useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      {state === 'loading' && (
                <h1>Hleð...</h1>
      )}
      {state === 'empty' && (
                <h1>Það er ekkert hér!</h1>
      )}
      {state === 'data' && (
        <section className={styles.ingredientsContainer}>
          {
            ingredients.map((ingredient, index) => (
              <div className={styles.ingredient} key={ingredient.ingredient_id}>
                <p key={index}>{ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}:  {ingredient.quantity} {ingredient.unit}</p>
              </div>
            ))
          }
        </section>
      )}
    </>
  )
}
