// TODO: Template fyrir staka uppskrift

import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Recipes.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout";
import Link from "next/link";

export type Recipe = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  image: string;
}

export default function Recipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    name: '',
    description: '',
    instructions: '',
    image: ''
  })
  const { user, isLoading } = useUser();

  const router = useRouter();
  const { id } = router.query

  
  // Færa þetta og exporta
  async function getRecipe(id : string | string[] | undefined) {
    const response = await fetch(`http://localhost:3001/recipes/${id}`);
    const data = await response.json();
    setRecipe(data);
  }

  

  getRecipe(id);

  return (
    <>
        <Layout user={user} loading={isLoading}>
            <h1 className={styles.recipeName}>{recipe.name.toUpperCase()}</h1>
            <h3 className={styles.recipeDescription}>Description: {recipe.description}</h3>
            <div className={styles.imageContainer}>
                <img src={recipe.image} alt={recipe.name} />
                <p>lorem ipsum</p>
                
                
            </div>

            <h4 className={styles.recipeInstructions}>Instructions: {recipe.instructions}</h4>
            {/* Edit takki ef notandi er skráður inn */}
            <Link
                href={`/recipes/${recipe.id}/edit`}>
                    {user && (<button className="editRecipeButton">Breyta uppskrift</button>)}
            </Link>
        </Layout>
    </>
  )
}


