import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';
import terser from 'rollup-plugin-terser-js';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import pkg from "./package.json";

const name = 'ReactToastify';
const external = [
  "react",
  "react-dom",
];
const windowGlobals = {
  react: "React",
  'react-dom': "ReactDOM",
};

function getOutput({ minify = false, server = false, }) {
  const output = server ?
    [ {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      name,
      sourcemap: true
    },
    {
      file: pkg.esm,
      format: "es",
      exports: "named",
      name,
      sourcemap: true
    }
    ] :
    [ {
      file: pkg.browser,
      format: "umd",
      exports: "named",
      name,
      globals:windowGlobals,
      sourcemap: true
    },
    {
      file: pkg.web,
      format: "iife",
      exports: "named",
      name,
      globals:windowGlobals,
      sourcemap: true
    }
  ];
    if (minify) {
        return output.map(item => {
            const itemFileArray = item.file.split('.');
            itemFileArray.splice(itemFileArray.length - 1, 0, 'min');
            item.file = itemFileArray.join('.');
            item.sourcemap = false;
            return item;
        })
    }
    return output;
}

function getPlugins({
    minify = false,
}) {
  const plugins = [
    sucrase({
      // exclude: ['node_modules/**'],
      transforms: ['jsx','typescript']
    }),
    // // external(),
    replace({
      'process.env.NODE_ENV': minify ?
        JSON.stringify('production') : JSON.stringify('development'),
      'global.': '(typeof global!=="undefined" ? global : window).'
    }),

    typescript({
      noEmitOnError: false,
      declaration: false,
      declarationDir: null,
    }),
    resolve({
      preferBuiltins: true,
    }),
    builtins({}),
    commonjs({
      extensions: [ '.js', '.ts','.jsx' ,'.tsx' ]
      // namedExports: {
      //     // 'node_modules/react-is/index.js': ['isValidElementType'],
      //     // 'node_modules/react/index.js': [
      //     //     'Children',
      //     //     'Component',
      //     //     'PropTypes',
      //     //     'createContext',
      //     //     'Fragment',
      //     //     'Suspense',
      //     //     'lazy',
      //     //     'createElement',
      //     //     'useState',
      //     //     'useEffect',
      //     //     'useContext',
      //     //     'useReducer',
      //     //     'useCallback',
      //     //     'useMemo',
      //     //     'useRef',
      //     //     'useImperativeHandle',
      //     //     'useLayoutEffect',
      //     //     'useDebugValue',
      //     //     '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
      //     // ],

      // }
    }), // so Rollup can convert `ms` to an ES module
    globals({
      // react: 'React',
      // 'react-dom': 'ReactDOM'
    }),
  ];
  if (minify) {
    const minifyPlugins = [

    ].concat(plugins,
      [
        terser({
          sourcemaps: true,
          compress: true,
          mangle: true,
          verbose: true,
        }),
      ]);
    return minifyPlugins;
  }
  return plugins;
}


export default [
  {
    input: "scss/main.ts",
    plugins: [
      scss({
        output:'dist/reacttoastify.css'
      }),
    ],
  },
  {
    input: "scss/min.ts",
    plugins: [
      scss({
        output:'dist/reacttoastify.min.css'
      }),
    ],
  },
  {
    input: "src/index.js",
    output: getOutput({
      minify: false,
      server: false,
    }),
    external,
    plugins: getPlugins({
      minify: false,
    }),
  },
  {
    input: "src/index.js",
    output: getOutput({
      minify: false,
      server: true,
    }),
    external,
    plugins: getPlugins({
      minify: false,
    }),
  },
  {
    input: "src/index.js",
    output: getOutput({
      minify: true,
      server: false,
    }),
    external,
    plugins: getPlugins({
      minify: true,
    }),
  },
  {
    input: "src/index.js",
    output: getOutput({
      minify: true,
      server: true,
    }),
    external,
    plugins: getPlugins({
      minify: true,
    }),
  },
];