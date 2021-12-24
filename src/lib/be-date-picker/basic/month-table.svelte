<script lang="ts">

</script>

<table class="el-month-table">
  <tbody>
    <tr v-for="(row, key) in rows" :key="key">
      <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
        <div>
          <a class="cell">{{ t('el.datepicker.months.' + months[cell.text]) }}</a>
        </div>
      </td>
    </tr>
  </tbody>
</table>