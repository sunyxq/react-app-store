import { observable } from 'mobx';
import ListApi from '../api/list'
import { get } from "lodash";

const AppListStore = observable( {
	freeList: [],
	recommendList: [],
	allFreeList: [],
	page: 1,
	noMore: false,
	isAsyncLoading: false,
	loading: false,

	async getFreeList() {
		const result = await ListApi.getFreeList()
		this.allFreeList = get(result, 'feed.entry', [])
		
		this.getPerPageList()
	},
	getPerPageList() {
		console.log(this.noMore, this.page)
		if(this.noMore) return
		if(this.page === 1) {
			this.freeList = this.allFreeList.slice(0, 10).map(this.getItem)
		} else {
			this.freeList.push(...this.allFreeList.slice((this.page - 1) * 10, this.page * 10).map(this.getItem))
		}
		this.allFreeList.length === this.freeList.length ? this.noMore = true : this.page += 1
	},

	searchApp(keywords) {
		if(keywords) {
			this.noMore = true
			this.freeList = this.allFreeList.filter(e => get(e, 'title.label').includes(keywords) || get(e, 'category.attributes.label').includes(keywords)).map(this.getItem)
		} else {
			this.freeList = this.allFreeList.slice(0, (this.page - 1) * 10).map(this.getItem)
			this.noMore =  this.allFreeList.length === this.freeList.length ? true : false
		}
	},

	async getRecommendList() {
			const result = await ListApi.getRecommendList()
		console.log('推荐榜前十', result)
		const _arr = get(result, 'feed.entry')
		this.recommendList = Array.isArray(_arr) ? _arr.map(this.getItem) : []	
	},
	getItem(e, i, arr) {
		return {
			id: get(e, 'id.attributes.im:id'),
			name: get(e, 'title.label'),
			category: get(e, 'category.attributes.label'),
			img: get(e, 'im:image.0.label', ''),
			rate: Math.floor(Math.random() * 5)
		}
	},
	async getAll() {
		try {
			this.loading = true
			const result = await Promise.all([this.getFreeList(), this.getRecommendList()])
			this.loading = false
			return true
		} catch (error) {
			this.loading = false
			return false
		}
	}
} );

export default AppListStore;