<script>
	import BeMenuItem from "$lib/be-menu/BeMenuItem.svelte";
	import BeSubMenu from "$lib/be-menu/BeSubMenu.svelte";
    import Icon from "./Icon.svelte";

    export let menus = []
    const isChildHidden = menus => menus.some(el => el.hidden)
</script>
{#each menus as menu, index}
  {#if !menu.children || menu.children.length === 0 || isChildHidden(menu.children)}
    {#if !menu.hidden}
      {#if menu.icon}
        <BeMenuItem id={menu.id}>
          <div slot="icon">
            <Icon name={menu.icon}/>
          </div>
          {menu.title}
        </BeMenuItem>
      {:else}
        <BeMenuItem id={menu.id}>{menu.title}</BeMenuItem>
      {/if}
    {/if}
  {:else}
    {#if !menu.hidden}
      {#if menu.icon}
        <BeSubMenu id={menu.id}>
          <div slot="icon">
            <Icon name={menu.icon}/>
          </div>
          <div slot="title">{menu.title}</div>
          <svelte:self menus={menu.children}/>
        </BeSubMenu>
      {:else}
        <BeSubMenu id={menu.id}>
          <div slot="title">{menu.title}</div>
          <svelte:self menus={menu.children}/>
        </BeSubMenu>
      {/if}
    {/if}
  {/if}
{/each}
