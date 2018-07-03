const childProcess = require('child_process');


const spawn = (command, options = {}) => {
  console.log(process.cwd);
  const out = childProcess.spawnSync(
    `tsc --project tsconfig.lib.json --declaration --declarationDir types`,
    Object.assign(
      {
        shell: true,
        stdio: 'inherit',
      }
    )
  );
  return out;
};

spawn();
