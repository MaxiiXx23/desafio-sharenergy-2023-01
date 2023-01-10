import { useState } from "react"

import axios from "axios"
import { useLottie } from 'lottie-react';

import styles from "./styles.module.css"

import cuteDogAnimeted from "../../assets/cute-dog.json";

export function RandomDog() {

    const [imgDogUrl, setImgDogUrl] = useState("");

    const options = {
        animationData: cuteDogAnimeted,
        loop: true,
        style: {
            width: 250,
            height: 250
        }
    };

    const { View: ViewAnimated } = useLottie(options);

    async function handleRefresh() {
        try {

            const response = await axios.get("https://random.dog/woof.json");

            const { data } = response;

            const img = data.url

            if (img) {
                setImgDogUrl(img)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerImg}>
                <strong>Qual será seu melhor amigo? 🐕</strong>
                {
                    imgDogUrl ? <img src={imgDogUrl} alt="Random Dog" />
                        : <div style={{ width: 200, height: 200 }}>{ViewAnimated}</div>
                }
                <button onClick={handleRefresh}>Refresh</button>
            </div>
        </div>
    )
}