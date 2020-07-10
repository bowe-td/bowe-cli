const { cd, exec } = require('shelljs');

module.exports = (repo, folder = '', upstream) => {
    if (!repo) {
        throw new Error('empty repository string');
    }

    exec(`git clone ${repo} ${folder}`)
    cd(folder);
    if (upstream) {
      exec(`git remote set-url origin ${upstream}`)
      return exec('git push -u origin master')
    }
    return exec('git remote remove origin')
}
