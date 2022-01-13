<script lang="ts">
  import hljs from 'highlight.js'
  import 'highlight.js/styles/a11y-light.css'
  import 'highlight.js/styles/github.css'
  import type { $$Props } from '../../global'

	let _class: $$Props["class"] = undefined
	export let style: $$Props["style"] = undefined
	export {_class as class}
	export let code = ''
	export let js = ''

  const highlightCode = (code: string, type): string => {
	  return hljs.highlightAuto(code, [type]).value
  }
  $: highlightedCode = highlightCode(code, 'html')
  $: highlightedCodeJS = highlightCode(js, 'javascript')
</script>
<div
	class="high-code {_class ?? ''}"
	style={style ? style : ''}
>
	<pre>
		<code>
			{@html highlightedCodeJS}
			{@html highlightedCode}
		</code>
	</pre>
</div>
