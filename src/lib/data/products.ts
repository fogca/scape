export type Product = {
	slug: string;
	name: string;
	nameJa: string;
	category: string;
	price: number;
	abv: string;
	volume: string;
	cask: string;
	maturation: string;
	farm: string;
	region: string;
	regionJa: string;
	barley: string;
	bottleNo: string;
	totalBottles: number;
	image: string;
	thumbs: string[];
	description: string;
	descriptionJa: string;
	tastingNotes: {
		nose: string;
		palate: string;
		finish: string;
	};
};

export const products: Product[] = [
	{
		slug: 'shunrai-in-gunma',
		name: 'Scape Whisky GM26',
		nameJa: 'スケープ ウイスキー GM26',
		category: 'Single Farm Series',
		price: 15000,
		abv: '46%',
		volume: '700ml',
		cask: 'American Oak (Ex-Bourbon)',
		maturation: '3 years',
		farm: 'Shunrai Farm',
		region: 'Gunma',
		regionJa: '群馬｜春雷農場',
		barley: 'Nijo barley',
		bottleNo: 'No. 124 / 320',
		totalBottles: 320,
		image: '/images/bottle-gm26.jpg',
		thumbs: ['/images/bottle-gm26.jpg', '/images/landscape-miyazaki.jpg', '/images/distillery-still.jpg'],
		description:
			'A single-farm release distilled from Nijo barley grown by Shunrai Farm in Gunma. Aged in American oak casks at our Miyazaki distillery, the spirit carries the warmth of the land and the patience of the cooperage.',
		descriptionJa:
			'群馬県・春雷農場で育てられた二条大麦を、宮崎の蒸留所でアメリカンオーク樽で熟成。土地の個性をそのまま閉じ込めた、シングルファームのリリース。',
		tastingNotes: {
			nose: 'Honey, dried apricot, soft oak spice',
			palate: 'Vanilla, ripe pear, warm cereal sweetness',
			finish: 'Long, gently smoky, with a hint of citrus zest'
		}
	},
	{
		slug: 'hokkaido-nijo',
		name: 'Scape Whisky HK26',
		nameJa: 'スケープ ウイスキー HK26',
		category: 'Single Farm Series',
		price: 16800,
		abv: '46%',
		volume: '700ml',
		cask: 'Oloroso Sherry Cask',
		maturation: '4 years',
		farm: 'Kitami Farm',
		region: 'Hokkaido',
		regionJa: '北海道｜北見',
		barley: 'Nijo barley',
		bottleNo: 'No. 052 / 280',
		totalBottles: 280,
		image: '/images/landscape-miyazaki.jpg',
		thumbs: ['/images/landscape-miyazaki.jpg', '/images/story-barley.jpg', '/images/gallery-maturation.jpg'],
		description:
			'Nijo barley grown in the cool climate of northern Hokkaido, aged in Oloroso sherry casks. A deeper, drier expression — slow-matured under crisp winters.',
		descriptionJa:
			'北海道の冷涼な気候で育った二条大麦を、オロロソシェリー樽で熟成。冬の凛とした空気の中で深まる、ドライで奥行きのある一本。',
		tastingNotes: {
			nose: 'Dark cherry, roasted nuts, leather',
			palate: 'Dried fig, walnut, sherry richness',
			finish: 'Dry, lingering, gently tannic'
		}
	}
];

export function getProduct(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
