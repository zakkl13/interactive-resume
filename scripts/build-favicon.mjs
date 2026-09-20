import sharp from "sharp";

const mark = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="88" fill="#f3f0e9"/>
    <path d="M62 116H238V170L137 326H242V388H56V334L158 178H62V116Z" fill="#111111"/>
    <path d="M270 116H338V326H422V388H270V116Z" fill="#111111"/>
    <circle cx="453" cy="354" r="31" fill="#ff4d12"/>
  </svg>
`;

const source = Buffer.from(mark);

await sharp(source)
  .resize(512, 512)
  .png()
  .toFile("public/favicon.png");

await sharp(source)
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
