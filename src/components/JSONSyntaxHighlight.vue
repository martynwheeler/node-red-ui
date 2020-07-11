<template>
    <pre class="syntax-highlight" v-html="syntaxHighlight">
    </pre>
</template>

<script>
module.exports = {
    name: 'JSONSyntaxHighLight',
    data() {
        return {

        };
    },
    props: {
        prefix: {
            type: String,
            default: '',
        },
        json: {
            type: Object,
            required: true,
        },
    },
    computed: {
        // return formatted HTML version of JSON object
        syntaxHighlight: function() {
            if (typeof this.json === 'string') {
                // Return it unformatted but wrapped in the syntax-highlight pre.
                return this.prefix + this.json;
            }

            let jsonFormatted = JSON.stringify(this.json, undefined, 4);
            jsonFormatted = jsonFormatted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            jsonFormatted = jsonFormatted.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
            return this.prefix + jsonFormatted;
        }, // --- End of syntaxHighlight --- //
    }
}
</script>

<style scoped>
    .syntax-highlight {
        color:white;
        background-color:black;
        padding:5px 10px;
    }
    .syntax-highlight > .key {
        color:#ffbf35
    }
    .syntax-highlight > .string {
        color:#5dff39;
    }
    .syntax-highlight > .number {
        color:#70aeff;
    }
    .syntax-highlight > .boolean {
        color:#b993ff;
    }
</style>