export default {
	
	async getFreeList(){
		const result = await fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
		return result.json()
	},

	async getRecommendList() {
		const result = await fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
		return result.json()
	}
}