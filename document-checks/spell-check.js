#!/usr/bin/env node

const SpellChecker = require('simple-spellchecker');
const fs = require('fs');
const { map, partialRight } = require('lodash');
const { resolve } = require('path');
const { readdir } = fs.promises;

const dictionary = SpellChecker.getDictionarySync('en-GB');

const getFiles = async (dir) => {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
};

const wordpattern = /(\w+)/g;

const readFile = (filename) =>
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(filename);
    const words = data.match(wordpattern);
    words.forEach((word) => {
      const spellchecked = dictionary.spellCheck(word);
      if (!spellchecked) {
        console.warn(`Spellcheck: ${word}\nSuggestions: ${dictionary.getSuggestions(word).join(', ')}\n`);
      }
    });
  });

const readFiles = partialRight(map, readFile);

getFiles(`${__dirname}/../content`).then(readFiles);
