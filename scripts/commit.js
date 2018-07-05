const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const commitAnalyzer = require('@semantic-release/commit-analyzer');
const buildCommit = require('cz-customizable/buildCommit');
const autocomplete = require('inquirer-autocomplete-prompt');

const makeDefaultQuestions = require('cz-lerna-changelog/lib/make-default-questions');
const autocompleteQuestions = require('cz-lerna-changelog/lib/autocomplete-questions').default;

const collectPackages = require('@lerna/collect-packages');

async function getAllPackages () {
  return await collectPackages(process.cwd());
}

function getChangedPackages (pkgs) {
  const changedFiles = shell.exec('git diff --cached --name-only', {silent: true})
    .stdout
    .split('\n');
  return pkgs.filter(function (pkg) {
      const packagePrefix = path.relative('.', pkg.location) + path.sep;
      for (let changedFile of changedFiles) {
        if (changedFile.indexOf(packagePrefix) === 0) {
          return true;
        }
      }
    })
    .map(function (pkg) {
      return pkg.name
    });
}

function makeAffectsLine (answers) {
  const selectedPackages = answers.packages;
  if (selectedPackages && selectedPackages.length) {
    return `affects: ${selectedPackages.join(', ')}`;
  }
}

function getCommitTypeMessage (type) {
  if (!type) {
    return 'This commit does not indicate any release'
  }
  return {
    patch: '🛠  This commit indicates a patch release (0.0.X)',
    minor: '✨  This commit indicates a minor release (0.X.0)',
    major: '💥  This commit indicates a major release (X.0.0)',
  }[type];
}

function mergeQuestions(defaultQuestions, customQuestions) {
  const questions = [];
  defaultQuestions.forEach(question => {
    const matchingCustomQuestions = customQuestions.filter(({ name: customQuestionName }) => (customQuestionName === question.name));
    const customQuestion = matchingCustomQuestions.length > 0 && matchingCustomQuestions[0]
    questions.push(customQuestion || question);
  });
  return questions;
}

const prompter = function(cz, commit) {
  getAllPackages().then(pkgs => {
    const allPackages = pkgs.map((pkg) => pkg.name);
    const changedPackages = getChangedPackages(pkgs);
    const defaultQuestions = makeDefaultQuestions(allPackages, changedPackages);
    const customQuestions = [];
    const questions = mergeQuestions(defaultQuestions, customQuestions);

    cz.registerPrompt('autocomplete', autocomplete);
    cz.prompt(
      autocompleteQuestions(questions)
    ).then((answers) => {
      const affectsLine = makeAffectsLine(answers);
      if (affectsLine) {
        answers.body = `${affectsLine}\n` + answers.body;
      }
      const message = buildCommit(answers);
      const type = commitAnalyzer({}, {
        commits: [{
          hash: '',
          message,
        }],
      }, (err, type) => {
        console.log(chalk.green(`\n${getCommitTypeMessage(type)}\n`));
        console.log('\n\nCommit message:');
        console.log(chalk.blue(`\n\n${message}\n`));
        commit(message)
      });
    });
  })
}

module.exports = {
  prompter
};
