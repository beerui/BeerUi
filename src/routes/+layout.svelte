<script>
	import {preparePageTransition} from '$lib/page-transition';

	preparePageTransition();
</script>
<slot></slot>

<style>
    html::page-transition-outgoing-image() {
        animation: 0.25s ease 0s 1 normal both running blink-page-transition-fade-out;
    }

    html::page-transition-incoming-image() {
        animation: 0.25s ease 0s 1 normal both running blink-page-transition-fade-in;
    }
    ::page-transition-outgoing-image(root),
    ::page-transition-incoming-image(root) {
        animation-duration: 3s;
    }
</style>
