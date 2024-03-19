import { useState } from 'react';
import { useTranslation } from "react-i18next"; 
import OpenAI from 'openai';
import '../css/App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser: true
});

function Homepage(){
    const [language, setLanguage] = useState('English');
    const [t, i18n] = useTranslation("global");
    const [image, setImage] = useState("");
    const [prompt, setPrompt] = useState("");
    const [filter, setFilter] = useState(""); // State to handle CSS filters

    const changeLanguageHandler = () => {
        const newLanguage = language === 'English' ? 'es' : 'en';
        setLanguage(newLanguage === 'es' ? 'Español' : 'English');
        i18n.changeLanguage(newLanguage);
    };

    function generatePrompts() {
        const themes = [
          'Portrait of a',
          'Landscape of',
          'Abstract concept:',
          'Scene:',
        ];
        const subjects = [
          'face using cubism technique with blue background',
          'horse galloping in the woods at sunset',
          'futuristic cityscape at night under a neon sky',
          'serene lake surrounded by mountains during sunrise',
          'vibrant market in a bustling city',
          'tranquil beach with crashing waves at dusk',
          'robot in a post-apocalyptic world',
          'garden with exotic flowers and a hidden path',
          'space station orbiting an alien planet',
          'mysterious forest shrouded in fog',
        ];
      
        const imagesDict = {};
      
        let promptId = 1;
        themes.forEach((theme) => {
          subjects.forEach((subject) => {
            if (promptId <= 100) { // Ensure we only generate up to 100 prompts
              imagesDict[promptId] = `${theme} ${subject}`;
              promptId++;
            }
          });
        });
      
        return imagesDict;
      }

    const imagesDict = generatePrompts();

    const filters = {
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        brightness: 'brightness(150%)',
        contrast: 'contrast(200%)',
        none: 'none',
    };

    const applyFilter = (selectedFilter) => {
        setFilter(filters[selectedFilter]);
    };

    const numGenerator = (n) => Math.floor(Math.random() * n) + 1;

    const randomImageClickHandler = () => {
        const key = numGenerator(Object.keys(imagesDict).length);
        setPrompt(imagesDict[key]);
        generateImage(imagesDict[key]); // Call generateImage with the new prompt
    };

    const imageFromInputClickHandler = () => {
        generateImage(prompt);
    };

    async function generateImage(currentPrompt) {
        try {
            const response = await openai.images.generate({
                prompt: currentPrompt,
            });
            setImage(response.data[0].url);
        } catch (err) {
            console.log(err);
        }
    };

    const downloadImage = () => {
        if (image) {
            const link = document.createElement('a');
            link.href = image;
            link.download = 'generated_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="App">
            <header className="row">
                <div className="col-10">
                    <h1 className="page_title">{t("pixel creation")}</h1>
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-dark" onClick={changeLanguageHandler}>{language}</button>
                </div>
            </header>
            <section className="inputSection">
                <div className="input">
                    <Stack direction="row" spacing={2}>
                        <TextField 
                            id="filled-basic" 
                            label={t("whatImagesDoYouWantToCreate")} 
                            variant="filled" 
                            style={{ width: '70%' }} 
                            onChange={(e) => setPrompt(e.target.value)} 
                            value={prompt}
                        />
                        <Button onClick={imageFromInputClickHandler} variant="outlined" style={{ color: 'black' }}>{t("generateImage")}</Button>
                    </Stack>
                    <Button className="mt-4 me-1" onClick={randomImageClickHandler} variant="outlined" style={{ color: 'black' }}>{t("createRandomImage")}</Button>
                    <Button className="mt-4 ms-1" onClick={downloadImage} variant="outlined" style={{ color: 'black' }}>{t("downloadImage")}</Button>
                    {/* Buttons for applying filters */}
                    <div className="filter-buttons">
                        {Object.keys(filters).map(filterName => (
                            <Button key={filterName} onClick={() => applyFilter(filterName)} variant="outlined">
                                {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="mt-2 imageSection">
                {/* Apply the CSS filter to the image */}
                {image && <img src={image} alt="Generated" style={{ filter }} />}
            </section>
        </div>
    );
}

export default Homepage;
