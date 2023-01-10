import { FormEvent, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useLottie } from "lottie-react";

import styles from "./styles.module.css";
import catNotFound from "../../assets/catNotFound.jpg";
import catAnimeted from "../../assets/cute-cat-works.json";

import { Input } from "../../components/Input";

const httpCodes = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302,
    303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408,
    409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423,
    424, 425, 426, 429, 431, 444, 450, 451, 497, 498, 499, 500, 501, 502,
    504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 599
]

export function HttpCat() {

    const [imgUrl, setImgUrl] = useState("");
    const [waitSearch, setWaitSearch] = useState(true);

    const options = {
        animationData: catAnimeted,
        loop: true,
        style:{
            width: 400,
            height: 400
        }
      };
    
      const { View: ViewAnimated } = useLottie(options);

    async function handleSubmitSearchCode(event: FormEvent) {

        event.preventDefault();
        setWaitSearch(false);
        const target = event.target as typeof event.target & {
            searchCode: { value: string };
        };

        const { searchCode } = target;

        const statusCodeFound = httpCodes.find(
            (code) => code === Number(searchCode.value)
        );
        
        if (statusCodeFound) {
            setImgUrl(`https://http.cat/${searchCode.value}`);
        } else {
            setImgUrl("")
        }
    }



    return (
        <div className={styles.containerMain}>
            <div className={styles.containerWrapper}>
                <h1>HTTPCat</h1>
                <h4>Aprenda sobre códigos de status da resposta HTTP</h4>
                <form onSubmit={handleSubmitSearchCode}>
                    <div className={styles.wrapperInput}>
                        <label>
                            <span>Buscar HTTP Code:</span>
                            <Input
                                IconName={
                                    <MagnifyingGlass
                                        color="black"
                                    />}
                                name="searchCode"
                                placeholder="Digite um status Code"
                                type="number"
                            />
                        </label>
                    </div>
                </form>
                {
                    waitSearch ? ViewAnimated
                    : <img src={imgUrl ? imgUrl : catNotFound} />
                }
            </div>
            
        </div>
    )
}