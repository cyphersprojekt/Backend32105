const fs = require('fs');

function fileBomb(content, times, destination) {
    for (let i = 0; i < times; i++) {
        content += content;
        fs.writeFileSync(destination, content);
    }
}

fileBomb('JIOJIOJIO', 10000000, 'fileBomb.txt');