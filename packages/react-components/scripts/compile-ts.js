const childProcess = require('child_process');

const spawn = (command, options = {}) => {
  const out = childProcess.spawnSync(
    `tsc -p tsconfig.lib.json `,
    Object.assign({
      shell: true,
      stdio: 'ignore',
    })
  );
  return out;
};

spawn();
