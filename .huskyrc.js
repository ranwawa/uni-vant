const tasks = arr => arr.join(" && ");
module.exports = {
  hooks: {
    "pre-commit": "pretty-quick --staged",
    "pre-push": tasks([
      "rm -rf lib",
      "cp -rf examples/src/components/. lib",
      "npm version patch",
      "npm publish"
    ])
  }
};
