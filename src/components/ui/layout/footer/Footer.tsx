import {FC} from "react";
import styles from "./Footer.module.scss"
import {Link} from "react-router-dom";
import {useLocalization} from "@/hooks/useLocalization.ts";

const Footer: FC = () => {
    const {locales, setLocale, translations} = useLocalization();

    return <div className={styles.footer}>
        <div className={styles.footer__info}>
            <div>
                <p className={styles.footer__text}>{translations.credentials.author} <Link
                    className={styles.footer__link}
                    to={"https://github.com/farneser"}
                >farneser</Link></p>
            </div>

            <div>
                <p className={styles.footer__text}>{translations.credentials.repo} <Link
                    to="https://github.com/farneser/task-tracker"
                    target="_blank"
                    className={styles.footer__link}>farneser/task-tracker</Link>
                </p>
            </div>

            <div>
                <p className={styles.footer__text}>{translations.credentials.icons} <Link
                    to="https://heroicons.com/" target="_blank"
                    className={styles.footer__link}>heroicons.com</Link></p>
            </div>
        </div>
        <div className={styles.footer__locals}>
            {locales.map(localeKey => (
                <div key={localeKey} onClick={() => setLocale(localeKey)}>
                    {localeKey}
                </div>
            ))}
        </div>
    </div>
}

export default Footer;