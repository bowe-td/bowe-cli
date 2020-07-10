const { exec } = require('shelljs');

module.exports = (repo, folder = '') => {
    if (!repo) {
        throw new Error('empty repository string');
    }

    return exec(`git clone ${repo} ${folder}`)
}