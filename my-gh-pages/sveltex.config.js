// sveltex.config.js
import { sveltex } from '@nvl/sveltex';

export default await sveltex(
    {
        markdownBackend: 'unified',
        codeBackend: 'shiki',
        mathBackend: 'mathjax'
    }, {
        markdown: {
            remarkPlugins: [],
            retextPlugins: [],
            rehypePlugins: [],
            remarkRehypeOptions: {},
            rehypeStringifyOptions: {},
            // Common options
            components: [],
            prefersInline: () => true,
            strict: false,
            transformers: {
                pre: [],
                post: [],
            },
        },
        code: { 
            shiki: { 
                theme: 'github-dark' 
            } 
        },
        verbatim: { 
            Tex: { 
                type: 'tex', aliases: ['TeX'] 
            } 
        },
    },
);
