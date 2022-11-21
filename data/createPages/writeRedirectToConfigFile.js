const fs = require('fs');

export const writeRedirectToConfigFile = (filePath) => {
  fs.writeFileSync(filePath, '');
  return (from, to) => {
    fs.appendFileSync(filePath, createRedirectForConfigFile(from, to));
  };
};

const createRedirectForConfigFile = (from, to) => `${from} ${to};\n`;
