<template>
	<Layout :isIndex="true">
		<div class="wrapper">
			<g-image class="profile-pic" src="/images/profile.jpeg"></g-image>
			<Links />
		</div>
		<Map />
	</Layout>
</template>

<script>
	import Map from '~/components/Map'
	import Links from '~/components/Links'
	export default {
		metaInfo: {
			title: 'Mrinalini'
		},
		components: {
			Map,
			Links
		}
	}
</script>

<style scoped>
	.wrapper {
		display: flex;
		justify-content: space-between;
	}
	.profile-pic {
		border-radius: 50%;
		width: 350px;
	}
</style>
