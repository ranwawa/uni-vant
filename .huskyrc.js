const tasks = arr => arr.join(" && ");
module.exports = {
  hooks: {
    // "pre-commit": "pretty-quick --staged",
    "pre-commit": tasks([
      "rm -rf npm/lib",
      "cp -rf src/components/. lib",
      "cd npm",
      "npm version patch",
      "npm publish"
    ])
  }
};
