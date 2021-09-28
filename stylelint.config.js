module.exports = {
    'extends': 'stylelint-config-standard',

    rules: {
        'at-rule-no-vendor-prefix': true,
        'at-rule-semicolon-newline-after': 'always',
        'at-rule-empty-line-before': [
            'always', {
                except: [
                    'after-same-name',
                    'first-nested',

                ]
            }
        ],
        'at-rule-no-unknown': [
            true, {
                ignoreAtRules: [
                    'lost',
                    'for'
                ]
            },
        ],
        'rule-empty-line-before': [
            'always', {
                except: [
                    'after-single-line-comment',
                    'first-nested',
                ],
                ignore: [
                    'after-comment'
                ]
            }
        ],

        'color-hex-length': 'long',
        'custom-media-pattern': /^[a-z0-9]+(-[a-z0-9]+)*/,

        'declaration-block-no-duplicate-properties': [
            true, {
                ignore: [
                    'consecutive-duplicates-with-different-values',
                ],
            },
        ],
        'declaration-empty-line-before': null,

        'font-family-name-quotes': 'always-unless-keyword',
        'font-weight-notation': 'named-where-possible',

        'function-url-quotes': 'always',

        'indentation': 2,

        'media-feature-name-no-vendor-prefix': true,

        'no-descending-specificity': null,
        'no-duplicate-selectors': true,
        'no-eol-whitespace': true,

        'number-leading-zero': 'never',
        'property-no-unknown': [
            true, {
                ignoreProperties: [
                    '/lost-/',
                ],
                checkPrefixed: true,
            }
        ],
        'property-no-vendor-prefix': [
            true, {
                ignoreProperties: [
                    /* NOTE(benjamin)
                     * Ignored to achieve consistent appearance of form fields in various rendering engines.
                     * Autoprefixer does not support non-standard values for this property.
                     */
                    'appearance',
                ],
            },
        ],

        'selector-attribute-quotes': 'always',
        // 'selector-class-pattern': /^[a-z0-9]+(-[a-z0-9]+)*((--|__)[a-z0-9]+(-[a-z0-9]+)*)?$/,
        'selector-nested-pattern': '^&',
        'selector-no-vendor-prefix': true,
        'selector-type-no-unknown': null,
        'selector-list-comma-newline-after': 'always-multi-line',
        'selector-list-comma-space-after': 'always-single-line',
        'string-quotes': 'double',

        'time-min-milliseconds': 75,

        'unit-disallowed-list': [
            'ex',
            'ch',
            'cm',
            'mm',
            'in',
            'pt',
            'pc'
        ],
        'value-keyword-case': 'lower',
        'value-no-vendor-prefix': true,
    }
}
