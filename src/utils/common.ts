/**
 * TODO 下拉动画
 */

 import { cubicInOut } from 'svelte/easing';

 export function zoomIn(node, params) {
  return {
    duration:params.duration,
    easing: cubicInOut,
    css: t => {
      return `
        opacity: ${t};
        transform: scaleY(${t});
        transform-origin: center ${[...node.classList].includes('is_top')?'bottom':'top'};`
    }
  };
}