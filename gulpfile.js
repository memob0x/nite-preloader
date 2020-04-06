"use strict";

const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const pump = require("pump");
const strip = require("gulp-strip-comments");
const rollup = require("gulp-better-rollup");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-minify");
const rename = require("gulp-rename");

const BASE_DEMO = "./demo/";

const _file = (ext = "", base = "./") => `${base}+([a-z])?(\-+([a-z]))${ext}`;

const _src = (ext = "", base = "./") => [
    gulp.src(_file(ext, `${base}src/`)),

    sourcemaps.init({
        loadMaps: false,
        largeFile: false,
    }),
];

const _dest = (base = "./") => [
    sourcemaps.write("."),

    gulp.dest(`${base}dist/`),
];

// TODO: fix <anonymouse> tasks
const demoCss = gulp.series(
    ...fs
        .readdirSync(BASE_DEMO)
        .filter((file) => fs.statSync(path.join(BASE_DEMO, file)).isDirectory())
        .map((folder) => (done) =>
            pump(
                [
                    //
                    ..._src(".scss", `${BASE_DEMO}/${folder}/`),
                    //
                    sass({ outputStyle: "compressed" }),
                    //
                    postcss([autoprefixer()]),
                    //
                    ..._dest(`${BASE_DEMO}/${folder}/`),
                ],
                done
            )
        )
);

const _rollupLibJs = () => rollup({}, { format: "umd", name: "Loader" });

const _minJs = () => minify({ ext: { min: ".min.js" } });

const libEs5 = (done) =>
    pump(
        [
            //
            ..._src(".mjs"),
            //
            _rollupLibJs(),
            //
            babel({ comments: false }),
            //
            rename({ extname: ".es5.js" }),
            //
            _minJs(),
            //
            ..._dest(),
        ],
        done
    );

const libEs6 = (done) =>
    pump(
        [
            //
            ..._src(".mjs"),
            //
            _rollupLibJs(),
            //
            strip(),
            //
            rename({ extname: ".js" }),
            //
            _minJs(),
            //
            ..._dest(),
        ],
        done
    );

gulp.task("default", gulp.parallel(libEs5, libEs6, /* demoJs,*/ demoCss));

const watch = () => {
    gulp.watch(_glob(".mjs"), gulp.parallel(libEs5, libEs6));
    // gulp.watch(_glob(".js", BASE_DEMO), demoJs);
    gulp.watch(_glob(".scss", BASE_DEMO), demoCss);
};

gulp.task("watch", gulp.series("default", watch));
