import {useEffect, useState} from "react";

const API_KEY = process.env.GIPHY_API;

export const useFetch = (keyword: string) => {
    const [gifUrl, setGifUrl] = useState('');

    useEffect(() => {
       const fetchGiphs = async () => {
           try {
               const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join('')}&limit=1`);
               const {data} = await res.json();
               setGifUrl(data[0]?.images?.downsized_medium?.url)
           } catch (e) {
               setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284')
           }
       }

         if (keyword) {
             fetchGiphs();
         }
    }, [keyword]);

    return gifUrl || 'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284';
}