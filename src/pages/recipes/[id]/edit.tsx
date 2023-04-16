import { useRouter } from "next/router";
import { Recipe } from "../[id]";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Edit() {
    const [name, setName] = useState('');
    const [recipe, setRecipe] = useState<Recipe>({
        id: 0,
        name: '',
        description: '',
        instructions: '',
        image: ''
      })
    const router = useRouter();
    const { user, isLoading } = useUser();

    async function getRecipe(id : string | string[] | undefined) {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      }

    getRecipe(router.query.id);
    return (
        <>
            <Layout user={user} loading={isLoading}>
                <div><h1>{recipe.name}</h1></div>
                <input type="text" value={recipe.name}></input>
            </Layout>
        </>
    )
}
