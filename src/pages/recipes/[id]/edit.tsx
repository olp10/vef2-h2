import { useRouter } from "next/router";
import { Recipe } from "../[id]";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Edit() {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState('');
    const [uploadImage, setUploadImage] = useState('');

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

    async function onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      console.log(description);
      setDescription(event.target.value);
    }

    async function onInstructionsChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setInstructions(event.target.value);
    }

    function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
      setImage(event.target.value);
    }

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setRecipeName(event.target.value);
    }

    function onUploadImageChange(event: React.ChangeEvent<HTMLInputElement>) {
      setUploadImage(event.target.value);
    }

    function submitEditRecipe() {
      console.log(recipeName, description, instructions, image);
      fetch(`http://localhost:3001/recipes/${router.query.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeName: recipeName ? recipeName : recipe.name,
          description: description ? description : recipe.description,
          instructions: instructions ? instructions : recipe.instructions,
          image: image ? image : recipe.image,
          user,
          uploadImage: uploadImage? uploadImage : null,
        }),
      });
      // Redirect to recipe page
      router.push(`/recipes/${router.query.id}`);
    }


    return (
        <>
            <Layout user={user} loading={isLoading}>
                <div className="editRecipeForm">
                    <label htmlFor="name">Heiti:</label>
                    <input type="text" defaultValue={recipe.name} name="name" onChange={onNameChange}></input>
                    <label htmlFor="description">Lýsing:</label>
                    <textarea name="description" defaultValue={recipe.description} onChange={onDescriptionChange}></textarea>
                    <label htmlFor="instructions">Leiðbeiningar:</label>
                    <textarea name="instructions" defaultValue={recipe.instructions} onChange={onInstructionsChange}></textarea>
                    <label htmlFor="image">Mynd:</label>
                    <input type="text" name="image" defaultValue={recipe.image} onChange={onImageChange}></input>

                    {/* FIXME: Virkar ekki, þarf að uploada á cloudinary úr framenda? */}
                    <input type="file" name="uploadImage" onChange={onUploadImageChange}></input>
                    <button type="submit" onClick={submitEditRecipe}>Breyta</button>
                </div>

            </Layout>
        </>
    )
}
