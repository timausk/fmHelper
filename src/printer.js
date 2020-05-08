const modifier = {
  'reset': '\x1b[0m'
};
const colors = {
  info: '\x1b[36m',
  ok: '\x1b[32m',
  warning: '\x1b[33m',
  error: '\x1b[31m'
};

/**
 * set a ANSI escape color sequences including
 * reset to console color to default
 * @param  {string} color
 * @returns {string}
 */
function setConsoleColor (color) {
  return color + '%s' + modifier.reset;
}

/**
 * @param {string} color - ANSI escape color sequences
 * @param {string} msg   - status message
 */
function printing (color, msg) {
  let consoleColor = setConsoleColor(color);
  console.log(consoleColor, msg);
}

module.exports = {
  info: function (msg) {
    printing(colors.info, msg);
  },
  
  ok: function (msg) {
    printing(colors.ok, msg);
  },

  warning: function (msg) {
    printing(colors.warning, msg);
  },

  error: function (msg) {
    printing(colors.error, msg);
  },
};
