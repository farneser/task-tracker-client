import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import styles from "./ColorPicker.module.scss";

interface Color {
    red: number;
    green: number;
    blue: number;
}

type ColorPickerProps = {
    setColor: (color: string) => void;
    error?: boolean;
}

const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (num: number): string => {
        const hexChars = "0123456789ABCDEF";
        const firstDigit = Math.floor(num / 16);
        const secondDigit = num % 16;

        return hexChars.charAt(firstDigit) + hexChars.charAt(secondDigit);
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const randomLightColor = (): string => {
    function getRandomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    const r = getRandomNumber(100, 255);
    const g = getRandomNumber(100, 255);
    const b = getRandomNumber(100, 255);

    return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): Color | null {
    hex = hex.replace('#', '');

    let validHex;

    if (hex.length === 3) {
        validHex = hex
            .split('')
            .map(char => char + char)
            .join('');
    } else if (hex.length === 6) {
        validHex = hex;
    } else {
        return null;
    }

    if (!/^[A-Fa-f0-9]{6}$/.test(validHex)) {
        return null;
    }

    const red = parseInt(validHex.substring(0, 2), 16);
    const green = parseInt(validHex.substring(2, 4), 16);
    const blue = parseInt(validHex.substring(4, 6), 16);

    return {red, green, blue};
}

const ColorPicker: React.FC<ColorPickerProps> = ({setColor, error:formError}) => {
    const [hexColor, setHexColor] = useState<string>(randomLightColor());
    const {control, watch, setValue} = useForm<Color>({defaultValues: {...hexToRgb(hexColor)}});
    const [error, setError] = useState(false);

    const updateHexColor = () => {
        const [r, g, b] = watch(["red", "green", "blue"]);
        const newHexColor = rgbToHex(r, g, b);
        setHexColor(newHexColor);
        setColor(newHexColor);
    };

    const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputHex = e.target.value;

        if (inputHex.length > 7) {
            return
        }

        const isValidLength = inputHex.length === 4 || inputHex.length === 7;

        setError(!isValidLength)

        const hexRegex = /^#([A-Fa-f0-9]{0,6})$/;

        if (hexRegex.test(inputHex)) {
            const rgb = hexToRgb(inputHex);

            setHexColor(inputHex);
            setColor(inputHex);

            if (rgb) {
                setValue("red", rgb.red)
                setValue("green", rgb.green)
                setValue("blue", rgb.blue)
            }
        }
    };

    return (<div>
        <h1 className={styles.form__label}>Select color</h1>
        <div>
            <div className={styles.form__label}>Red</div>
            <div className={styles.color__slider}>
                <Controller
                    name="red"
                    control={control}
                    defaultValue={0}
                    render={({field: {onChange, value}}) => (
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value);
                                updateHexColor();
                            }}
                        />
                    )}
                />
            </div>
        </div>
        <div>
            <div className={styles.form__label}>Green</div>
            <div className={styles.color__slider}>
                <Controller
                    name="green"
                    control={control}
                    defaultValue={0}
                    render={({field: {onChange, value}}) => (
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value);
                                updateHexColor();
                            }}
                        />
                    )}
                />
            </div>
        </div>
        <div>
            <div className={styles.form__label}>Blue</div>
            <div className={styles.color__slider}>
                <Controller
                    name="blue"
                    control={control}
                    defaultValue={0}
                    render={({field: {onChange, value}}) => (
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value);
                                updateHexColor();
                            }}
                        />
                    )}
                />
            </div>
        </div>
        <div>
            <div className={styles.form__label}>Hex Color</div>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "30px", height: "30px", backgroundColor: hexColor, marginRight: "10px"}}/>
                <input type="text" value={hexColor} onChange={handleHexInputChange}/>
            </div>
            <div className={styles.form__error_placeholder} style={{visibility: error ? "visible" : "hidden"}}>
                <div className={styles.form__error}> {(error || formError) && "Length only 3 or 6 characters"}</div>
            </div>
        </div>
    </div>);
};

export default ColorPicker;
