<template>
    <div id="article-text"></div>
</template>

<script>
import $ from 'jquery'

export default {
    props: {
        text: String
    },
    watch: {
        text: (val) => {
            $('div#article-text').html($.parseHTML(val))
        }
    },
}
</script>

<style>
#article-text {
    padding: 0.5rem;
    font-size: 140%;
    white-space: pre-wrap;
}

#article-text ul {
    text-align: left;
}

.UL {
   text-decoration: underline; 
}

.L {
    text-align: left;
}

.R {
    text-align: right;
}
</style>