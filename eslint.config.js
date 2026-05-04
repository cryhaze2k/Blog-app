import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                // Додаємо глобальні змінні для Node.js та Jest
                process: "readonly",
                __dirname: "readonly",
                module: "readonly",
                require: "readonly",
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                jest: "readonly"
            },
            ecmaVersion: "latest",
            sourceType: "commonjs",
        },
        rules: {
            "indent": ["error", 2],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];