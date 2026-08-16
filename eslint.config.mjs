import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "public/**",
      "screenshots/**",
      "resume-pdf/fonts/**",
      "resume-pdf/out/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
