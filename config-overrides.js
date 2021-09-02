const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(new MonacoWebpackPlugin({
    languages: [
      // static, dynamic, markup, stylesheet, query, hardware, special
      'c', 'cpp', 'csharp', 'java', 'rust', 'lua',
      'python', 'ruby', 'javascript', 'typescript', 'coffescript',
      'html', 'xml', 'yaml', 'markdown', 'json',
      'css', 'less', 'scss',
      'sql', 'mysql', 'pgsql',
      'verilog', 'systemverilog', 'hcl', 'mips',
      'shell'
    ]
  }));
  return config;
}
