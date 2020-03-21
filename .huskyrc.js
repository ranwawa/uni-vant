const tasks = arr => arr.join(" && ");
module.exports = {
  hooks: {
    "pre-commit": "pretty-quick --staged",
    "pre-push": tasks([
      "rm -rf npm/lib",
      "cp -rf examples/src/components/. npm/lib",
      "cd npm",
      "npm version patch",
      "npm publish"
    ])
  }
};
