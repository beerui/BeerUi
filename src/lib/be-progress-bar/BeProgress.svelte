<script>
	import { onMount } from 'svelte';

	export let percentage = 97
	export let showText = true
	export let type = 'line'
	// 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
	export let width = 126
	export let strokWidth = 6
	export let textInside = false
	// primary/success/info/warning/danger
	export let status = 'primary'
	export let color
	export let background
	export let strokeLinecap = 'round'
	let progress

	if(percentage > 100) percentage = 100

	let rate = type == 'dashboard' ? 0.75 : 1

	let circleRadius = (width - strokWidth * 2) / 2

	let perimeter = 2 * Math.PI * circleRadius

	let strokeDashoffset = -1 * perimeter * (1 - rate) / 2

	onMount(() => {
		if(type == 'dashboard' || type == 'circle') {
			progress.style.width = width + 'px'
			progress.style.height = width + 'px'
		}
	})
	const trailPathStyle = `
		stroke-dasharray: ${perimeter * rate }px, ${perimeter}px;
		stroke-dashoffset: ${strokeDashoffset};
		${background ? ('stroke:' + background + ';') : ''}
	`

	$:circlePathStyle = `
		stroke-dasharray: ${perimeter * rate * (percentage / 100) }px, ${perimeter}px;
		stroke-dashoffset: ${strokeDashoffset};
		transition: stroke-dasharray 0.6s ease;
		${color ? ('stroke: '+ color + ';') : ''}
		`
	// const trailPathStyle = `
	// 	stroke-dasharray: ${perimeter * rate }px, ${perimeter - perimeter * rate}px;
	// 	stroke-dashoffset: ${strokeDashoffset};
	// 	stroke: ${background}
	// `

	// $:circlePathStyle = `
	// 	stroke-dasharray: ${perimeter * rate * percentage / 100 }px, ${perimeter - perimeter * rate * percentage / 100}px;
	// 	stroke-dashoffset: ${strokeDashoffset};
	// 	stroke: ${color};
	// 	transition: stroke-dasharray 0.6s ease;
	// 	`

</script>

<div class='be-progress be-progress_{type}' bind:this={progress}>
	{#if type == 'line'}
	<div class="be-progress-bar">
		<div class="be-progress-bar_outer" style="height:{strokWidth}px;background-color:{background}">
			<div class="be-progress-bar_inner be-progress-bar-{status}" style="width:{percentage}%;background-color:{color}">
				{#if textInside && showText}
					<span class="be-progress-bar_inner_text">{percentage}%</span>
				{/if}
			</div>
		</div>
		{#if !textInside && showText}
			<span class="be-progress-bar_text">{percentage}%</span>
		{/if}
	</div>
	{/if}
	{#if type == 'dashboard' || type == 'circle'}
	<svg width={width} height={width}>
		<circle class="be-progress_{type}-outer" cx="{width/2}" cy="{width/2}" r="{circleRadius}" stroke-width={strokWidth} fill="none" stroke-linecap={strokeLinecap} style={trailPathStyle}/>
		<circle class="be-progress_{type}-inner be-progress_{type}-inner_{status}" cx="{width/2}" cy="{width/2}" r="{circleRadius}" stroke-width={strokWidth} fill="none" stroke-linecap={strokeLinecap} style={circlePathStyle}/>
	</svg>
		{#if showText}
			<span>{percentage}%</span>
		{/if}
	{/if}
</div>

