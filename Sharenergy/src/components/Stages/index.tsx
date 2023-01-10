import styles from "./styles.module.css";

interface IProps {
    isStageDataClient: boolean;
}

export function Stages({ isStageDataClient }: IProps) {
    return (
        <div className={styles.stage}>
            <span
                className={
                    isStageDataClient ? styles.stageTrue
                        : styles.stageFalse
                }
            >
                1
            </span>
            <span
                className={
                    isStageDataClient ? styles.stageFalse
                        : styles.stageTrue
                }
            >
                2
            </span>
        </div>
    )
}