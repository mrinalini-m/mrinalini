<template>
	<Layout :isIndex="true">
		<div class="wrapper">
			<g-image class="profile-pic" src="/images/profile.jpeg"></g-image>
		</div>
		<Links />
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
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.profile-pic {
		margin: 0.5rem;
		border-radius: 50%;
		width: 350px;
		height: 350px;
	}
</style>
