const childProcess = require('child_process');


const spawn = (command, options = {}) => {
  const out = childProcess.spawnSync(
    `tsc --project tsconfig.json --declaration --declarationDir types`,
    Object.assign(
      {
        shell: true,
        stdio: 'ignore',
      }
    )
  );
  return out;
};

spawn();
