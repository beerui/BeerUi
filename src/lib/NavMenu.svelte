<script>
	import BeMenuItem from "$lib/be-menu/BeMenuItem.svelte";
	import BeSubMenu from "$lib/be-menu/BeSubMenu.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icon.svelte";

    export let menus = []
    onMount(() => {
        console.log('Menu onMount')
    })
    const clickMenu = (items) => {
        // goto(items.path)
    }
</script>
{#each menus as menu, index}
  {#if !menu.children || menu.children.length === 0}
      <BeMenuItem index={menu.id} on:mousedown={() => clickMenu(menu)}>
        <div slot="icon">
          <Icon name={menu.icon}/>
        </div>
        {menu.title}
      </BeMenuItem>
  {:else}
    <BeSubMenu index={menu.id}>
      <div slot="icon">
        <Icon name={menu.icon}/>
      </div>
      <div slot="title">{menu.title}</div>
      <svelte:self menus={menu.children} />
    </BeSubMenu>
  {/if}
{/each}
