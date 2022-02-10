<script lang="ts">
import { BeProgress } from '$lib';
</script>
<div class='page-container'>
	<BeProgress percentage={60} type="line" status="success" background="#000000"/>
	<BeProgress percentage={70} type="line" status="success" color="#000000" strokWidth="20" textInside={true}/>
	<BeProgress percentage={10} type="circle" status="danger"  strokWidth="6" width={126}/>
	<BeProgress percentage={10} type="dashboard" status="danger" color="#000000"  strokWidth="6" width={126}/>
</div>
