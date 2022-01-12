<script lang="ts">
  import hljs from 'highlight.js'
  import 'highlight.js/styles/a11y-light.css'
  import 'highlight.js/styles/github.css'
  import type { $$Props } from '../../global'

	let _class: $$Props["class"] = undefined
	export let style: $$Props["style"] = undefined
	export {_class as class}
	export let code = ''

  const highlightCode = (code: string): string => {
	  return hljs.highlightAuto(code, ['html']).value
  }
  $: highlightedCode = highlightCode(code)
</script>
<div
	class="high-code {_class ?? ''}"
	style={style ? style : ''}
>
	<pre>
		<code>
			{@html highlightedCode}
		</code>
	</pre>
</div>

<style lang='scss'>
	.high-code {
		width: 100%;background: var(--bg-color-code);padding: 16px;border-radius: 6px;
    :global(.hljs-tag) {color: #878787;}
		code {
      background-color: transparent;line-height: 1.5;font-size: 14px;
		}
		* {margin: 0;padding: 0;border: 0;width: 100%;height: 100%;display: block;}
	}
</style>
