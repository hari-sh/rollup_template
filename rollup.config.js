import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const srcDir = 'src/scripts/';
const distDir = 'app/dist/';

const plugins = () => [
    resolve(),
    commonjs(),
    eslint({
        fix: true,
        exclude: ['./node_modules/**', './src/styles/**']
    }),
    babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
    }),
    replace({
        exclude: 'node_modules/**',
        preventAssignment:true,
        ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (process.env.NODE_ENV === 'production' && terser()),
    postcss({
        plugins: [autoprefixer()],
        inject: false,
        extract: true,
        sourceMap: (process.env.NODE_ENV === 'production' ? false : 'inline'),
        minimize: (process.env.NODE_ENV === 'production')
    })
]

function setupBuild(src, dist, name){
    return {
        input: srcDir+src,
        output: {
            file: distDir+dist,
            format: 'iife',
            name,
            globals:{d3: 'd3'},
            sourcemap: (process.env.NODE_ENV === 'production' ? false : 'inline')
        },
        external:['d3'],
        plugins:plugins(),
        onwarn: function(warning, warner){
            if (warning.code === 'CIRCULAR_DEPENDENCY'){
                if(warning.importer && warning.importer.startsWith('node_modules/')){
                    return;
                }
            }
            warner(warning);
        },
    }
}

export default[
    setupBuild('plotter.js', 'plt.js', 'plt')
]