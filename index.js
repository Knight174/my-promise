const path = require('path');
const fs = require('fs');

// generate promise
const getFileContent = (fileName) => {
  return new Promise((res, rej) => {
    if (fileName) {
      const name = path.resolve(__dirname, 'files', fileName);
      try {
        const data = fs.readFileSync(name, {});
        res(JSON.parse(data.toString()));
      } catch (err) {
        rej(err);
      }
    } else {
      res('Finished!');
    }
  });
};

// Promise#then
const readFile = () => {
  getFileContent('a.json')
    .then((aData) => {
      console.log('a data: ', aData);
      return getFileContent(aData.next);
    })
    .then((bData) => {
      console.log('b data: ', bData);
      return getFileContent(bData.next);
    })
    .then((cData) => {
      console.log('c data: ', cData);
    });
};
// readFile();

// async/await
const readFileData = async () => {
  try {
    const aData = await getFileContent('a.json');
    console.log('a data: ', aData);
    const bData = await getFileContent('b.json');
    console.log('b data: ', bData);
    const cData = await getFileContent('c.json');
    console.log('c data: ', cData);
  } catch (err) {
    console.error(err);
  }
};
readFileData();
