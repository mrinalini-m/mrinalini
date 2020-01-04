<template>
	<Layout :isIndex="true">
		<div class="wrapper">
			<g-image class="profile-pic" src="~/assets/images/profile.jpeg"></g-image>
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

<style>
	.wrapper {
		display: flex;
	}
	.profile-pic {
		width: 350px;
	}
</style>
